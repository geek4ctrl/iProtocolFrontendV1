interface FooterNavItem {
    name: string;
    href: string;
    // Add more properties as needed
}

interface FooterComponentProps {
    footerNavs: FooterNavItem[];
}

export default function FooterComponent({ footerNavs }: { footerNavs: any }) {
    return (
        <footer className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 px-4 py-5 max-w-full mx-auto md:px-8 mt-4 border-t border-gray-200 dark:border-gray-700" style={{ width: "100vw", marginTop: "2rem" }}>
            <div className="sm:mx-auto sm:text-center">
                <img src="https://res.cloudinary.com/dhqvb8wbn/image/upload/v1653855971/iProtocol_icone_i1wzgx.png" className="w-32 sm:mx-auto dark:invert" alt="iProtocol Logo" />
                <p className="leading-relaxed mt-2 text-base text-gray-800 dark:text-gray-200">
                    iProtocol empowers communities and organizations to manage events, registrations, and reservations with ease. Join us in building a more connected and organized future.
                </p>
            </div>
            <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
                {
                    footerNavs.map((item: any, idx: any) => (
                        <li className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium" key={idx}>
                            <a href={item.href}>
                                {item.name}
                            </a>
                        </li>
                    ))
                }
            </ul>
            <div className="mt-8 items-center justify-between sm:flex text-gray-800 dark:text-gray-200" >
                <div className="mt-4 sm:mt-0 font-medium">
                    &copy; 2023 iProtocol All rights reserved.
                </div>
                <div className="mt-6 sm:mt-0">
                    <ul className="flex items-center space-x-4">
                    </ul>
                </div>
            </div>
        </footer>
    )
}