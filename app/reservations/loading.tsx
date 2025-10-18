import ReservationsLoadingSkeleton from "@/components/ReservationsLoadingSkeleton";
import NavigationBar from "@/components/NavigationBar";
import AurhenticatedUserReservationsSubNav from "@/components/AurhenticatedUserReservationsSubNav";

const navigation = [
    { title: "Francais", path: "javascript:void(0)" },
    { title: "English", path: "javascript:void(0)" },
    { title: "Italien", path: "javascript:void(0)" },
];

export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col" style={{ width: '-webkit-fill-available' }}>
            <NavigationBar navigation={navigation} user={null} />
            <AurhenticatedUserReservationsSubNav />
            
            <div className="flex-1" style={{ width: '-webkit-fill-available' }}>
                <ReservationsLoadingSkeleton />
            </div>
        </div>
    );
}
