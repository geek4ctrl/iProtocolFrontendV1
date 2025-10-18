'use client'

import { useStore } from "@/src/store";
import { showToast } from '@/utils/toast';
import { useRouter } from 'next/navigation';
import type { Plan } from '@/types';

interface AuthenticatedUserDashboardContentProps {
    plans: Plan[];
}

export default function AuthenticatedUserDashboardContent({ plans }: AuthenticatedUserDashboardContentProps) {
    const router = useRouter()

    function callAllFunctions(reservationType: string) {
        chooseReservationType(reservationType)
        showToast.success(`✓ You have chosen ${reservationType}. Redirecting to events...`, { autoClose: 2000 });

        setTimeout(() => {
            routeToEventPage()
        }, 2000)
    }

    function chooseReservationType(reservationType: string) {
        useStore.setState(() => ({
            chosenReservationType: reservationType
        }))
    }

    const routeToEventPage = () => {
        router.push('/events', { scroll: false })
    }

    return (
        <div className="mt-12 px-4">
            <div className='grid gap-6 sm:grid-cols-1 lg:grid-cols-2 max-w-5xl mx-auto'>
                {plans.map((item, idx) => (
                    <div 
                        key={idx} 
                        className='group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-500 hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50'
                    >
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-pink-500/10" />
                        
                        {/* Animated Background Pattern */}
                        <div className="absolute inset-0 opacity-30 dark:opacity-20">
                            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute bottom-0 -right-4 w-72 h-72 bg-indigo-300 dark:bg-indigo-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        {/* Content */}
                        <div className='relative p-8 flex flex-col h-full min-h-[320px]'>
                            {/* Icon with Gradient Background */}
                            <div className="mb-6">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/50 group-hover:shadow-xl group-hover:shadow-indigo-500/60 group-hover:scale-110 transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {item.name === 'Invitation' ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        )}
                                    </svg>
                                </div>
                            </div>

                            {/* Title & Description */}
                            <div className="flex-1">
                                <h3 className='text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300'>
                                    {item.name}
                                </h3>
                                <p className='text-gray-600 dark:text-gray-300 text-base leading-relaxed'>
                                    {item.name === 'Invitation' 
                                        ? 'Request access to exclusive events and ceremonies'
                                        : 'Get official accreditation for event participation'}
                                </p>
                            </div>

                            {/* Button */}
                            <div className="mt-8">
                                <button 
                                    onClick={() => callAllFunctions(item.name)} 
                                    className='w-full px-6 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/60 transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/50'
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        Choose {item.name}
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}