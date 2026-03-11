"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { FaSignOutAlt, FaFolderPlus, FaInbox, FaHome } from "react-icons/fa";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  if (!isClient) return null;

  if (pathname === "/admin/login") {
    return (
      <div className="min-h-screen bg-[#ffffff] dark:bg-[#ffffff] flex flex-col">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffffff] dark:bg-[#ffffff] flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-[#ffffff] text-[#0066ff] flex flex-col hidden md:flex">
        <div className="p-6 border-b border-[#0066ff]">
          <Link
            href="/admin"
            className="text-xl font-bold tracking-tighter text-[#0066ff]"
          >
            Sandeep<span className="text-blue-500">Admin</span>
          </Link>
        </div>
        <nav className="flex-grow p-4 space-y-2 text-[#0066ff]">
          <Link
            href="/admin"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-[#ffffff] hover:text-[#0066ff] transition-colors ${pathname === "/admin" ? "bg-[#ffffff] text-[#0066ff]" : ""}`}
          >
            <FaInbox /> Messages
          </Link>
          <Link
            href="/admin/projects"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-[#ffffff] hover:text-[#0066ff] transition-colors ${pathname === "/admin/projects" ? "bg-[#ffffff] text-[#0066ff]" : ""}`}
          >
            <FaFolderPlus /> Manage Projects
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#ffffff] hover:text-[#0066ff] transition-colors"
          >
            <FaHome /> Go to Website
          </Link>
        </nav>
        <div className="p-4 border-t border-[#0066ff]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 w-full rounded-lg text-red-400 hover:bg-[#ffffff] hover:text-red-300 transition-colors"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden bg-[#ffffff] border-b border-[#0066ff] p-4 flex justify-between items-center text-[#0066ff]">
          <Link href="/admin" className="font-bold tracking-tighter">
            SandeepAdmin
          </Link>
          <button onClick={handleLogout} className="text-[#0066ff] p-1">
            <FaSignOutAlt size={20} />
          </button>
        </div>
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
