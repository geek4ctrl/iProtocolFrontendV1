'use client'

import { useState } from 'react';
import supabase from "./SupabaseClient";
import { showToast, handleError } from '@/utils/toast';

export default function AuthenticatedUserReservationButtonComponent({ item, user }: { item: any, user: any }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleReserveClick = async (event: any) => {
        setIsDeleting(true);

        try {
            const { error } = await supabase
                .from('event_reservations')
                .delete()
                .eq('id', item.id);

            if (error) {
                handleError(error, 'Delete reservation');
            } else {
                showToast.success('Reservation deleted successfully!');
                setTimeout(() => location.reload(), 1500);
            }
        } catch (error) {
            handleError(error, 'Delete reservation');
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2" 
            onClick={(e) => handleReserveClick(item)} 
            disabled={isDeleting}
            style={{ color: "black", backgroundColor: isDeleting ? "#d4d4d8" : "#F2E3FB" }}
        >
            {isDeleting && (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
    )
}