import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";

// ...

const Time = ({ onTimeChange }) => {
  const handleTimeChange = (timeRange) => {
    const [startTime, endTime] = timeRange;

    if (startTime && endTime && startTime.isValid() && endTime.isValid()) {
      const formattedStartTime = startTime.format("HH:mm");
      const formattedEndTime = endTime.format("HH:mm");

      onTimeChange([formattedStartTime, formattedEndTime]);
      
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-col">
        <MultiInputTimeRangeField
          slotProps={{
            textField: ({ position }) => ({
              label: position === "start" ? "From" : "To",
              InputProps: {
                className: "mb-2", // Add margin-bottom for spacing
              },
            }),
          }}
          onChange={handleTimeChange}
          className="w-full sm:w-[400px]" // Set width for larger screens
        />
      </div>
    </LocalizationProvider>
  );
};

export default Time;
