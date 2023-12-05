import React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';

const Time = ({ onTimeChange }) => {
  const handleTimeChange = (time) => {
    // Call the parent component's callback function with the selected time
    onTimeChange(time);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimeField']}>
        {/* Pass handleTimeChange as a prop to TimeField */}
        <TimeField label="Basic time field" onChange={handleTimeChange} />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default Time;
