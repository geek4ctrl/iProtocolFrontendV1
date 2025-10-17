import AuthenticatedUserRegistrationClientComponent from '@/components/AuthenticatedUserRegistrationClientComponent';
import LogoutButton from '@/components/LogoutButton';
import NavigationBar from '@/components/NavigationBar';
import FooterComponent from '@/components/FooterComponent';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import type { NavigationItem, FooterNavItem } from '@/types';

const publicSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publicSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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

const menuItems = ["Products", "Documentation", "Features", "Partners", "Industry", "Feedback", "Tech stack"];

interface Title {
    value: string;
    viewValue: string;
}

interface Designation {
    value: string;
    viewValue: string;
}

const userTitle: Title[] = [
    { value: 'cardinal', viewValue: 'Cardinal' },
    { value: 'monseigneur', viewValue: 'Monseigneur' },
    { value: 'excellence', viewValue: 'Excellence' },
    { value: 'honorable', viewValue: 'Honorable' },
    { value: 'abbe', viewValue: 'Abbé' },
    { value: 'pere', viewValue: 'Père' },
    { value: 'soeur', viewValue: 'Sœur' },
    { value: 'frere', viewValue: 'Frère' },
    { value: 'mr', viewValue: 'Mr.' },
    { value: 'mme', viewValue: 'Mme.' },
    { value: 'mlle', viewValue: 'Mlle.' },
];

const userDesignation: Designation[] = [
    { value: 'corpsMedical', viewValue: 'Corps Médical' },
    { value: 'agentPresse', viewValue: 'Agent de Presse' },
    { value: 'securite', viewValue: 'Sécurité' },
    { value: 'officielGouvernementC1', viewValue: 'Officiel Gouvernement C1' },
    { value: 'officielGouvernementC2', viewValue: 'Officiel Gouvernement C2' },
    { value: 'officielGouvernementC3', viewValue: 'Officiel Gouvernement C3' },
    { value: 'officielEcclesialC1', viewValue: 'Officiel Ecclésial C1' },
    { value: 'officielEcclesialC2', viewValue: 'Officiel Ecclésial C2' },
    { value: 'liturgieConcelebrant', viewValue: 'Liturgie Concélébrant' },
    { value: 'liturgieC1', viewValue: 'Liturgie C1' },
    { value: 'liturgieC2', viewValue: 'Liturgie C2' },
    { value: 'personnesAssistees', viewValue: 'Personnes Assistées' },
    { value: 'religieux', viewValue: 'Religieux' },
    { value: 'staff', viewValue: 'Staff' },
    { value: 'protocol', viewValue: 'Protocol' },
];

export default async function Registration() {

    const supabase = createServerComponentClient({ cookies });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <NavigationBar navigation={navigation} user={user} />

            <div className="flex-1 flex flex-col w-full py-8">
                <div className="max-w-7xl mx-auto px-4 w-full">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 py-2 px-4 rounded-md no-underline text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-colors group text-sm mb-6"
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

                    <AuthenticatedUserRegistrationClientComponent 
                        userTitle={userTitle} 
                        userDesignation={userDesignation} 
                        user={user} 
                        publicSupabaseUrl={publicSupabaseUrl} 
                        publicSupabaseAnonKey={publicSupabaseAnonKey} 
                    />
                </div>
            </div>

            <FooterComponent footerNavs={footerNavs} />
        </div>
    );
}
