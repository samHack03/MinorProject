import { createContext } from "react";
import { useState } from "react";

export const BookingContext = createContext();


function ContextBookingDetails({children}) {
    const [arrivalDate, setArrivalDate] = useState("");
    const [departDate, setDepartDate] = useState("");
    const [guests, setGuests] = useState("");
    return (
        <BookingContext.Provider value={{arrivalDate, setArrivalDate, departDate, setDepartDate, guests, setGuests }}>
            {children}
        </BookingContext.Provider>
    )
}

export default ContextBookingDetails
