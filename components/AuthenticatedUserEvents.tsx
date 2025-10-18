'use client'

import { useStore } from "@/src/store";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import AuthenticatedUserEventsReservationComponent from './AuthenticatedUserEventsReservationComponent';

interface Event {
    title: string;
    author: string;
    place: string;
    eventpicture: string;
    // Add more properties as needed
}

interface AuthenticatedUserEventsProps {
    allEvents: Event[];
    user: any; // Replace 'any' with the appropriate user type
    userInformation: any; // Replace 'any' with the appropriate userInformation type
    publicSupabaseUrl: any; // Replace 'any' with the appropriate type
    publicSupabaseAnonKey: any; // Replace 'any' with the appropriate type
}

export default function AuthenticatedUserEvents({ allEvents, user, userInformation, publicSupabaseUrl, publicSupabaseAnonKey }: AuthenticatedUserEventsProps) {

    const supabase = createClientComponentClient()
    const allEventsToDisplayHere = useStore((state) => state.event) ? useStore((state) => state.event) : allEvents;
    const chosenReservationType = useStore((state) => state.chosenReservationType);

    const loggedInUserEmail = user.email;

    const handleReserveClick = async (event: any) => {

        const objectDataToSend = {
            userid: loggedInUserEmail,
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
                // Duplicate reservation - handle silently or show user notification
            }
        } else {
            // location.reload();
        }

    }


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="w-full px-4 py-12 md:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-gray-900 dark:text-gray-100 text-3xl font-bold sm:text-4xl mb-3">All Events</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Discover upcoming events and reserve your spot</p>
                </div>

                {/* Events Grid */}
                {allEventsToDisplayHere && allEventsToDisplayHere.length > 0 ? (
                    <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                        {allEventsToDisplayHere.map((item: any, idx: any) => (
                            <div 
                                key={idx} 
                                className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:border-indigo-500 dark:hover:border-indigo-400"
                            >
                                {/* Event Image */}
                                {item.eventpicture && (
                                    <div className="relative h-72 overflow-hidden bg-gray-100 dark:bg-gray-700">
                                        <img
                                            src={item.eventpicture}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {/* Place Badge */}
                                        {item.place && (
                                            <div className="absolute top-4 left-4">
                                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-indigo-600 text-white shadow-lg">
                                                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.05025 4.05025C7.78392 1.31658 12.2161 1.31658 14.9497 4.05025C17.6834 6.78392 17.6834 11.2161 14.9497 13.9497L10 18.8995L5.05025 13.9497C2.31658 11.2161 2.31658 6.78392 5.05025 4.05025ZM10 11C11.1046 11 12 10.1046 12 9C12 7.89543 11.1046 7 10 7C8.89543 7 8 7.89543 8 9C8 10.1046 8.89543 11 10 11Z" />
                                                    </svg>
                                                    {item.place}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Event Content */}
                                <div className="p-8">
                                    {/* Author */}
                                    {item.author && (
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                                            {item.author}
                                        </h3>
                                    )}

                                    {/* Title/Description */}
                                    <p className="text-gray-600 dark:text-gray-400 text-base line-clamp-4 mb-6">
                                        {item.title}
                                    </p>

                                    {/* Event Details */}
                                    <div className="flex items-center gap-6 text-base text-gray-500 dark:text-gray-400 mb-6">
                                        {item.date && (
                                            <span className="flex items-center gap-2">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {item.date}
                                            </span>
                                        )}
                                        {item.time && (
                                            <span className="flex items-center gap-2">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {item.time}
                                            </span>
                                        )}
                                    </div>

                                    {/* Reservation Button */}
                                    <AuthenticatedUserEventsReservationComponent 
                                        item={item} 
                                        user={user} 
                                        userInformation={userInformation} 
                                        chosenReservationType={chosenReservationType} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-16">
                        <svg className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No events found</h3>
                        <p className="text-gray-500 dark:text-gray-400">Check back later for upcoming events</p>
                    </div>
                )}
            </div>
        </section>
    )

}