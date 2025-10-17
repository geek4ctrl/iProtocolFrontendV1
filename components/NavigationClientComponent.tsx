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
        <section className="py-28" style={{ background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.17) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)", width: "-webkit-fill-available" }}>
            <div className="max-w-screen-xl mx-auto px-4 md:text-center md:px-8">
                <div className="max-w-xl space-y-3 md:mx-auto">
                    <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                        Program of the papal visit
                    </p>
                    <p className="text-gray-600">
                        Always arrive 2 hours before
                    </p>
                </div>

                <div className="mt-4 flex gap-2 justify-center flex-wrap" style={{ cursor: "pointer" }}>
                    <button 
                        onClick={showAllEvents}
                        className={`inline-block py-2 px-4 text-white font-medium duration-150 rounded-lg shadow-md hover:shadow-none ${
                            selectedPlace === null ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-600 hover:bg-gray-700'
                        }`}
                    >
                        All Events
                    </button>
                    {
                        allPlaces?.map((items: any, key: any) => (
                            <button 
                                key={key}
                                onClick={() => choosePlace(items.place)}
                                className={`inline-block py-2 px-4 text-white font-medium duration-150 rounded-lg shadow-md hover:shadow-none ${
                                    selectedPlace === items.place ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-800 hover:bg-gray-700'
                                }`}
                            >
                                {items.place}
                            </button>
                        ))
                    }
                </div>

            </div>
        </section>
    )

}