'use client'

import type { NavigationItem, SupabaseUser } from "@/types";
import Link from "next/link"
import { useState } from "react"
import LogoutButton from "./LogoutButton"
import NavigationBarLanguagesClientComponent from "./NavigationBarLanguagesClientComponent"
import ThemeToggle from "./ThemeToggle"

interface NavigationBarProps {
    navigation: NavigationItem[];
    user: SupabaseUser | null;
}

export default function NavigationBar({ navigation, user }: NavigationBarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 w-full transition-colors">
            <div className="px-4 max-w-screen-xl mx-auto md:px-8">
                <div className="flex items-center justify-between py-3 md:py-5">
                    {/* Logo - Left side */}
                    <div className="flex-shrink-0">
                        <a href="/">
                            <img
                                src="https://res.cloudinary.com/dhqvb8wbn/image/upload/v1653855971/iProtocol_icone_i1wzgx.png"
                                width={120}
                                height={50}
                                alt="iProtocol logo"
                                className="dark:invert"
                            />
                        </a>
                    </div>

                    {/* Desktop Navigation - Right side */}
                    <div className="hidden md:flex items-center gap-4 lg:gap-6">
                        {/* Language Switcher */}
                        <ul className="flex items-center gap-2 lg:gap-4">
                            {navigation.map((item) => (
                                <NavigationBarLanguagesClientComponent key={item.title} item={item} />
                            ))}
                        </ul>

                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Auth Section */}
                        {user ? (
                            <div className="flex items-center gap-4 text-gray-900 dark:text-gray-100 font-medium">
                                <span className="text-sm">Hey, {user.email}!</span>
                                <LogoutButton />
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link href="/login" className="py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-center focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors text-sm">
                                    Log in
                                </Link>
                                <Link href="/login" className="py-2 px-4 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 text-center focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors text-sm">
                                    Sign in
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden pb-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                        {/* Language Switcher */}
                        <div className="mb-4">
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 px-2">LANGUAGE</p>
                            <ul className="flex flex-wrap gap-2">
                                {navigation.map((item) => (
                                    <NavigationBarLanguagesClientComponent key={item.title} item={item} />
                                ))}
                            </ul>
                        </div>

                        {/* Theme Toggle */}
                        <div className="mb-4 px-2">
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">THEME</p>
                            <ThemeToggle />
                        </div>

                        {/* Auth Section */}
                        {user ? (
                            <div className="px-2 py-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <p className="text-sm text-gray-900 dark:text-gray-100 font-medium mb-3">
                                    Hey, {user.email}!
                                </p>
                                <LogoutButton />
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2 px-2">
                                <Link 
                                    href="/login" 
                                    className="w-full py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-center focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Log in
                                </Link>
                                <Link 
                                    href="/login" 
                                    className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 text-center focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Sign in
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    )

}