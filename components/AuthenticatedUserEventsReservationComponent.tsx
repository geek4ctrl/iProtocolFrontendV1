'use client'

import { useState } from 'react';
import supabase from "./SupabaseClient";
import { showToast, handleError } from '@/utils/toast';

interface Event {
    title: string;
    author: string;
    place: string;
    eventpicture: string;
    // Add more properties as needed
}

interface User {
    email: string;
    // Add more properties as needed
}

interface UserInformation {
    data: {
        firstname: string;
        surname: string;
        // Add more properties as needed
    }[];
}

interface AuthenticatedUserEventsReservationComponentProps {
    item: Event;
    user: User;
    userInformation: UserInformation;
    chosenReservationType: string; // Replace 'string' with the appropriate type
}

export default function AuthenticatedUserEventsReservationComponent({ item, user, userInformation, chosenReservationType }: { item: any, user: any, userInformation: any, chosenReservationType: any }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleReserveClick = async (event: any) => {
        setIsLoading(true);

        try {
            if (chosenReservationType == "Invitation") {
                showToast.info('Thank you for your request. Please contact the State Protocol Service or Cenco for invitation processing.');
                setIsLoading(false);
                return;
            }

            const objectDataToSend = {
                userid: user.email,
                userfirstname: userInformation?.data[0]?.firstname,
                userlastname: userInformation?.data[0]?.surname,
                userpicture: "https://res.cloudinary.com/dhqvb8wbn/image/upload/v1658596949/iprotoco…",
                eventtitle: event.title,
                eventauthor: event.author,
                eventdate: event.date,
                eventplace: event.place,
                programtime: event?.programme[0]?.time,
                programtitle: event?.programme[0]?.title,
                programpicture: event?.programme[0]?.picture,
                status: false,
                invitationstatus: "pending",
                reservationtype: chosenReservationType
            }

            const { error } = await supabase
                .from('event_reservations')
                .insert(objectDataToSend)

            if (error) {
                if (error.code === "23505") {
                    showToast.warning('You have already reserved this event.');
                } else {
                    handleError(error, 'Reservation');
                }
            } else {
                showToast.success('✓ Reservation successful! You can view it in your reservations.');
                // Optional: Refresh or redirect
                // setTimeout(() => location.reload(), 2000);
            }
        } catch (error) {
            handleError(error, 'Reservation');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2" 
            onClick={(e) => handleReserveClick(item)} 
            disabled={isLoading}
            style={{ color: "black", backgroundColor: isLoading ? "#d4d4d8" : "#F2E3FB" }}
        >
            {isLoading && (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {isLoading ? 'Reserving...' : 'Reserve'}
        </button>
    )
}