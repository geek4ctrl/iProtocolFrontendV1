import AurhenticatedUserReservationsSubNav from "@/components/AurhenticatedUserReservationsSubNav";
import BackButton from "@/components/BackButton";
import NavigationBar from "@/components/NavigationBar";
import { useStore } from "@/src/store";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthenticatedUserReservationsComponent from "@/components/AuthenticatedUserReservationsComponent";

let userInformation = {};

const navigation = [
    { title: "Francais", path: "javascript:void(0)" },
    { title: "English", path: "javascript:void(0)" },
    { title: "Italien", path: "javascript:void(0)" },
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
            <div className="w-full flex flex-col items-center">

                <NavigationBar navigation={navigation} user={user} />
                <BackButton />
                <AurhenticatedUserReservationsSubNav />
            </div>

            <AuthenticatedUserReservationsComponent allReservations={allReservations} user={user} publicSupabaseUrl={publicSupabaseUrl} publicSupabaseAnonKey={publicSupabaseAnonKey} />

        </>
    );
}
