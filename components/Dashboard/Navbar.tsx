'use client'
import { useSidebar } from "@/context/Sidebar";
import { displaySuccess } from "@/lib/toast";
import { Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { toggleSidebar } = useSidebar();
  const router = useRouter();
  const session = useSession();


  const handleLogout = async () => {
    await signOut({ redirect: false });
    displaySuccess("Logged out successfully!")
    router.push("/login")
  }

  return (
    <div className="h-16 border-b px-5 flex items-center justify-between bg-white">

      {/* Left Side */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="cursor-pointer md:hidden hover:text-blue-600 duration-200"
        >
          <Menu size={30} />
        </button>
      </div>


      {/* Right Side */}
      <div className="flex items-center gap-4">

        {/* User Menu */}
        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-700">
            M
          </div>

          <div>
            <p className="text-sm font-medium text-slate-800 capitalize">
              {session.data?.user?.name}
            </p>
            <p className="text-xs capitalize text-slate-500">
              {session.data?.user?.role}
            </p>
          </div>


          <button
            onClick={handleLogout}
            className="cursor-pointer text-sm text-slate-600 hover:text-red-500 duration-200"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  )
};
