import { FooterNavItem } from '@/types';

interface FooterComponentProps {
    footerNavs: FooterNavItem[];
}

export default function FooterComponent({ footerNavs }: FooterComponentProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer 
            className="w-full bg-gray-50 dark:bg-gray-900 px-4 md:px-6 lg:px-8 py-12 border-t border-gray-200 dark:border-gray-700" 
            style={{ width: '-webkit-fill-available' }}
        >
            <div className="max-w-7xl mx-auto">
                {/* Logo and Description */}
                <div className="text-center mb-10">
                    <img 
                        src="https://res.cloudinary.com/dhqvb8wbn/image/upload/v1653855971/iProtocol_icone_i1wzgx.png" 
                        className="w-32 mx-auto dark:invert" 
                        alt="iProtocol Logo" 
                    />
                    <p className="leading-relaxed mt-4 text-base text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                        iProtocol empowers communities and organizations to manage events, registrations, and reservations with ease. 
                        Join us in building a more connected and organized future.
                    </p>
                </div>

                {/* Navigation Links */}
                <ul className="flex flex-wrap items-center justify-center gap-6 mb-10">
                    {footerNavs.map((item, idx) => (
                        <li key={idx}>
                            <a 
                                href={item.href}
                                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-150"
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Copyright */}
                <div className="text-center pt-8 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        &copy; {currentYear} iProtocol. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}