// Schedule.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Calendar from "../components/calendar";
import Time from "../components/time";
import { db } from "../firebase";
import { ref, push, get } from "firebase/database";

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const itemsPerPage = 20; // Adjust the number of items per page as needed
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppointments = appointments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleSubmit = async () => {
    // Check if already submitting
    if (loading) return;

    // Set loading state to true
    setLoading(true);

    try {
      if (selectedDate && selectedTime) {
        const formattedDate = selectedDate.toISOString();
        const formattedTime = selectedTime.format("HH:mm");

        // Push the appointment data to the "appointments" node in Firebase
        const appointmentsRef = ref(db, "appointments");
        await push(appointmentsRef, {
          date: formattedDate,
          time: formattedTime,
        });

        console.log(
          "Appointment submitted to Firebase:",
          formattedDate,
          formattedTime
        );

        // Fetch the updated list of appointments after submission
        const updatedAppointmentsRef = ref(db, "appointments");
        const snapshot = await get(updatedAppointmentsRef);

        if (snapshot.exists()) {
          const appointmentsData = [];
          snapshot.forEach((childSnapshot) => {
            const appointment = childSnapshot.val();
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
      // Set loading state back to false regardless of success or failure
      setLoading(false);
    }
  };

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
            appointmentsData.push(appointment);
          });

          setAppointments(appointmentsData);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []); // Run once on component mount

  return (
    <div className="flex ">
      <div className="absolute z-10 bg-secondary">
        <Sidebar />
      </div>
      <div className="relative flex-1 p-2 ml-12 md:p-8 ">
        <div className="p-5 md:mx-10 lg:p-16 ">
          <h1 className="mb-4 text-2xl font-semibold md:text-4xl font-roboto">
            Make an Appointment
          </h1>
          <p className="font-roboto text-shade">
            Setting appointments efficiently is key for seamless coordination in
            professional, healthcare, and academic settings.
          </p>

          <div className="flex flex-col justify-center gap-2 mt-10 xl:flex-row">
            <div className="flex flex-col-reverse xl:flex-col lg:w-full xl:w-1/4">
              <Calendar onDateChange={handleDateChange} className="shadow-lg" />

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
            <div className="ml-10 xl:w-3/4 ">
              <Time onTimeChange={handleTimeChange} />

              <button
                onClick={handleSubmit}
                className={`px-4 py-3 mt-4  rounded-md text-secondary text-sm font-roboto bg-primary ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Appointment"}
              </button>
              <div>
                <div className="flex flex-col gap-2 lg:flex-row">
                  <h2 className="mt-10 mb-5 text-2xl font-semibold font-roboto">
                    Appointments Schedule:
                  </h2>
                  {/*For Day*/}
                  <div className="mt-4">
                    <label className="block text-sm font-roboto text-shade">
                      Filter by Day:
                    </label>
                    <select
                      onChange={(e) => handleDayChange(e.target.value)}
                      value={selectedDay || ""}
                      className="block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm border-shade focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    >
                      <option value="">All Days</option>
                      <option value="Sun">Sun</option>
                      <option value="Mon">Mon</option>
                      <option value="Tue">Tue</option>
                      <option value="Wed">Wed</option>
                      <option value="Thu">Thu</option>
                      <option value="Fri">Fri</option>
                      <option value="Sat">Sat</option>
                    </select>
                  </div>

                  {/* Filter for Month */}
                  <div className="mt-4">
                    <label className="block text-sm font-roboto text-shade">
                      Filter by Month:
                    </label>
                    <select
                      onChange={(e) => handleMonthChange(e.target.value)}
                      value={selectedMonth || ""}
                      className="block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm border-shade focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    >
                      <option value="">All Months</option>
                      <option value="01">Jan</option>
                      <option value="02">Feb</option>
                      <option value="03">Mar</option>
                      <option value="04">Apr</option>
                      <option value="05">May</option>
                      <option value="06">Jun</option>
                      <option value="07">Jul</option>
                      <option value="08">Aug</option>
                      <option value="09">Sep</option>
                      <option value="10">Oct</option>
                      <option value="11">Nov</option>
                      <option value="12">Dec</option>
                    </select>
                  </div>
                </div>
                {loading ? (
                  <p>Retrieving Appointments...</p>
                ) : (
                  <div className="mt-4">
                  <div className="grid grid-cols-1 gap-2 p-2 overflow-y-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 font-roboto">
                    {currentAppointments.map((appointment, index) => {
                      const formattedDate = new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }).format(new Date(appointment.date));
            
                      const time = appointment.time.split(":");
                      const formattedTime = `${
                        parseInt(time[0], 10) % 12 || 12
                      }:${time[1]} ${
                        parseInt(time[0], 10) < 12 ? "AM" : "PM"
                      }`;
            
                      return (
                        <div
                          key={index}
                          className="px-3 py-5 mb-2 text-center duration-300 border rounded hover:bg-primary hover:text-secondary"
                        >
                          Date: {formattedDate}, <br /> Time: {formattedTime}
                        </div>
                      );
                    })}
                  </div>
            
                  {/* Pagination Controls */}
                  <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`mx-1 px-3 py-2 rounded ${
                          page === currentPage ? "bg-primary text-secondary" : "bg-secondary text-primary hover:bg-primary hover:text-secondary"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
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