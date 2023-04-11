import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";
import MenuSkeleton from "./MenuSkeleton";


/* The above code is defining a React functional component called `MainMenu`. It is rendering a sidebar
menu with a list of direct messages and projects. It also displays the user's profile information
and provides options to view account, profile, and sign out. The component uses `useSession` hook
from NextAuth.js to get the user's session data and `useRouter` hook from Next.js to handle routing.
It also uses `api.contacts.getContacts.useQuery` to fetch the user's contacts and display them in
the direct messages list. */

const MainMenu: React.FC = () => {

    const router = useRouter()
    const { data: sessionData } = useSession({
        required: true,
        onUnauthenticated() {
            void router.push('/');
        },
    });

    const [viewProfile, setViewProfile] = useState(false)

    const { data: contacts } = api.contacts.getContacts.useQuery({ email: sessionData?.user.email ?? "" });

    return (
        <div className="hidden md:flex md:flex-shrink-0">
            <div className="flex flex-col w-64">
                <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
                    <div className="flex flex-col flex-shrink-0 px-4">
                        <Link className="text-lg font-semibold tracking-tighter text-black focus:outline-none focus:ring px-4" href="/">
                            <span className="inline-flex items-center gap-2">
                                <svg className="w-5 h-5 mx-auto" viewBox="0 0 232 232" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M166.524 51.4683L116.367 101.625L65.5235 51.4683L116.367 0.62434L166.524 51.4683ZM231.11 116.054L180.953 166.898L130.796 116.054L180.953 65.8969L231.11 116.054ZM101.939 116.054L51.0948 166.898L0.250934 116.054L51.0948 65.8969L101.939 116.054ZM166.524 181.326L116.367 231.483L65.5235 181.326L116.367 130.482L166.524 181.326Z" fill="#0c0c0c"></path>
                                </svg>
                                ChaTodo
                            </span>          
                        </Link>
                        <button className="hidden rounded-lg focus:outline-none focus:shadow-outline">
                            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path>
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col flex-grow px-4 mt-5">
                        <nav className="flex-1 space-y-1 bg-white">
                            <p className="px-4 pt-4 text-xs font-semibold text-gray-400 uppercase">
                                Direct messages
                            </p>
                            <ul>
                                {
                                    !contacts && <MenuSkeleton quantity={ 3 } />
                                }


                                {contacts && Object.values(contacts).map((contact) => {
                                    const isReceiver = contact.receiver.email === sessionData?.user.email
                                    const imgContact = isReceiver ? contact.sender.image : contact.receiver.image
                                    const nameContact = isReceiver ? contact.sender.name : contact.receiver.name

                                    return (
                                        <li key={contact.id}>
                                            <Link className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500" href="/dashboard">
                                                <Image width={20} height={20} className='h-5 w-5 rounded-full' src={imgContact ?? 'https://jvngarcia.com/wp-content/uploads/2021/01/community-group.png'} alt="" />
                                                <span className="ml-4">
                                                    {nameContact}
                                                </span>
                                            </Link>
                                        </li>
                                    )
                                })}

                                <li>
                                    <Link className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500" href="/dashboard?create=contact">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <line x1="12" y1="5" x2="12" y2="19" />
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                        </svg>
                                        <span className="ml-4">
                                            Add new chat
                                        </span>
                                    </Link>
                                </li>

                            </ul>
                            <p className="px-4 pt-4 text-xs font-semibold text-gray-400 uppercase">
                                Projects
                            </p>
                            <ul>
                                <li>
                                    <Link className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500" href="/dashboard">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-archive" width="20" height="20" viewBox="0 0 24 24" strokeWidth="0.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <rect x="3" y="4" width="18" height="4" rx="2" />
                                            <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
                                            <line x1="10" y1="12" x2="14" y2="12" />
                                        </svg>
                                        <span className="ml-4">
                                            Bancamiga
                                        </span>
                                        <span className="inline-flex ml-auto items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-500">
                                            25
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500" href="/dashboard">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-archive" width="20" height="20" viewBox="0 0 24 24" strokeWidth="0.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <rect x="3" y="4" width="18" height="4" rx="2" />
                                            <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
                                            <line x1="10" y1="12" x2="14" y2="12" />
                                        </svg>
                                        <span className="ml-4">
                                            Aluxion
                                        </span>
                                        <span className="inline-flex ml-auto items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-500">
                                            5
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="flex flex-shrink-0 p-4 px-4 bg-gray-50">
                        <div className="relative inline-flex items-center w-full" x-data="{ open: false }">
                            <button onClick={() => setViewProfile(!viewProfile)} className="inline-flex items-center justify-between w-full px-4 py-3 text-lg font-medium text-center text-white transition duration-500 ease-in-out transform rounded-xl hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <span>
                                    <span className="flex-shrink-0 block group">
                                        <div className="items-center grid grid-cols-4">
                                            <div>
                                                <Image className="inline-block object-cover rounded-full h-9 w-9" src={sessionData?.user.image ?? 'https://cdn.discordapp.com/avatars/1042877329057263727/8efc65d1ebef81c2e5bacfceaeef1eb1.png'} alt={sessionData?.user.name ?? ''} width={50} height={50} />
                                            </div>
                                            <div className="ml-3 text-left col-span-3">
                                                <p className="text-sm font-medium text-gray-500 group-hover:text-blue-500">
                                                    {sessionData?.user.name}
                                                </p>
                                                <p className="text-xs font-medium text-gray-500 group-hover:text-blue-500 truncate">
                                                    {sessionData?.user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </span>
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`inline w-5 h-5 ml-4 text-black transition-transform duration-500 transform ${viewProfile ? 'rotate-180' : 'rotate-0'}`} viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                            <div className={`absolute bottom-20 z-50 w-full mx-auto mt-2 origin-bottom-right bg-white rounded-xl transition-all ${viewProfile ? '' : 'hidden'}`}>
                                <div className="px-2 py-2 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <ul>
                                        <li>
                                            <Link className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500" href="/dashboard">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width="20" height="20" viewBox="0 0 24 24" strokeWidth="0.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <circle cx="12" cy="7" r="4" />
                                                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                                </svg>
                                                <span className="ml-4">
                                                    Account
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500" href="/dashboard">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-circle" width="20" height="20" viewBox="0 0 24 24" strokeWidth="0.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <circle cx="12" cy="12" r="9" />
                                                    <circle cx="12" cy="10" r="3" />
                                                    <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                                                </svg>
                                                <span className="ml-4">
                                                    Profile
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <button onClick={() => void signOut()} className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout" width="20" height="20" viewBox="0 0 24 24" strokeWidth="0.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                                                    <path d="M7 12h14l-3 -3m0 6l3 -3" />
                                                </svg>
                                                <span className="ml-4">
                                                    Sign out
                                                </span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default MainMenu;