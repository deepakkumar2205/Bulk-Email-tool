import { addDays } from 'date-fns';
import { useState } from 'react';
import React from 'react';
import { DateRangePicker } from 'react-date-range';

const DatePicker = () => {

    const [state, setState] = useState([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection'
      }
    ]);
    console.log(state);

  return (
    <div>
        <DateRangePicker
        onChange={item => setState([item.selection])}
        months={1}
        minDate={addDays(new Date(), -300)}
        maxDate={addDays(new Date(), 900)}
        direction="vertical"
        scroll={{ enabled: true }}
        ranges={state}
        />
    </div>
  )
}

export default DatePicker