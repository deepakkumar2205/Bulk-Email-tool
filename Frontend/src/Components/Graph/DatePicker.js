import { addDays } from 'date-fns';
import { useContext, useState } from 'react';
import React from 'react';
import { DateRangePicker } from 'react-date-range';
import Context from '../../Context/Context';

const DatePicker = () => {
  const contextData = useContext(Context);

  return (
    <div>
        <DateRangePicker
        onChange={item => contextData.setTimeStamp([item.selection])}
        months={1}
        minDate={addDays(new Date(), -300)}
        maxDate={addDays(new Date(), 900)}
        direction="vertical"
        scroll={{ enabled: true }}
        ranges={contextData.timeStamp}
        />
    </div>
  )
}

export default DatePicker