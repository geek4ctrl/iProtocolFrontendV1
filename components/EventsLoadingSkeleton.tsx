export default function EventsLoadingSkeleton() {
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="w-full px-4 py-12 md:px-6 lg:px-8">
                {/* Header Skeleton */}
                <div className="mb-10 animate-pulse">
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-64 mb-3"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-96"></div>
                </div>

                {/* Events Grid Skeleton */}
                <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {[...Array(6)].map((_, idx) => (
                        <div 
                            key={idx} 
                            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse"
                        >
                            {/* Image Skeleton */}
                            <div className="relative h-72 bg-gray-200 dark:bg-gray-700">
                                {/* Place Badge Skeleton */}
                                <div className="absolute top-4 left-4">
                                    <div className="h-9 w-24 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                </div>
                            </div>

                            {/* Content Skeleton */}
                            <div className="p-8 space-y-4">
                                {/* Author Skeleton */}
                                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4"></div>

                                {/* Description Skeleton */}
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                                </div>

                                {/* Date/Time Skeleton */}
                                <div className="flex items-center gap-6">
                                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
                                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                                </div>

                                {/* Button Skeleton */}
                                <div className="h-11 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
