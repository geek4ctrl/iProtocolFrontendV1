import EventsLoadingSkeleton from "@/components/EventsLoadingSkeleton";
import NavigationBar from "@/components/NavigationBar";
import AuthenticatedUserEventsSubNav from "@/components/AuthenticatedUserEventsSubNav";
import type { NavigationItem } from '@/types';

const navigation: NavigationItem[] = [
    { title: "Français", path: "#" },
    { title: "English", path: "#" },
    { title: "Italiano", path: "#" },
];

export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col" style={{ width: '-webkit-fill-available' }}>
            <NavigationBar navigation={navigation} user={null} />
            <AuthenticatedUserEventsSubNav />
            
            <div className="flex-1" style={{ width: '-webkit-fill-available' }}>
                <EventsLoadingSkeleton />
            </div>
        </div>
    );
}
