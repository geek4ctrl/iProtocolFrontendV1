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
        <li key={idx} className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">
            <ToastContainer theme="colored" />
            <button 
                onClick={notify}
                className="block cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
                type="button"
            >
                {item.title}
            </button>
        </li>
    )
}
