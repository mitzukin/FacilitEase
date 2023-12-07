import React from 'react'

const mobileResult = () => {
  return (
    <div>
       {loading ? (
                <p>Retrieving Appointments...</p>
              ) : filteredAppointments.length === 0 ? (
                <div className="flex items-center mt-10 rounded justify-center h-[400px] bg-gray-100 w-auto">
                  <p className="text-2xl font-roboto">No Records to Display</p>
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
                          className="px-3 py-5 mb-2 duration-300 border rounded hover:bg-primary hover:text-secondary"
                        >
                          <p>Date: {formattedDate}</p>
                          <p>Start Time: {formattedStartTime}</p>
                          <p>End Time: {formattedEndTime}</p>
                          <p>Building: {appointment.buildingName}</p>
                          <p>Floor: {appointment.floor}</p>
                          <p>Room: {appointment.room}</p>
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
  )
}

export default mobileResult
