import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';

function MaterialUIPickers() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="pickers">
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          format="YYYY-MM-DD"
          minDate="0d"
          maxDate="+31d"
        />
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default MaterialUIPickers;
