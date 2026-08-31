'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/Sidebar";

import {
    LayoutDashboard,
    MessageSquare,
    History,
    FileText,
    X,
    Laptop,
    Bot
} from "lucide-react";
import LogoutButton from "./LogoutButton";
import { useSession } from "next-auth/react";


export default function Sidebar() {
    const { showSidebar, toggleSidebar } = useSidebar();
    const pathname = usePathname();
    const getSidebarState = showSidebar ? 'translate-x-0 w-full' : '-translate-x-full md:translate-x-0';
    const session = useSession();

    const doctorLinks = [
        {
            label: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard
        },
        {
            label: "AI Assistant",
            path: "/ai-assistant",
            icon: MessageSquare
        },
        {
            label: "History",
            path: "/history",
            icon: History
        },
    ];


    const adminLinks = [
        {
            label: "Documents",
            path: "/documents-management",
            icon: FileText
        }
    ];


    const isActive = (path: string) => {
        return pathname === path;
    }


    return (
        <aside
            className={`
            ${getSidebarState}
            fixed md:sticky 
            top-0 left-0
            h-screen
            bg-slate-950
            text-white
            flex flex-col
            px-5 py-6
            transition-transform duration-300
            z-50
            md:min-w-72
            `}
        >

            {/* Mobile Close */}

            <button
                onClick={toggleSidebar}
                className="
                md:hidden
                absolute
                right-5
                top-5
                cursor-pointer
                "
            >
                <X size={25} />
            </button>



            {/* Logo */}

            <div className="flex items-center gap-3 mb-10">

                <div className="
                bg-blue-600
                rounded-xl
                p-2
                ">
                    <Bot size={28} />
                </div>


                <div>
                    <h1 className="text-xl font-bold">
                        CodeGuide AI
                    </h1>

                    <p className="text-xs text-slate-400">
                        Coding Assistant
                    </p>

                </div>

            </div>



            {/* Doctor Menu */}

            <nav className="space-y-2 flex-1">


                {
                    doctorLinks.map((link) => {

                        const Icon = link.icon;


                        return (

                            <Link
                                key={link.path}
                                href={link.path}
                                className={`
                            flex items-center gap-3
                            px-4 py-3
                            rounded-lg
                            transition
                            
                            ${isActive(link.path)
                                        ?
                                        "bg-blue-600"
                                        :
                                        "hover:bg-slate-800"
                                    }
                            `}
                            >

                                <Icon size={20} />

                                <span>
                                    {link.label}
                                </span>

                            </Link>

                        )

                    })
                }



                {/* Admin Section */}

                <div className="mt-8">


                    <p className="
                    text-xs
                    text-slate-500
                    uppercase
                    mb-3
                    ">
                        Admin
                    </p>



                    {
                        adminLinks.map((link) => {

                            const Icon = link.icon;


                            return (

                                <Link
                                    key={link.path}
                                    href={link.path}
                                    className={`
                                flex items-center gap-3
                                px-4 py-3
                                rounded-lg
                                ${isActive(link.path)
                                            ?
                                            "bg-blue-600"
                                            :
                                            "hover:bg-slate-800"
                                        }
                                `}
                                >

                                    <Icon size={20} />

                                    {link.label}

                                </Link>

                            )
                        })
                    }
                </div>


            </nav>


            {/* User */}
            <div className="
            border-t
            border-slate-800
            pt-4
            ">


                <div className="mb-4">

                    <p className="font-medium capitalize">
                        {session.data?.user?.name}
                    </p>

                    <p className="
                    text-sm
                    text-slate-400 capitalize
                    ">
                        {session.data?.user?.role}
                    </p>

                </div>

                <LogoutButton />
            </div>


        </aside>

    )
}