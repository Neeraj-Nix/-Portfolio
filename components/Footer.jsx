"use client";
import { usePathname } from "next/navigation";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <footer className="bg-[#ffffff] dark:bg-[#ffffff] border-t border-[#0066ff] dark:border-[#0066ff] py-12">
      {" "}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {" "}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {" "}
          <div className="text-center md:text-left">
            {" "}
            <h3 className="text-xl font-bold tracking-tighter text-[#0066ff] dark:text-[#0066ff]">
              {" "}
              Sandeep
              <span className="text-blue-600 dark:text-blue-500">.</span>{" "}
            </h3>{" "}
            <p className="mt-2 text-sm text-[#0066ff] dark:text-[#0066ff]">
              {" "}
              Transforming ideas into digital experiences.{" "}
            </p>{" "}
          </div>{" "}
          <div className="flex space-x-6 text-[#0066ff] dark:text-[#0066ff]">
            {" "}
            <a
              href="https://www.instagram.com/kumarsandeeppp?igsh=bm1tMnh4ZXY5cmw0"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-500 transition-colors"
              aria-label="Instagram"
            >
              {" "}
              <FaInstagram size={20} />{" "}
            </a>{" "}
            <a
              href="https://www.linkedin.com/in/sandeep-sharma-07859b249?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
              aria-label="LinkedIn"
            >
              {" "}
              <FaLinkedin size={20} />{" "}
            </a>{" "}
          </div>{" "}
        </div>{" "}
        <div className="mt-8 text-center text-sm text-[#0066ff] dark:text-[#0066ff]">
          {" "}
          &copy; {new Date().getFullYear()} Sandeep Portfolio. All rights
          reserved.{" "}
        </div>{" "}
      </div>{" "}
    </footer>
  );
}
