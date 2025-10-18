"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const subNavigation = [
    {
        href: "/",
        name: "Dashboard"
    },
    {
        href: "/events",
        name: "Events"
    },
    {
        href: "/reservations",
        name: "Reservations"
    }
]

export default function AuthenticatedUserEventsSubNav() {
    const pathname = usePathname()

    return (
        <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <ul className="flex items-center gap-x-3 overflow-x-auto">
                    {subNavigation.map((item, idx) => {
                        const isActive = pathname === item.href
                        return (
                            <li key={idx} className={`py-2 border-b-2 transition-colors ${
                                isActive 
                                    ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400" 
                                    : "border-transparent text-gray-500 dark:text-gray-400"
                            }`}>
                                <Link
                                    href={item.href}
                                    className="py-2.5 px-4 rounded-lg duration-150 text-sm hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600 font-medium transition-colors"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
