import React from 'react';

export type EmptyStateType = 'events' | 'reservations' | 'search' | 'error' | 'no-data' | 'dashboard';

interface EmptyStateProps {
    type?: EmptyStateType;
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    icon?: React.ReactNode;
}

const defaultConfigs: Record<EmptyStateType, { icon: React.ReactNode; title: string; description: string }> = {
    events: {
        icon: (
            <svg className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        title: 'No Events Found',
        description: 'There are currently no events available. Check back later for upcoming events.'
    },
    reservations: {
        icon: (
            <svg className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
        ),
        title: 'No Reservations Yet',
        description: "You haven't made any reservations. Browse events to get started."
    },
    search: {
        icon: (
            <svg className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        ),
        title: 'No Results Found',
        description: 'Try adjusting your search or filter criteria to find what you\'re looking for.'
    },
    error: {
        icon: (
            <svg className="mx-auto h-16 w-16 text-red-400 dark:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        title: 'Something Went Wrong',
        description: 'An error occurred while loading the data. Please try again later.'
    },
    'no-data': {
        icon: (
            <svg className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
        ),
        title: 'No Data Available',
        description: 'There is currently no data to display.'
    },
    dashboard: {
        icon: (
            <svg className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
        title: 'Welcome to iProtocol',
        description: 'Get started by selecting an event type below.'
    }
};

export default function EmptyState({ 
    type = 'no-data', 
    title, 
    description, 
    actionLabel, 
    onAction,
    icon 
}: EmptyStateProps) {
    const config = defaultConfigs[type];
    const displayTitle = title || config.title;
    const displayDescription = description || config.description;
    const displayIcon = icon || config.icon;

    return (
        <div className="text-center py-16 px-4">
            <div className="max-w-md mx-auto">
                {displayIcon}
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
                    {displayTitle}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {displayDescription}
                </p>
                {actionLabel && onAction && (
                    <button
                        onClick={onAction}
                        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-colors"
                    >
                        {actionLabel}
                    </button>
                )}
            </div>
        </div>
    );
}
