// Import React and other necessary modules/components
import React, { useState, useEffect } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Calendar from "../components/calendar";
import Time from "../components/time";
import { db } from "../firebase";
import { ref, push, get } from "firebase/database";
import { useMemo } from "react";
import MobileNavbar from "../components/dashboard/MobileNavbar";
// Define the Schedule component
const Schedule = () => {
  // State variables
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [buildingName, setBuildingName] = useState("");
  const [floor, setFloor] = useState("");
  const [room, setRoom] = useState("");
  const [isOverlapModalOpen, setOverlapModalOpen] = useState(false);
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [isDuplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const [isIncompleteModalOpen, setIncompleteModalOpen] = useState(false);

  const closeIncompleteModal = () => {
    setIncompleteModalOpen(false);
  };
  const closeDuplicateModal = () => {
    setDuplicateModalOpen(false);
  };

  const handleBuildingChange = (building) => {
    console.log("Selected Building:", building);
    setSelectedBuilding(building);
  };

  // Event handlers for date, time, day, and month changes
  const handleDateChange = (date) => {
    console.log("Selected Date:", date);
    setSelectedDate(date);
  };

  const handleTimeChange = (timeRange) => {
    console.log("Selected Time:", timeRange);
    setSelectedTime(timeRange);
  };

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };
  // Fetch appointments on component mount

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);

      try {
        const appointmentsRef = ref(db, "appointments");
        const snapshot = await get(appointmentsRef);

        if (snapshot.exists()) {
          const appointmentsData = [];

          snapshot.forEach((childSnapshot) => {
            const appointment = childSnapshot.val();
            // Ensure that date is a valid date object
            if (appointment.date && typeof appointment.date === "string") {
              appointment.date = new Date(appointment.date);
            }
            appointmentsData.push(appointment);
          });

          setAppointments(appointmentsData);
        } else {
          console.log("No appointments data available");
          // You might want to set an empty array or handle this case differently
          setAppointments([]);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error.message);
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchAppointments function only when the component mounts
    fetchAppointments();

    // You might want to add dependencies to this array if there are specific dependencies
    // that should trigger a re-fetch when they change.
  }, []);

  // Event handler for form submission
  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);

    try {
      if (selectedDate && selectedTime.length === 2) {
        const formattedDate = selectedDate.toISOString();
        const [formattedStartTime, formattedEndTime] = selectedTime;

        // Check for duplicate appointment
        const isDuplicate = appointments.some(
          (appointment) =>
            appointment.date.toISOString() === formattedDate &&
            appointment.startTime === formattedStartTime &&
            appointment.endTime === formattedEndTime &&
            appointment.buildingName === buildingName &&
            appointment.floor === floor &&
            appointment.room === room
        );

        if (isDuplicate) {
          setDuplicateModalOpen(true);

          return;
        }
        if (!floor || !room) {
          console.error("Please provide floor and room information");
          setIncompleteModalOpen(true);
          return;
        }

        // Check for overlapping schedules
        const isOverlap = appointments.some(
          (appointment) =>
            appointment.date.toISOString() === formattedDate &&
            ((formattedStartTime >= appointment.startTime &&
              formattedStartTime < appointment.endTime) ||
              (formattedEndTime > appointment.startTime &&
                formattedEndTime <= appointment.endTime) ||
              (formattedStartTime <= appointment.startTime &&
                formattedEndTime >= appointment.endTime)) &&
            appointment.buildingName === buildingName &&
            appointment.floor === floor &&
            appointment.room === room
        );

        if (isOverlap) {
          console.log("Overlap detected. Opening modal.");
          // Handle the overlap case (e.g., show an error message)
          setOverlapModalOpen(true);
          console.log("Modal opened.");
          return;
        }

        // Continue with your logic
        const appointmentsRef = ref(db, "appointments");
        await push(appointmentsRef, {
          date: formattedDate,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          buildingName,
          floor,
          room,
        });

        console.log(
          "Appointment submitted to Firebase:",
          formattedDate,
          formattedStartTime,
          formattedEndTime,
          buildingName,
          floor,
          room
        );

        // Fetch and update appointments
        const updatedAppointmentsRef = ref(db, "appointments");
        const snapshot = await get(updatedAppointmentsRef);

        if (snapshot.exists()) {
          const appointmentsData = [];
          snapshot.forEach((childSnapshot) => {
            const appointment = childSnapshot.val();
            appointment.date = new Date(appointment.date);
            appointmentsData.push(appointment);
          });

          setAppointments(appointmentsData);
        } else {
          console.log("No data available");
        }
      } else {
        console.error("Please select a date and time");
      }
    } catch (error) {
      console.error("Error submitting appointment:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter appointments based on selected day and month
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      if (
        selectedDay !== null &&
        selectedDay !== "" &&
        appointment.date.getDay() !== parseInt(selectedDay)
      ) {
        return false;
      }

      if (
        selectedMonth !== null &&
        selectedMonth !== "" &&
        appointment.date.getMonth() + 1 !== parseInt(selectedMonth)
      ) {
        return false;
      }
      if (
        selectedBuilding !== "" &&
        appointment.buildingName !== selectedBuilding
      ) {
        return false;
      }

      return true;
    });
  }, [appointments, selectedDay, selectedMonth, selectedBuilding]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const closeOverlapModal = () => {
    setOverlapModalOpen(false);
  };

  // JSX structure
  return (
    <div className="flex">
      {/* Sidebar component */}
      <div className="absolute z-10 bg-secondary">
        <Sidebar />
      </div>
      <div className="fixed z-10 w-full bg-secondary">
        <MobileNavbar />
      </div>

      <div className="relative flex-1 p-2 mt-10 md:p-8">
        <div className="p-5 md:mx-10 lg:p-16">
          <h1 className="mb-4 text-2xl font-semibold md:text-4xl font-roboto">
            Make an Appointment
          </h1>
          <p className="font-roboto text-shade">
            Setting appointments efficiently is key for seamless coordination in
            professional, healthcare, and academic settings.
          </p>

          <div className="flex flex-col justify-center gap-10 mt-10 xl:flex-row">
            <div className="flex flex-col-reverse xl:flex-col lg:w-full xl:w-1/4">
              {/* Calendar component */}
              <Calendar onDateChange={handleDateChange} className="shadow-lg" />

              {/* Appointment guide */}
              <div className="p-5 text-sm border rounded">
                <h1 className="mb-5 text-xl font-semibold font-roboto">
                  Setting an Appointment Guide
                </h1>
                {steps.map((step, index) => (
                  <p key={index} className="mt-2 font-roboto">
                    <span className="font-semibold">{step.title}</span>{" "}
                    {step.content}
                  </p>
                ))}
              </div>
            </div>

            <div className=" xl:w-3/4">
              {/* Time component */}
              <Time
                onTimeChange={handleTimeChange}
                onDateChange={handleDateChange}
              />

              <div className="flex flex-col gap-2 mt-5 md:flex-row">
                {/* Building selection */}
                <select
                  onChange={(e) => setBuildingName(e.target.value)}
                  value={buildingName}
                  className="px-4 py-2 text-sm border rounded text-primary focus:outline-none"
                >
                  <option value="">Building Name</option>
                  <option value="Wellness Bldg.">Wellness Bldg.</option>
                  <option value="Profeta Bldg.">Profeta Bldg</option>
                  <option value="JVE Bldg.">JVE Bldg.</option>
                  <option value="Estolas Bldg.">Estolas Bldg.</option>
                  <option value="ITC Bldg.">ITC Bldg.</option>
                  <option value="New Engineer Bldg.">New Engineer Bldg.</option>
                  <option value="Alumni Bldg.">Alumni Bldg.</option>
                  <option value="SNAGAH">SNAGAH</option>
                  <option value="R&D">R&D</option>
                  <option value="Main Academic Bldg.">
                    Main Academic Bldg.
                  </option>
                  <option value="Old Bldg">Old Bldg.</option>
                </select>

                {/* Floor input */}
                <input
                  type="text"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none"
                  placeholder="Floor"
                  required
                />

                {/* Room input */}
                <input
                  type="text"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none"
                  placeholder="Room"
                  required
                />
              </div>

              {/* Submit button */}
              <button
                onClick={handleSubmit}
                className={`px-4 py-3 mt-4 rounded-md text-secondary text-sm font-roboto bg-primary ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Appointment"}
              </button>
              {isIncompleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="p-5 bg-white rounded-md">
                    <p>Please provide floor and room information.</p>
                    <button
                      onClick={closeIncompleteModal}
                      className="px-4 py-2 mt-3 text-white rounded-md bg-primary"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
              {/* Duplicate Appointment Modal */}
              {isDuplicateModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="p-5 bg-white rounded-md">
                    <p>
                      Duplicate appointment found. Please choose a different
                      date or time.
                    </p>
                    <button
                      onClick={closeDuplicateModal}
                      className="px-4 py-2 mt-3 text-white rounded-md bg-primary"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
              {isOverlapModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="p-5 bg-white rounded-md">
                    <p>
                      Time range overlaps with an existing appointment. Please
                      choose a different time.
                    </p>
                    <button
                      onClick={closeOverlapModal}
                      className="px-4 py-2 mt-3 text-white rounded-md bg-primary"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

              {/* Filters for day and month */}
              <div className="flex flex-col gap-2 lg:flex-row">
                {/* Filter by Day */}
                <div className="mt-4">
                  <label className="block text-sm font-roboto text-shade">
                    Filter by Day:
                  </label>
                  <select
                    onChange={(e) => handleDayChange(e.target.value)}
                    value={selectedDay || ""}
                    className="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-shade focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  >
                    <option value="">All Days</option>
                    <option value="0">Sun</option>
                    <option value="1">Mon</option>
                    <option value="2">Tue</option>
                    <option value="3">Wed</option>
                    <option value="4">Thu</option>
                    <option value="5">Fri</option>
                    <option value="6">Sat</option>
                  </select>
                </div>

                {/* Filter by Month */}
                <div className="mt-4">
                  <label className="block text-sm font-roboto text-shade">
                    Month:
                  </label>
                  <select
                    onChange={(e) => handleMonthChange(e.target.value)}
                    value={selectedMonth || ""}
                    className="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-shade focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  >
                    <option value="">All Months</option>
                    <option value="1">Jan</option>
                    <option value="2">Feb</option>
                    <option value="3">Mar</option>
                    <option value="4">Apr</option>
                    <option value="5">May</option>
                    <option value="6">Jun</option>
                    <option value="7">Jul</option>
                    <option value="8">Aug</option>
                    <option value="9">Sep</option>
                    <option value="10">Oct</option>
                    <option value="11">Nov</option>
                    <option value="12">Dec</option>
                  </select>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-roboto text-shade">
                    Building:
                  </label>
                  <select
                    onChange={(e) => handleBuildingChange(e.target.value)}
                    value={selectedBuilding}
                    className="px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-shade focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  >
                    <option value="">All Buildings</option>
                    {/* Add options for each building */}
                    <option value="Wellness Bldg.">Wellness Bldg.</option>
                    <option value="Profeta Bldg.">Profeta Bldg</option>
                    <option value="JVE Bldg.">JVE Bldg.</option>
                    <option value="Estolas Bldg.">Estolas Bldg.</option>
                    <option value="ITC Bldg.">ITC Bldg.</option>
                    <option value="New Engineer Bldg.">
                      New Engineer Bldg.
                    </option>
                    <option value="Alumni Bldg.">Alumni Bldg.</option>
                    <option value="SNAGAH">SNAGAH</option>
                    <option value="R&D">R&D</option>
                    <option value="Main Academic Bldg.">
                      Main Academic Bldg.
                    </option>
                    <option value="Old Bldg">Old Bldg.</option>
                  </select>
                </div>
              </div>

              {/* Display filtered appointments */}
              <div className="hidden md:flex">
                {loading ? (
                  <p>Retrieving Appointments...</p>
                ) : filteredAppointments.length === 0 ? (
                  <div className="  flex items-center mt-10 rounded justify-center h-[400px] bg-gray-100 w-auto">
                    <p className="text-2xl font-roboto">
                      No Records to Display
                    </p>
                  </div>
                ) : (
                  <div className="w-full mt-4">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            Start Time
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            End Time
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            Building
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            Floor
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            Room
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentAppointments.map((appointment, index) => {
                          const formattedDate = new Intl.DateTimeFormat(
                            "en-US",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            }
                          ).format(new Date(appointment.date));

                          const startTime = appointment.startTime
                            ? appointment.startTime.split(":")
                            : [];
                          const formattedStartTime = `${
                            parseInt(startTime[0], 10) % 12 || 12
                          }:${startTime[1]} ${
                            parseInt(startTime[0], 10) < 12 ? "AM" : "PM"
                          }`;

                          const endTime = appointment.endTime
                            ? appointment.endTime.split(":")
                            : [];
                          const formattedEndTime = `${
                            parseInt(endTime[0], 10) % 12 || 12
                          }:${endTime[1]} ${
                            parseInt(endTime[0], 10) < 12 ? "AM" : "PM"
                          }`;

                          return (
                            <tr key={index} className="hover:bg-gray-100">
                              <td className="px-6 py-4 whitespace-nowrap">
                                {formattedDate}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {formattedStartTime}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {formattedEndTime}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {appointment.buildingName}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {appointment.floor}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {appointment.room}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-4">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`mx-1 px-3 py-2 rounded ${
                              page === currentPage
                                ? "bg-primary text-secondary"
                                : "bg-secondary text-primary hover:bg-primary hover:text-secondary"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="md:hidden">
                {loading ? (
                  <p>Retrieving Appointments...</p>
                ) : filteredAppointments.length === 0 ? (
                  <div className="flex items-center mt-10 rounded justify-center h-[400px] bg-gray-100 w-auto">
                    <p className="text-2xl font-roboto">
                      No Records to Display
                    </p>
                  </div>
                ) : (
                  <div className="mt-4">
                    <div className="grid grid-cols-1 gap-2 p-2 overflow-y-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 font-roboto">
                      {currentAppointments.map((appointment, index) => {
                        const formattedDate = new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }).format(new Date(appointment.date));

                        const startTime = appointment.startTime
                          ? appointment.startTime.split(":")
                          : [];
                        const formattedStartTime = `${
                          parseInt(startTime[0], 10) % 12 || 12
                        }:${startTime[1]} ${
                          parseInt(startTime[0], 10) < 12 ? "AM" : "PM"
                        }`;

                        const endTime = appointment.endTime
                          ? appointment.endTime.split(":")
                          : [];
                        const formattedEndTime = `${
                          parseInt(endTime[0], 10) % 12 || 12
                        }:${endTime[1]} ${
                          parseInt(endTime[0], 10) < 12 ? "AM" : "PM"
                        }`;

                        return (
                          <div
                            key={index}
                            className="px-4 py-6 mb-2 border shadow-md bg-secondary font-roboto"
                          >
                            <p className="py-4 mb-2 text-sm font-semibold text-center bg-gray-100 border-b font-roboto">
                              Date: {formattedDate}
                            </p>
                            <p className="py-2 text-sm border-b ">
                              <span className="font-semibold ">Start Time:</span>{" "}
                              {formattedStartTime}
                            </p>
                            <p className="py-2 text-sm border-b ">
                              <span className="font-semibold">End Time:</span>{" "}
                              {formattedEndTime}
                            </p>
                            <p className="py-2 text-sm border-b ">
                              <span className="font-semibold">Building:</span>{" "}
                              {appointment.buildingName}
                            </p>
                            <p className="py-2 text-sm border-b ">
                              <span className="font-semibold">Floor:</span>{" "}
                              {appointment.floor}
                            </p>
                            <p className="py-2 text-sm border-b ">
                              <span className="font-semibold">Room:</span>{" "}
                              {appointment.room}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-4">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`mx-1 px-3 py-2 rounded ${
                              page === currentPage
                                ? "bg-primary text-secondary"
                                : "bg-secondary text-primary hover:bg-primary hover:text-secondary"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const steps = [
  {
    title: "Check Availability:",
    content: "Make sure to check the availability of the appointment slots.",
  },
  {
    title: "Check Year/Month/Day:",
    content:
      "Review the available dates and choose a suitable day for your appointment.",
  },
  {
    title: "Check the Time:",
    content: "Take note of the available time slots on the chosen day.",
  },
  {
    title: "Select Year/Month/Day:",
    content:
      "Use the calendar to select the desired Year, Month, and Day for your appointment.",
  },
  {
    title: "Select Time Frame:",
    content:
      "Choose a specific time frame from the available slots on the selected day.",
  },
  {
    title: "Submit it:",
    content:
      'Once you\'ve chosen the date and time, click the "Submit Appointment" button to confirm your appointment.',
  },
];

export default Schedule;
