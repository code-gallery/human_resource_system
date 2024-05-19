import React, { useState } from 'react'
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
 
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
const CustomDatePicker = (props) => {
  const [startDate, setStartDate] = useState(new Date());
 
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
     
      isClearable
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select" 
      dateFormat="dd/MM/yyyy"
    />
  );
};
;

export default CustomDatePicker