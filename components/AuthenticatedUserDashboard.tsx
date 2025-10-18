import type { Plan } from "@/types";
import AuthenticatedUserDashboardContent from "./AuthenticatedUserDashboardContent";
import AuthenticatedUserDashboardSubNav from "./AuthenticatedUserDashboardSubNav";
import AuthenticatedUserDashboardTitle from "./AuthenticatedUserDashboardTitle";

interface AuthenticatedUserDashboardProps {
    plans: Plan[];
}

const subNavigation = [
    {
        href: "javascript:void(0)",
        name: "Dashboard"
    },
    {
        href: "javascript:void(0)",
        name: "Events"
    },
    {
        href: "javascript:void(0)",
        name: "Reservations"
    }
]

const subNavIdx = 0;

export default function AuthenticatedUserDashboard({ plans }: AuthenticatedUserDashboardProps) {

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <AuthenticatedUserDashboardSubNav />

            <section className='py-16'>
                <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                    <AuthenticatedUserDashboardTitle />
                    <AuthenticatedUserDashboardContent plans={plans} />
                </div>
            </section>
        </div>
    )
}