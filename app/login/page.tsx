import LogoutButton from '@/components/LogoutButton';
import NavigationBar from '@/components/NavigationBar';
import FooterComponent from '@/components/FooterComponent';
import LoginForm from '@/components/LoginForm';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import Messages from './messages';
import type { NavigationItem, FooterNavItem } from '@/types';

export default async function Login() {

  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const navigation: NavigationItem[] = [
    { title: "Français", path: "#" },
    { title: "English", path: "#" },
    { title: "Italiano", path: "#" },
  ];

  const footerNavs: FooterNavItem[] = [
    { href: '/about', name: 'About' },
    { href: '/events', name: 'Events' },
    { href: '/contact', name: 'Contact' },
    { href: '/support', name: 'Support' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <NavigationBar navigation={navigation} user={user} />

      <div className="flex-1 flex flex-col w-full px-4 sm:px-8 py-16 justify-center items-center">
        <div className="w-full max-w-md space-y-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 py-2 px-4 rounded-md no-underline text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Home
          </Link>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-10">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Sign in to your account to continue
              </p>
            </div>

            <LoginForm />
            <Messages />
          </div>
        </div>
      </div>

      <FooterComponent footerNavs={footerNavs} />
    </div>
  )
}
