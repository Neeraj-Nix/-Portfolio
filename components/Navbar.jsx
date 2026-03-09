"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  if (pathname.startsWith("/admin")) {
    return null; /* Don't show public navbar on admin pages */
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#ffffff] dark:bg-[#ffffff] backdrop-blur-md border-b border-[#0066ff] dark:border-[#0066ff] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tighter text-[#0066ff] dark:text-[#0066ff]"
          >
            Portfolio<span className="text-blue-600 dark:text-blue-500">.</span>
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${pathname === link.href ? "text-blue-600 dark:text-blue-500" : "text-[#0066ff] dark:text-[#0066ff]"}`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-500"
                  />
                )}
              </Link>
            ))}
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-[#0066ff] dark:text-[#0066ff] focus:outline-none p-2"
              aria-label="Toggle Menu"
            >
              {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#ffffff] dark:bg-[#ffffff] border-b border-[#0066ff] dark:border-[#0066ff]"
          >
            <div className="px-4 py-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === link.href ? "bg-blue-50 dark:bg-[#ffffff] text-blue-600 dark:text-blue-500" : "text-[#0066ff] dark:text-[#0066ff] hover:bg-[#ffffff] dark:hover:bg-[#ffffff]"}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
