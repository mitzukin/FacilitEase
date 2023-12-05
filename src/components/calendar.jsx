// calendar.jsx
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const Calendar = ({ onDateChange }) => {
    const handleDateChange = (date) => {
        onDateChange(date);
      };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* Pass handleDateChange as a prop to DateCalendar */}
      <DateCalendar onChange={handleDateChange} />
    </LocalizationProvider>
  );
};

export default Calendar;
