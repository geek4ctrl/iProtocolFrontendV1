import LogoutButton from '@/components/LogoutButton';
import NavigationBar from '@/components/NavigationBar';
import FooterComponent from '@/components/FooterComponent';
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

            <form
              className="flex flex-col gap-7"
              action="/auth/sign-in"
              method="post"
            >
              <div>
                <label 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" 
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="w-full rounded-md px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" 
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full rounded-md px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-md px-4 py-3.5 transition-colors shadow-sm hover:shadow-md mt-2"
              >
                Sign In
              </button>

              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Don't have an account?
                  </span>
                </div>
              </div>

              <button
                type="submit"
                formAction="/auth/sign-up"
                className="w-full bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-medium border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3.5 transition-colors shadow-sm hover:shadow-md"
              >
                Create Account
              </button>

              <Messages />
            </form>
          </div>
        </div>
      </div>

      <FooterComponent footerNavs={footerNavs} />
    </div>
  )
}
