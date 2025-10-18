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
        <div className="mt-12">
            <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto'>
                {plans.map((item, idx) => (
                    <div 
                        key={idx} 
                        className='group relative overflow-hidden rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20'
                    >
                        {/* Background Image with Overlay */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                            style={{ backgroundImage: `url(${item.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90" />

                        {/* Content */}
                        <div className='relative p-8 flex flex-col h-full min-h-[280px]'>
                            <div className="flex-1">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {item.name === 'Invitation' ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        )}
                                    </svg>
                                </div>
                                <h3 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3'>
                                    {item.name}
                                </h3>
                                <p className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed'>
                                    {item.name === 'Invitation' 
                                        ? 'Request access to exclusive events and ceremonies'
                                        : 'Get official accreditation for event participation'}
                                </p>
                            </div>

                            {/* Features List */}
                            {item.features && item.features.length > 0 && (
                                <ul className='mt-6 space-y-2'>
                                    {item.features.slice(0, 3).map((feature: string, featureIdx: number) => (
                                        <li key={featureIdx} className='flex items-center text-sm text-gray-600 dark:text-gray-400'>
                                            <svg className="w-4 h-4 mr-2 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Button */}
                            <div className="mt-8">
                                <button 
                                    onClick={() => callAllFunctions(item.name)} 
                                    className='w-full px-6 py-3 rounded-lg font-semibold text-sm duration-200 text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
                                >
                                    Choose {item.name}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}