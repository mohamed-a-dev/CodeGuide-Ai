import { auth } from "@/auth";
import Navbar from "@/components/Dashboard/Navbar";
import Sidebar from "@/components/Dashboard/Sidebar";
import { SidebarProvider } from "@/context/Sidebar";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    if (!session)
        redirect('/login')


    return (
        <div className="flex">
            <SidebarProvider>
                <Sidebar />
                
                <section className="grow">
                    <Navbar />
                    <main className="p-6 lg:p-8">{children}</main>
                </section>
            </SidebarProvider>

        </div>
    )
};
