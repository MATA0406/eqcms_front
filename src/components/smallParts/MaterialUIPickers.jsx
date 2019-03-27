import React from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';

// 데이트피커
function MaterialUIPickers(props) {
  const { handleDateChange, buyDt } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        value={buyDt}
        onChange={handleDateChange}
        format="YYYY-MM-dd"
      />
    </MuiPickersUtilsProvider>
  );
}

export default MaterialUIPickers;
