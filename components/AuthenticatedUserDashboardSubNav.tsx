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

export default function AuthenticatedUserDashboardSubNav() {
    const pathname = usePathname()

    return (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="w-full px-4 md:px-6 lg:px-8">
                <ul className="flex items-center gap-x-3 overflow-x-auto">
                    {subNavigation.map((item, idx) => {
                        const isActive = pathname === item.href
                        return (
                            <li key={idx} className={`py-2 border-b-2 transition-colors ${
                                isActive 
                                    ? "border-indigo-600 dark:border-indigo-400" 
                                    : "border-transparent"
                            }`}>
                                <Link
                                    href={item.href}
                                    className={`py-2.5 px-4 rounded-lg duration-150 text-sm font-medium transition-colors ${
                                        isActive
                                            ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
                                            : "text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                    }`}
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
