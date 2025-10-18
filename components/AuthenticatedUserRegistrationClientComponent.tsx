'use client'

import { useState } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { v4 as uuidv4 } from 'uuid';

interface UserTitle {
    value: string;
    // Add more properties as needed
}

interface UserDesignation {
    value: string;
    // Add more properties as needed
}

interface User {
    email: string;
    // Add more properties as needed
}

interface AuthenticatedUserRegistrationClientComponentProps {
    userTitle: UserTitle[];
    userDesignation: UserDesignation[];
    user: User;
    publicSupabaseUrl: any; // Replace 'any' with the appropriate type
    publicSupabaseAnonKey: any; // Replace 'any' with the appropriate type
}

export default function AuthenticatedUserRegistrationClientComponent({ userTitle, userDesignation, user, publicSupabaseUrl, publicSupabaseAnonKey }: { userTitle: any, userDesignation: any, user: any, publicSupabaseUrl: any, publicSupabaseAnonKey: any }) {

    // Create auth-aware Supabase client
    const supabase = createClientComponentClient()

    const [userId, setUserId] = useState(user?.id);
    const [media, setMedia] = useState([]);

    const [picture, setPicture] = useState(false);
    const [document, setDocument] = useState(false);

    const [enabled, setEnabled] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    let [errorToDisplay, setErrorToDisplay] = useState<any>()
    let [successMessage, setSuccessMessage] = useState<string | null>(null)

    async function onSubmit(event: any) {
        event.preventDefault()
        setIsSubmitting(true)
        setErrorToDisplay(null)
        setSuccessMessage(null)

        try {
            const formData = new FormData(event.currentTarget)

            const title = String(formData.get('title'))
            const firstname = String(formData.get('firstname'))
            const surname = String(formData.get('surname'))
            const postname = String(formData.get('postname'))
            const category = String(formData.get('category'))
            const diocese = String(formData.get('diocese'))
            
            // Use the actual user email from the authenticated user
            const email = user?.email || ''

            if (!email) {
                setErrorToDisplay('User email not found. Please log in again.')
                setIsSubmitting(false)
                return
            }

            // Don't send the ID - let the database auto-generate it
            const formDataToSend = {
                title,
                firstname,
                surname,
                postname,
                email,
                category,
                diocese,
            }

            console.log('Attempting to register user:', { email, firstname, surname })

            const { data, error } = await supabase
                .from('users')
                .insert(formDataToSend)
                .select()

            if (error) {
                console.error('Registration error:', error)
                console.error('Error code:', error.code)
                console.error('Error details:', error.details)
                console.error('Error hint:', error.hint)
                
                if (error.code === "23505") {
                    setErrorToDisplay('You have already registered. This email is already in use.')
                } else if (error.code === "42P01") {
                    setErrorToDisplay('Database table "users" does not exist. Please contact support.')
                } else if (error.code === "42501") {
                    setErrorToDisplay('Permission denied. Row-level security policy error. Please check your database policies.')
                } else if (error.message.includes('row-level security')) {
                    setErrorToDisplay(`Security Policy Error: ${error.message}. Please contact support or check the database setup.`)
                } else {
                    setErrorToDisplay(`Error (${error.code}): ${error.message || 'An error occurred during registration. Please try again.'}`)
                }
            } else {
                setSuccessMessage('Registration successful! Redirecting...')
                
                // Reload after a short delay to show success message
                setTimeout(() => {
                    location.reload()
                }, 1500)
            }
        } catch (err) {
            console.error('Unexpected error:', err)
            setErrorToDisplay('An unexpected error occurred. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    // Upload picture
    async function uploadPicture(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;
        
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop()
        const fileName = `${userId}/picture.${fileExt}`

        // Remove old file first if exists
        await supabase.storage
            .from('iprotocol')
            .remove([`${userId}/picture`])

        const { data, error } = await supabase
            .storage
            .from('iprotocol')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: true
            })

        if (data) {
            setPicture(true)
            console.log('Picture uploaded successfully')
        } else {
            console.error('Picture upload error:', error)
            setPicture(false)
        }
    }

    async function getMediaPicture() {

        const { data, error } = await supabase.storage.from('iprotocol').list("picture" + '/', {
            limit: 10,
            offset: 0,
            sortBy: {
                column: 'name', order:
                    'asc'
            }
        });

        if (data) {
            // Media fetched successfully
        } else {
            // Handle error silently or log to error tracking service
        }
    }

    // Upload documents
    async function uploadDocument(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;
        
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop()
        const fileName = `${userId}/document.${fileExt}`

        // Remove old file first if exists
        await supabase.storage
            .from('iprotocol')
            .remove([`${userId}/document`])

        const { data, error } = await supabase
            .storage
            .from('iprotocol')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: true
            })

        if (data) {
            setDocument(true)
            console.log('Document uploaded successfully')
        } else {
            console.error('Document upload error:', error)
            setDocument(false)
        }
    }

    async function getDocumentMedia() {

        const { data, error } = await supabase.storage.from('iprotocol').list("document" + '/', {
            limit: 10,
            offset: 0,
            sortBy: {
                column: 'name', order:
                    'asc'
            }
        });

        if (data) {
            // Media fetched successfully
        } else {
            // Handle error silently or log to error tracking service
        }
    }


    return (
        <form
            className="flex-1 flex flex-col w-full max-w-2xl mx-auto px-4 py-8"
            onSubmit={onSubmit}
        >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Registration Form</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">Please complete your profile information</p>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                        <select name="title" className="w-full rounded-md px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all">
                            {userTitle.map(function (n: any, idx: number) {
                                return (<option key={idx} value={n.value}>{n.value}</option>);
                            })}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name *</label>
                        <input
                            className="w-full rounded-md px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            type="text"
                            name="firstname"
                            placeholder="Enter your first name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Surname *</label>
                        <input
                            className="w-full rounded-md px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            name="surname"
                            placeholder="Enter your surname"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Post Name *</label>
                        <input
                            className="w-full rounded-md px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            type="text"
                            name="postname"
                            placeholder="Enter your post name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                        <input
                            className="w-full rounded-md px-4 py-3 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 cursor-not-allowed"
                            type="text"
                            name="email"
                            placeholder={user.email}
                            value={user.email}
                            required
                            disabled
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category *</label>
                        <input
                            className="w-full rounded-md px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            type="text"
                            name="category"
                            placeholder="Enter your category"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Diocese *</label>
                        <select name="diocese" className="w-full rounded-md px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all">
                            {userDesignation.map(function (n: any, idx: number) {
                                return (<option key={idx} value={n.value}>{n.value}</option>);
                            })}
                        </select>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 bg-gray-50 dark:bg-gray-700/50">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile Picture *</label>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Click to <span className="font-medium text-indigo-600 dark:text-indigo-400">upload a picture</span> or drag and drop your file here</p>
                        <input
                            className="w-full text-sm text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/30 dark:file:text-indigo-400"
                            type="file"
                            name="uploadpicture"
                            accept="image/*"
                            onChange={(e) => uploadPicture(e)}
                            required
                        />

                        {media.length > 0 && (
                            <div className="mt-4">
                                {media.map((media, idx) => (
                                    <img key={idx} src={`https://mnjnkqyurgbrgflwcugc.supabase.co/storage/v1/object/public/iprotocol/${user.id}/picture`} alt="Profile" className="w-32 h-32 object-cover rounded-lg" />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 bg-gray-50 dark:bg-gray-700/50">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Documents *</label>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Click to <span className="font-medium text-indigo-600 dark:text-indigo-400">upload documents</span> or drag and drop your file here</p>
                        <input
                            className="w-full text-sm text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/30 dark:file:text-indigo-400"
                            type="file"
                            name="uploaddocument"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => uploadDocument(e)}
                            required
                        />

                        {media.length > 0 && (
                            <div className="mt-4">
                                {media.map((media, idx) => (
                                    <img key={idx} src={`https://mnjnkqyurgbrgflwcugc.supabase.co/storage/v1/object/public/iprotocol/${user.id}/document`} alt="Document" className="w-32 h-32 object-cover rounded-lg" />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button 
                            type="button"
                            onClick={(e) => {
                                const form = e.currentTarget.closest('form')
                                form?.reset()
                                setPicture(false)
                                setDocument(false)
                                setErrorToDisplay(null)
                                setSuccessMessage(null)
                            }}
                            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md px-4 py-3 transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            Clear
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md px-4 py-3 transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </div>
            </div>

            {successMessage && <div className="mt-6 px-4 py-4 rounded-md border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-400">
                <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 dark:text-green-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1">
                        <span className="text-green-600 dark:text-green-400 font-semibold block mb-1">
                            Success
                        </span>
                        <p className="text-green-600 dark:text-green-300 text-sm">
                            {successMessage}
                        </p>
                    </div>
                </div>
            </div>}

            {errorToDisplay && <div className="mt-6 px-4 py-4 rounded-md border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-400">
                <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 dark:text-red-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1">
                        <span className="text-red-600 dark:text-red-400 font-semibold block mb-1">
                            Error
                        </span>
                        <p className="text-red-600 dark:text-red-300 text-sm">
                            {errorToDisplay}
                        </p>
                    </div>
                    <button 
                        type="button"
                        onClick={() => setErrorToDisplay(null)}
                        className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>}

        </form>
    )
}