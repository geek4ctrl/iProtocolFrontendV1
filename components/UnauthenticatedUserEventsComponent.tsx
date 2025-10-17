"use client"

import type { Event } from "@/types";
import { useStore } from "@/src/store"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UnauthenticatedUserEventsComponentProps {
    allEventsToDisplay: Event[];
}

export default function UnauthenticatedUserEventsComponent({ allEventsToDisplay }: UnauthenticatedUserEventsComponentProps) {

    const allEventsToDisplayHere = useStore((state) => state.event);
    
    // Use store data if available, otherwise fallback to props
    const eventsToShow = (allEventsToDisplayHere && allEventsToDisplayHere.length > 0) 
        ? allEventsToDisplayHere 
        : allEventsToDisplay;

    const notify = () => toast("Please login to make a reservation");

    return (
        <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
            <ToastContainer theme="colored" />
            {eventsToShow && eventsToShow.length > 0 ? (
            <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">

                {
                    eventsToShow.map((items, key) => (
                        <article className="max-w-md mx-auto mt-4 shadow-lg border border-gray-200 dark:border-gray-700 rounded-md duration-300 hover:shadow-xl bg-white dark:bg-gray-800" key={key} style={{ width: "-webkit-fill-available", cursor: "pointer" }}>
                            <button onClick={notify} className="w-full text-left">
                                <img src={items.eventpicture} loading="lazy" alt={items.title} className="w-full h-80 rounded-t-md object-cover" />
                                <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                                    <div className="flex-none w-10 h-10 rounded-full">
                                        <img src={items.eventpicture} className="w-full h-full rounded-full object-cover" alt={items.author} />
                                    </div>
                                    <div className="ml-3">
                                        <span className="block text-gray-900 dark:text-gray-100 font-semibold">{items.author}</span>
                                        <span className="block text-gray-600 dark:text-gray-400 text-sm">{items.time}</span>
                                    </div>
                                </div>
                                <div className="pt-3 ml-4 mr-2 mb-3">
                                    <h3 className="text-xl text-gray-900 dark:text-gray-100 font-bold">
                                        {items.date}
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm mt-1 font-medium">{items.title}</p>
                                </div>
                            </button>
                        </article>
                    ))
                }
            </div>
            ) : (
                <div className="mt-12 text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="max-w-md mx-auto">
                        <svg className="mx-auto h-12 w-12 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-gray-100">No events available</h3>
                        <p className="mt-1 text-base text-gray-700 dark:text-gray-300">Check back later for upcoming events.</p>
                    </div>
                </div>
            )}
        </section>
    )
}