import { createContext,useState } from "react";

export const DateContext = createContext()

export function DateProvider (props) {
    const [selectDate, setSelectDate] = useState(false);
    const today = new Date();
    const tomorrow = new Date();
    const nextDay = new Date();
    tomorrow.setHours(tomorrow.getHours() + 7);
    nextDay.setHours(nextDay.getHours() + 31);
    const [checkIn, setCheckIn] = useState(tomorrow);
    const [checkOut, setCheckOut] = useState(nextDay);

    const [dates, setDates] = useState([
      {
        startDate: tomorrow,
        endDate: nextDay,
        key: "selection",
      },
    ]);

    return (
        <DateContext.Provider value={{today, tomorrow, selectDate, setSelectDate, checkIn, setCheckIn, checkOut, setCheckOut, dates, setDates}}>
            {props.children}
        </DateContext.Provider> 
    )
}