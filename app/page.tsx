import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { NavigationItem, FooterNavItem, Title, Designation, Plan, Place, Event, Reservation, User } from '@/types'
import StoreInitializer from '@/components/StoreInitializer';
import FooterComponent from '@/components/FooterComponent';
import UnauthenticatedUser from '@/components/UnauthenticatedUser';
import NavigationBar from '@/components/NavigationBar';
import AuthenticatedUserDashboard from '@/components/AuthenticatedUserDashboard';
import AuthenticatedUserRegistrationClientComponent from '@/components/AuthenticatedUserRegistrationClientComponent';

export const dynamic = 'force-dynamic'

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

const plans: Plan[] = [
  {
    name: "Invitation",
    price: 12,
    image: "https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    features: [
      "Appeal",
      "Bid",
      "Challenge",
      "Date",
      "Petition",
      "Proposition",
      "Encouragement",
    ],
  },
  {
    name: "Accreditation",
    price: 35,
    image: "https://images.unsplash.com/photo-1592347093417-0e95eb5851aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    features: [
      "Authorization",
      "Card",
      "Certificate",
      "Deed",
      "Endorsement",
      "License",
      "Docket",
    ],
  },
];


// User title options for ecclesiastical hierarchy

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

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  // Fetch authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch all places with error handling - try view first, then table
  let { data: allPlaces, error: placesError } = await supabase
    .from('getplaces')
    .select();
  
  // If view fails, try querying the places table directly
  if (placesError || !allPlaces || allPlaces.length === 0) {
    const directQuery = await supabase
      .from('places')
      .select();
    
    allPlaces = directQuery.data;
    placesError = directQuery.error;
  }
  
  const places = (allPlaces as Place[]) ?? [];

  // Fetch Goma places
  const { data: allGomaPlaces, error: gomaError } = await supabase
    .from('place_in_goma_view')
    .select();
  
  const gomaPlaces = (allGomaPlaces as Place[]) ?? [];

  // Fetch Kinshasa places
  const { data: allKinshasaPlaces, error: kinshasaError } = await supabase
    .from('place_in_kinshasa_view')
    .select();
  
  const kinshasaPlaces = (allKinshasaPlaces as Place[]) ?? [];

  // Fetch all events - try view first, then table
  let { data: allEvents, error: eventsError } = await supabase
    .from('getevents')
    .select();
  
  // If view fails, try querying the events table directly
  if (eventsError || !allEvents || allEvents.length === 0) {
    const directQuery = await supabase
      .from('events')
      .select();
    
    allEvents = directQuery.data;
    eventsError = directQuery.error;
  }
  
  const events = (allEvents as Event[]) ?? [];

  // Fetch user profile if authenticated
  let userProfile: User[] | null = null;
  let reservations: Reservation[] = [];

  if (user?.email) {
    const { data: userData } = await supabase
      .from('users')
      .select("*")
      .eq('email', user.email);
    
    userProfile = userData as User[];

    // Fetch user reservations
    const { data: reservationData } = await supabase
      .from("event_reservations")
      .select("*")
      .eq('userid', user.email);
    
    reservations = (reservationData as Reservation[]) ?? [];
  }

  return (
    <>
      <StoreInitializer 
        name={"Laurent"} 
        place={places} 
        event={events} 
        reservation={reservations} 
      />

      <div className="w-full flex flex-col items-center" style={{ width: '-webkit-fill-available' }}>
        <NavigationBar navigation={navigation} user={user} />

        {user ? (
          <div className="w-full" style={{ width: '-webkit-fill-available' }}>
            {userProfile && userProfile.length > 0 ? (
              <AuthenticatedUserDashboard plans={plans} />
            ) : (
              <AuthenticatedUserRegistrationClientComponent 
                userTitle={userTitle} 
                userDesignation={userDesignation} 
                user={user} 
                publicSupabaseUrl={publicSupabaseUrl} 
                publicSupabaseAnonKey={publicSupabaseAnonKey} 
              />
            )}
          </div>
        ) : (
          <UnauthenticatedUser 
            allEventsToDisplay={events} 
            allGomaPlaces={gomaPlaces} 
            allKinshasaPlaces={kinshasaPlaces} 
          />
        )}
      </div>

      <FooterComponent footerNavs={footerNavs} />
    </>
  )
}

