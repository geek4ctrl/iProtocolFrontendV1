import AurhenticatedUserReservationsSubNav from "@/components/AurhenticatedUserReservationsSubNav";
import BackButton from "@/components/BackButton";
import NavigationBar from "@/components/NavigationBar";
import FooterComponent from "@/components/FooterComponent";
import { useStore } from "@/src/store";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthenticatedUserReservationsComponent from "@/components/AuthenticatedUserReservationsComponent";
import type { FooterNavItem } from '@/types';

let userInformation = {};

const navigation = [
    { title: "Francais", path: "javascript:void(0)" },
    { title: "English", path: "javascript:void(0)" },
    { title: "Italien", path: "javascript:void(0)" },
];

const footerNavs: FooterNavItem[] = [
    { href: '/about', name: 'About' },
    { href: '/events', name: 'Events' },
    { href: '/contact', name: 'Contact' },
    { href: '/support', name: 'Support' }
];

const publicSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publicSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default async function Index() {
    const supabase = createServerComponentClient({ cookies });

    // const { data: countries } = await supabase.from("countries").select();

    let reservations: any;
    let allReservations: any;

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (user) {

        // Fetching user information
        userInformation = await supabase
            .from('users')
            .select('*')
            .eq('email', user?.email)    // Correct

        reservations = await supabase
            .from("event_reservations")
            .select('*')
            .eq('userid', user?.email);

        allReservations = reservations.data;

        useStore.setState({ reservation: allReservations });

    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col" style={{ width: '-webkit-fill-available' }}>
                <NavigationBar navigation={navigation} user={user} />
                <AurhenticatedUserReservationsSubNav />
                
                <div className="flex-1" style={{ width: '-webkit-fill-available' }}>
                    <AuthenticatedUserReservationsComponent 
                        allReservations={allReservations} 
                        user={user} 
                        publicSupabaseUrl={publicSupabaseUrl} 
                        publicSupabaseAnonKey={publicSupabaseAnonKey} 
                    />
                </div>
            </div>
            
            <FooterComponent footerNavs={footerNavs} />
        </>
    );
}
