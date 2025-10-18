"use client"

import type { Event } from "@/types";
import { useStore } from "@/src/store"
import { showToast } from '@/utils/toast';
import EmptyState from './EmptyState';

interface UnauthenticatedUserEventsComponentProps {
    allEventsToDisplay: Event[];
}

export default function UnauthenticatedUserEventsComponent({ allEventsToDisplay }: UnauthenticatedUserEventsComponentProps) {

    const allEventsToDisplayHere = useStore((state) => state.event);
    
    // Use store data if available, otherwise fallback to props
    const eventsToShow = (allEventsToDisplayHere && allEventsToDisplayHere.length > 0) 
        ? allEventsToDisplayHere 
        : allEventsToDisplay;

    const notify = () => showToast.info('Please sign in to make a reservation.');

    return (
        <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
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
                                        <span className="block text-gray-900 dark:text-white font-semibold">{items.author}</span>
                                        <span className="block text-gray-600 dark:text-gray-200 text-sm">{items.time}</span>
                                    </div>
                                </div>
                                <div className="pt-3 ml-4 mr-2 mb-3">
                                    <h3 className="text-xl text-gray-900 dark:text-white font-bold">
                                        {items.date}
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-200 text-sm mt-1 font-medium">{items.title}</p>
                                </div>
                            </button>
                        </article>
                    ))
                }
            </div>
            ) : (
                <EmptyState 
                    type="events"
                    title="No Events Available"
                    description="There are currently no events to display. Check back later for upcoming events."
                />
            )}
        </section>
    )
}