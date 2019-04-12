import React from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';

// 데이트피커
function MaterialUIPickers(props) {
  const { handleDateChange, buyDt, dateDisabled } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        keyboard
        value={buyDt}
        label="구입 일자"
        variant="outlined"
        onChange={handleDateChange}
        format="YYYY-MM-dd"
        disabled={dateDisabled}
        required
      />
    </MuiPickersUtilsProvider>
  );
}

export default MaterialUIPickers;
