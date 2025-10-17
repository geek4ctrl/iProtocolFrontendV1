// Database Entity Types
export interface Place {
  id: string;
  name: string;
  city: string;
  address?: string;
  capacity?: number;
  created_at?: string;
}

export interface Event {
  id: string;
  title: string;
  author: string;
  date: string;
  time: string;
  eventpicture: string;
  description?: string;
  place_id?: string;
  created_at?: string;
}

export interface Reservation {
  id: string;
  event_id: string;
  userid: string;
  reservation_type: string;
  status?: string;
  created_at?: string;
}

export interface User {
  id: string;
  email: string;
  title?: string;
  firstname?: string;
  surname?: string;
  postname?: string;
  category?: string;
  diocese?: string;
  uploadpicture?: string;
  uploaddocument?: string;
  created_at?: string;
}

// UI Component Types
export interface NavigationItem {
  title: string;
  path: string;
}

export interface FooterNavItem {
  href: string;
  name: string;
}

export interface Title {
  value: string;
  viewValue: string;
}

export interface Designation {
  value: string;
  viewValue: string;
}

export interface Plan {
  name: string;
  price: number;
  image: string;
  features: string[];
}

// Supabase Auth User Type (from @supabase/supabase-js)
export interface SupabaseUser {
  id: string;
  email?: string;
  created_at?: string;
  app_metadata?: Record<string, any>;
  user_metadata?: Record<string, any>;
}
