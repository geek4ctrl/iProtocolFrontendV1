export default function ReservationsLoadingSkeleton() {
    return (
        <section className="py-28">
            <div className="w-full px-4 md:px-6 lg:px-8">
                {/* Header Skeleton */}
                <div className="max-w-md mb-12 animate-pulse">
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-80 mb-3"></div>
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-96"></div>
                </div>

                {/* Reservations List Skeleton */}
                <ul className="divide-y space-y-3">
                    {[...Array(5)].map((_, idx) => (
                        <li 
                            key={idx} 
                            className="px-4 py-5 border border-gray-200 dark:border-gray-700 rounded-lg animate-pulse"
                        >
                            <div className="space-y-3">
                                {/* Avatar and Info Skeleton */}
                                <div className="flex items-center gap-x-6">
                                    <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                    <div className="flex-1">
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
                                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                                    </div>
                                </div>

                                {/* Description Skeleton */}
                                <div className="space-y-2 px-2">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                </div>

                                {/* Footer Skeleton */}
                                <div className="flex items-center gap-6">
                                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
                                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                                    <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded-lg w-32 ml-auto"></div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
