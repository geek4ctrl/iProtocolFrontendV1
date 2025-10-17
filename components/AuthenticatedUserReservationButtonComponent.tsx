'use client'

import supabase from "./SupabaseClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AuthenticatedUserReservationButtonComponent({ item, user }: { item: any, user: any }) {

    const handleReserveClick = async (event: any) => {

        try {
            const { error } = await supabase
                .from('event_reservations')
                .delete()
                .eq('id', item.id);

            if (error) {
                throw error;
            }

            successfulNotification();

            location.reload();
        } catch (error) {
            failedNotification();
        }

    }

    const successfulNotification = (() => toast(`Reservation deleted successfully.`));
    const failedNotification = (() => toast(`Failed to make a reservation.`));

    return (
        <span className="flex items-center gap-2">
            <ToastContainer />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => handleReserveClick(item)} style={{ color: "black", backgroundColor: "#F2E3FB" }}>
                Delete
            </button>
        </span>
    )
}