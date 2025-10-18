'use client'

import { useStore } from "@/src/store";
import type { Event } from "@/types";
import { useState, useEffect } from "react";

interface NavigationItem {
    // Define the structure of a navigation item as needed
    name: string;
    href: string;
    // Add more properties as needed
}

interface NavigationBarProps {
    navigation: NavigationItem[];
    user: {
        email: string;
        // Add more user properties as needed
    } | null;
}


export function NavigationClientComponent({ allGomaPlaces, allKinshasaPlaces }: { allGomaPlaces: any, allKinshasaPlaces: any }) {

    const allPlaces = useStore((state) => state.place)
    const allEventsFromStore = useStore((state) => state.event)
    const [originalEvents, setOriginalEvents] = useState<Event[]>([])
    const [selectedPlace, setSelectedPlace] = useState<string | null>(null)

    // Store the original events on mount
    useEffect(() => {
        if (allEventsFromStore && allEventsFromStore.length > 0 && originalEvents.length === 0) {
            setOriginalEvents(allEventsFromStore)
        }
    }, [allEventsFromStore])

    function choosePlace(place: string) {
        setSelectedPlace(place)
        // Filter events by the selected place
        const filteredEvents = originalEvents.filter((event: Event) => event.place === place)
        
        useStore.setState(() => ({
            event: filteredEvents
        }))
    }

    function showAllEvents() {
        setSelectedPlace(null)
        // Reset to show all events
        useStore.setState(() => ({
            event: originalEvents
        }))
    }

    return (
        <section className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-indigo-900/20 dark:to-purple-900/20" aria-label="Event Navigation Section">
            <div className="w-full px-6 py-16 md:px-12 lg:px-16">
                <div className="space-y-4 mb-8 text-center">
                    <h1 className="text-gray-900 dark:text-white text-3xl font-bold sm:text-4xl">
                        Program of the Papal Visit
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Always arrive 2 hours before the event
                    </p>
                </div>

                <nav className="flex gap-3 justify-center flex-wrap" aria-label="Event places navigation" role="navigation">
                    <button 
                        onClick={showAllEvents}
                        className={`py-3 px-6 font-semibold text-sm duration-200 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                            selectedPlace === null 
                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500' 
                                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-gray-400'
                        }`}
                        aria-current={selectedPlace === null ? 'page' : undefined}
                        aria-label="Show all events"
                    >
                        All Events
                    </button>
                    {
                        allPlaces?.map((items: any) => (
                            <button 
                                key={items.place}
                                onClick={() => choosePlace(items.place)}
                                className={`py-3 px-6 font-semibold text-sm duration-200 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                                    selectedPlace === items.place 
                                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500' 
                                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-gray-400'
                                }`}
                                aria-current={selectedPlace === items.place ? 'page' : undefined}
                                aria-label={`Show events for ${items.place}`}
                            >
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.05025 4.05025C7.78392 1.31658 12.2161 1.31658 14.9497 4.05025C17.6834 6.78392 17.6834 11.2161 14.9497 13.9497L10 18.8995L5.05025 13.9497C2.31658 11.2161 2.31658 6.78392 5.05025 4.05025ZM10 11C11.1046 11 12 10.1046 12 9C12 7.89543 11.1046 7 10 7C8.89543 7 8 7.89543 8 9C8 10.1046 8.89543 11 10 11Z" />
                                    </svg>
                                    {items.place}
                                </span>
                            </button>
                        ))
                    }
                </nav>

            </div>
        </section>
    )

}