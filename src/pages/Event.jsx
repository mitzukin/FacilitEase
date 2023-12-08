import React, { useState, useEffect } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import MobileNavbar from "../components/dashboard/MobileNavbar";
import { db, ref, push, onValue, update, set } from "../firebase";

const Event = () => {
  const [eventName, setEventName] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [date, setDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [Description, setDescription] = useState("");
  const [events, setEvents] = useState([]);
  const [submissionError, setSubmissionError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setEventName(event.eventName);
    setFromTime(event.fromTime);
    setToTime(event.toTime);
    setDate(event.date);
    setEventLocation(event.eventLocation);
    setDescription(event.Description);
  };

  const handleDelete = async (eventId) => {
    try {
      // Delete the event from Firebase by setting its value to null
      const eventRef = ref(db, `events/${eventId}`);
      await set(eventRef, null);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  useEffect(() => {
    // Fetch data from Firebase when the component mounts
    const eventsRef = ref(db, "events");
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the data object to an array for easier rendering
        const eventsArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setEvents(eventsArray);
      }
    });
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedEvent) {
        // Update the existing event if selectedEvent is not null
        const eventRef = ref(db, `events/${selectedEvent.id}`);
        await update(eventRef, {
          eventName,
          fromTime,
          toTime,
          date,
          eventLocation,
          Description,
        });
        // Clear the selected event after editing
        setSelectedEvent(null);
      } else {
        // Push data to Firebase for a new event
        const eventsRef = ref(db, "events");
        await push(eventsRef, {
          eventName,
          fromTime,
          toTime,
          date,
          eventLocation,
          Description,
        });
      }

      // Clear form fields and reset error
      setEventName("");
      setFromTime("");
      setToTime("");
      setDate("");
      setEventLocation("");
      setDescription("");
      setSubmissionError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error submitting data to Firebase:", error);
      setSubmissionError("Error submitting data. Please try again.");
    }
  };

  return (
    <div className="pb-10 font-roboto">
      {" "}
      <div className="fixed z-10 w-full bg-secondary">
        <MobileNavbar />
      </div>
      <div className="absolute z-10 bg-secondary">
        <Sidebar />
      </div>
      <div className="flex flex-col pt-32 text-center md:pt-10">
        <h1 className="mb-2 text-5xl font-bold md:text-7xl">EVENT SCHEDULE </h1>
        <p className="mb-5">
          {" "}
          Schedule your time for a seamless blend of efficiency and enjoyment.
        </p>
      </div>
      <div className="flex flex-col md:mx-32 lg:flex-row">
        {" "}
        <div className="xl:px-5 lg:w-1/2">
          <form
            className="flex px-5 mx-auto flex-col w-[400px] lg:px-5 "
            onSubmit={handleSubmit}
          >
            <p className="mt-5 mb-10 text-center md:text-sm">
              Please fill up this form
            </p>
            <p className="mb-2 font-semibold md:text-sm">Event Name:</p>
            <input
              className="p-3 text-sm border-b placeholder:text-sm"
              type="text"
              placeholder="Enter Event"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            ></input>
            <div className="flex w-full gap-2 mt-2">
              <p className="mt-5 mb-2 text-sm font-semibold md:text-sm">
                From:
              </p>
              <input
                className="w-full p-3 text-sm border-b placeholder:text-sm"
                type="text"
                placeholder="00:00 am/pm"
                value={fromTime}
                required
                onChange={(e) => setFromTime(e.target.value)}
              ></input>
              <p className="mt-5 mb-2 text-sm font-semibold md:text-sm">To:</p>
              <input
                className="w-full p-3 text-sm border-b placeholder:text-sm"
                type="text"
                placeholder="00:00 am/pm"
                value={toTime}
                required
                onChange={(e) => setToTime(e.target.value)}
              ></input>
            </div>
            <p className="mt-5 mb-2 text-sm font-semibold md:text-sm">Date:</p>
            <input
              className="p-3 text-sm border-b placeholder:text-sm"
              type="date"
              placeholder="Enter your password"
              value={date}
              required
              onChange={(e) => setDate(e.target.value)}
            ></input>
            <p className="mt-5 mb-2 text-sm font-semibold md:text-sm">Where:</p>
            <input
              className="p-3 text-sm border-b placeholder:text-sm"
              type="text"
              placeholder="Place"
              value={eventLocation}
              required
              onChange={(e) => setEventLocation(e.target.value)}
            ></input>
            <div className="mt-5">
              <label
                htmlFor="eventDescription"
                className="mb-2 text-sm font-semibold md:text-sm"
              >
                Add Description{" "}
                <span className="ml-2 text-xs font-normal text-shade">
                  (Optional)
                </span>{" "}
                :
              </label>
              <textarea
                id="eventDescription"
                className="p-3 text-sm border rounded h-[150px] placeholder:text-sm w-full"
                placeholder="Add Your Description"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              className="py-3 mt-5 text-sm w-[200px] rounded-md md:text-sm bg-primary text-secondary font-roboto"
            >
              Get Schedule
            </button>
            {submissionError && (
              <p className="mt-3 text-red-500">{submissionError}</p>
            )}
          </form>
        </div>
        <div className="mt-10 text-gray-800 lg:w-3/4">
          <div className="mb-4">
            <h2 className="pl-5 mb-2 text-2xl font-bold ">Event Schedule</h2>
            <div className="flex flex-col">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col gap-10 px-10 py-4 mx-5 mb-2 bg-gray-100 rounded shadow-sm md:flex-row lg:flex-col xl:flex-row"
                >
                  <div className="flex flex-col items-end justify-center font-bold font-roboto ">
                    <p className="text-xl ">{event.fromTime} </p>
                    <div className="w-[90px] flex justify-center border-b border-gray-200"></div>
                    <p className="text-xl ">{event.toTime} </p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">
                      {event.eventName}
                    </h3>
                    <p className="text-sm">{event.Description}</p>
                    <p className="mt-2 text-sm">
                      {" "}
                      <span className="font-semibold">Location: </span>{" "}
                      {event.eventLocation}
                    </p>
                    <p className="mb-2 text-sm ">
                      {" "}
                      <span className="font-semibold">Date: </span>
                      {event.date}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between md:flex-col lg:flex-row xl:flex-col">
                    <button
                      type="button"
                      className="px-3 py-1 mr-2 text-sm text-primary"
                      onClick={() => {
                        handleEdit(event);
                       
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 text-sm text-primary"
                      onClick={() => handleDelete(event.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
     
      
    </div>
  );
};

export default Event;
