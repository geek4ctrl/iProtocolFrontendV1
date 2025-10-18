"use client"

import { useStore } from '@/src/store';
import AuthenticatedUserReservationButtonComponent from './AuthenticatedUserReservationButtonComponent';
import supabase from './SupabaseClient';
import EmptyState from './EmptyState';

// publicSupabaseUrl={publicSupabaseUrl} publicSupabaseAnonKey={publicSupabaseAnonKey} 

const members = [
    {
        avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
        name: "John lorin",
        email: "john@example.com"
    }, {
        avatar: "https://randomuser.me/api/portraits/men/86.jpg",
        name: "Chris bondi",
        email: "chridbondi@example.com"
    }, {
        avatar: "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
        name: "yasmine",
        email: "yasmine@example.com"
    }, {
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f",
        name: "Joseph",
        email: "joseph@example.com"
    },
];

export default function AuthenticatedUserReservationsComponent({ allReservations, user, publicSupabaseUrl, publicSupabaseAnonKey }: { allReservations: any, user: any, publicSupabaseUrl: any, publicSupabaseAnonKey: any }) {

    const allReservationsToDisplayHere = useStore((state) => state.reservation) ? useStore((state) => state.reservation) : allReservations;

    return (
        <section className="py-28">
            <div className="w-full px-4 md:px-6 lg:px-8">
                <div className="max-w-md">
                    <h1 className="text-gray-800 dark:text-gray-100 text-2xl font-extrabold sm:text-4xl">All Reservations</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your event reservations.</p>
                </div>
                
                {allReservationsToDisplayHere && allReservationsToDisplayHere.length > 0 ? (
                    <ul className="mt-12 divide-y space-y-3">
                    {
                        allReservationsToDisplayHere?.map((item: any, idx: any) => (
                            <li key={idx} className="px-4 py-5 duration-150 hover:border-white hover:rounded-xl hover:bg-gray-50" style={{ border: "0.5px solid #80808030", borderRadius: "0.5rem", color: "black" }}>
                                <a className="space-y-3">
                                    <div className="flex items-center gap-x-6">
                                        <img
                                            src={item.userpicture}
                                            width={100}
                                            height={75}
                                            alt="Float UI logo"
                                            className="bg-white w-14 h-14 border rounded-full flex items-center justify-center"
                                            style={{ borderRadius: "50%" }}
                                        />
                                        <div>
                                            <span className="block text-sm text-indigo-600 font-medium">{item.eventdate}</span>
                                            <h3 className="text-base text-gray-800 font-semibold mt-1">{item.eventplace}</h3>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 sm:text-sm" style={{ padding: "0.5rem" }}>
                                        {item.title}
                                    </p>

                                    <div className="text-sm text-gray-600 flex items-center gap-6">
                                        <span className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-gray-500" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clipRule="evenodd" d="M6 6V5C6 3.34315 7.34315 2 9 2H11C12.6569 2 14 3.34315 14 5V6H16C17.1046 6 18 6.89543 18 8V11.5708C15.5096 12.4947 12.8149 12.9999 10 12.9999C7.18514 12.9999 4.49037 12.4947 2 11.5707V8C2 6.89543 2.89543 6 4 6H6ZM8 5C8 4.44772 8.44772 4 9 4H11C11.5523 4 12 4.44772 12 5V6H8V5ZM9 10C9 9.44772 9.44772 9 10 9H10.01C10.5623 9 11.01 9.44772 11.01 10C11.01 10.5523 10.5623 11 10.01 11H10C9.44772 11 9 10.5523 9 10Z" fill="#9CA3AF" />
                                                <path d="M2 13.6923V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V13.6923C15.4872 14.5404 12.7964 14.9999 10 14.9999C7.20363 14.9999 4.51279 14.5404 2 13.6923Z" fill="#9CA3AF" />
                                            </svg>
                                            {item.job_type}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-gray-500" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clipRule="evenodd" d="M5.05025 4.05025C7.78392 1.31658 12.2161 1.31658 14.9497 4.05025C17.6834 6.78392 17.6834 11.2161 14.9497 13.9497L10 18.8995L5.05025 13.9497C2.31658 11.2161 2.31658 6.78392 5.05025 4.05025ZM10 11C11.1046 11 12 10.1046 12 9C12 7.89543 11.1046 7 10 7C8.89543 7 8 7.89543 8 9C8 10.1046 8.89543 11 10 11Z" fill="#9CA3AF" />
                                            </svg>

                                            {item.place}
                                        </span>
                                        <AuthenticatedUserReservationButtonComponent item={item} user={user} />
                                    </div>
                                </a>
                            </li>
                        ))
                    }
                </ul>
                ) : (
                    <div className="mt-12">
                        <EmptyState 
                            type="reservations"
                            title="No Reservations Yet"
                            description="You haven't made any reservations. Browse events to get started."
                            actionLabel="Browse Events"
                            onAction={() => window.location.href = '/events'}
                        />
                    </div>
                )}
            </div>
        </section>
    )
}
