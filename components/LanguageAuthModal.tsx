import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

export default function LanguageAuthModal({ onClose }: { onClose?: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative w-full max-w-xs bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-gray-100 dark:border-gray-800">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl font-bold focus:outline-none"
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex items-center gap-2 mb-2">
          <img
            src="https://res.cloudinary.com/dhqvb8wbn/image/upload/v1653855971/iProtocol_icone_i1wzgx.png"
            alt="iProtocol Logo"
            className="w-8 h-8 dark:invert"
          />
          <span className="text-xl font-bold text-gray-800 dark:text-white">iProtocol</span>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <button className="text-left py-2 px-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400">Français</button>
          <button className="text-left py-2 px-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400">English</button>
          <button className="text-left py-2 px-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400">Italiano</button>
        </div>
        <div className="flex gap-2 mb-2">
          <ThemeToggle />
        </div>
        <div className="flex gap-2 w-full">
          <Link href="/login" className="flex-1 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-center focus:outline-none focus:ring-2 focus:ring-indigo-400">Log in</Link>
          <Link href="/login" className="flex-1 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 text-center focus:outline-none focus:ring-2 focus:ring-indigo-400">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
