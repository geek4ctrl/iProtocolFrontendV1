import type { Event, Place } from "@/types";
import { NavigationClientComponent } from "./NavigationClientComponent";
import UnauthenticatedUserEventsComponent from "./UnauthenticatedUserEventsComponent";

interface UnauthenticatedUserProps {
    allEventsToDisplay: Event[];
    allGomaPlaces: Place[];
    allKinshasaPlaces: Place[];
}

export default function UnauthenticatedUser({ allEventsToDisplay, allGomaPlaces, allKinshasaPlaces }: UnauthenticatedUserProps) {
    return (
        <div className="w-full flex flex-col items-center">
            <NavigationClientComponent allGomaPlaces={allGomaPlaces} allKinshasaPlaces={allKinshasaPlaces} />
            <UnauthenticatedUserEventsComponent allEventsToDisplay={allEventsToDisplay} />
        </div>
    )
}