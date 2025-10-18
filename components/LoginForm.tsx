'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleAuthError, showToast } from '@/utils/toast';

export default function LoginForm() {
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);
    const router = useRouter();

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSigningIn(true);
        
        const formData = new FormData(e.currentTarget);
        
        try {
            const response = await fetch('/auth/sign-in', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                showToast.success('Sign in successful! Redirecting...', { autoClose: 1500 });
                setTimeout(() => {
                    router.push('/');
                    router.refresh();
                }, 1500);
            } else {
                const error = await response.json().catch(() => ({}));
                handleAuthError(error);
            }
        } catch (error) {
            console.error('Sign in error:', error);
            handleAuthError(error);
        } finally {
            setIsSigningIn(false);
        }
    };

    const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsSigningUp(true);
        
        const form = e.currentTarget.closest('form');
        if (!form) return;
        
        const formData = new FormData(form);
        
        try {
            const response = await fetch('/auth/sign-up', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                showToast.success('Account created successfully! Redirecting...', { autoClose: 1500 });
                setTimeout(() => {
                    router.push('/');
                    router.refresh();
                }, 1500);
            } else {
                const error = await response.json().catch(() => ({}));
                handleAuthError(error);
            }
        } catch (error) {
            console.error('Sign up error:', error);
            handleAuthError(error);
        } finally {
            setIsSigningUp(false);
        }
    };

    return (
        <form className="flex flex-col gap-7" onSubmit={handleSignIn}>
            <div>
                <label 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" 
                    htmlFor="email"
                >
                    Email Address
                </label>
                <input
                    className="w-full rounded-md px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    disabled={isSigningIn || isSigningUp}
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
                    className="w-full rounded-md px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    disabled={isSigningIn || isSigningUp}
                />
            </div>

            <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-md px-4 py-3.5 transition-colors shadow-sm hover:shadow-md mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={isSigningIn || isSigningUp}
            >
                {isSigningIn && (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                {isSigningIn ? 'Signing In...' : 'Sign In'}
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
                type="button"
                onClick={handleSignUp}
                className="w-full bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-medium border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3.5 transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={isSigningIn || isSigningUp}
            >
                {isSigningUp && (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                {isSigningUp ? 'Creating Account...' : 'Create Account'}
            </button>
        </form>
    );
}
