"use client"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NavigationItem {
    // Define the structure of a navigation item as needed
    title: string;
    // Add more properties as needed
}

interface NavigationBarLanguagesClientComponentProps {
    item: NavigationItem;
    idx: number;
}

export default function NavigationBarLanguagesClientComponent({ item, idx }: { item: any, idx: any }) {

    const notify = () => toast("Internationalization hasn't been applied");

    return (
        <li className="w-full md:w-auto">
            <ToastContainer theme="colored" />
            <button
                onClick={notify}
                className="w-full md:w-auto py-2 px-4 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-medium bg-white dark:bg-gray-900 hover:bg-indigo-50 dark:hover:bg-gray-800 text-left md:text-center focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
                type="button"
                aria-label={`Switch language to ${item.title}`}
            >
                {item.title}
            </button>
        </li>
    )
}
