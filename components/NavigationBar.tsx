import type { NavigationItem, SupabaseUser } from "@/types";
import Link from "next/link"
import LogoutButton from "./LogoutButton"
import NavigationBarLanguagesClientComponent from "./NavigationBarLanguagesClientComponent"
import ThemeToggle from "./ThemeToggle"

interface NavigationBarProps {
    navigation: NavigationItem[];
    user: SupabaseUser | null;
}

export default function NavigationBar({ navigation, user }: NavigationBarProps) {

    return (
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 w-full md:static md:text-sm transition-colors">
            <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <a href="/">
                        <img
                            src="https://res.cloudinary.com/dhqvb8wbn/image/upload/v1653855971/iProtocol_icone_i1wzgx.png"
                            width={120}
                            height={50}
                            alt="Float UI logo"
                            className="dark:invert"
                        />
                    </a>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row md:items-center md:justify-end gap-4 md:gap-6 mt-4 md:mt-0">
                    <ul className="flex flex-col gap-2 md:flex-row md:gap-4 w-full md:w-auto p-0 m-0">
                        {navigation.map((item) => (
                            <NavigationBarLanguagesClientComponent key={item.title} item={item} />
                        ))}
                    </ul>
                    <div className="flex flex-col gap-2 md:flex-row md:gap-4 w-full md:w-auto">
                        <ThemeToggle />
                        {user ? (
                            <div className="flex items-center gap-4 text-gray-900 dark:text-gray-100 font-medium">
                                Hey, {user.email}!
                                <LogoutButton />
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2 md:flex-row md:gap-4 w-full md:w-auto">
                                <Link href="/login" className="w-full md:w-auto py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-center focus:outline-none focus:ring-2 focus:ring-indigo-400">
                                    Log in
                                </Link>
                                <Link href="/login" className="w-full md:w-auto py-2 px-4 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 text-center focus:outline-none focus:ring-2 focus:ring-indigo-400">
                                    Sign in
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )

}