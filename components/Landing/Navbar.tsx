'use client'
import { Bot } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [hash, setHash] = useState('');

  const links = [
    { label: 'features', path: '#features' },
  { label: 'how it works', path: '#how-it-works' },
  { label: 'about', path: "#about" }
];

  const dropdownMobileStyle = showDropdown ? 'scale-y-100' : 'scale-y-0';


  const toggleDropdown = function () {
    setShowDropdown((prev) => !prev)
  }

  useEffect(() => {
    const sections = document.querySelectorAll("[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;

            setHash(`#${id}`);
            window.history.replaceState(null, "", `#${id}`);
          }
        });
      },
      { threshold: 0.8 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container fixed top-0 left-1/2 z-1000 -translate-x-1/2">
      <nav className="flex items-center justify-between border border-white/10 bg-slate-900 px-5 text-white shadow-lg backdrop-blur-md">

        {/* Logo */}
        <Link
          href="/"
          className="py-4 flex items-center gap-2 text-2xl font-bold"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Bot size={30} />
          </span>

          <span>
            Code<span className="text-blue-400">Guide</span> AI
          </span>
        </Link>


        {/* Mobile Button */}
        <button
          onClick={toggleDropdown}
          className="block text-3xl md:hidden cursor-pointer"
        >
          ☰
        </button>


        {/* Links */}
        <ul className={`${dropdownMobileStyle} origin-top duration-200 md:duration-0 absolute md:scale-y-100 md:relative right-0 top-full w-full p-3 md:p-0 md:w-auto  bg-slate-900 md:bg-transparent flex flex-col md:flex-row gap-3 items-center`}>
          {
            links.map((link) =>
            (
              <li key={link.label}>
                <a
                  href={link.path}
                  className={`
                         capitalize
                         text-lg transition
                        hover:text-blue-400
                         ${hash.includes(link.label) ? "text-blue-400" : ""}
          `}
                >
                  {link.label}
                </a>
              </li>
            )
            )
          }

          <li>
            <Link
              href="/login"
              className="
            rounded-xl bg-blue-500 px-5 py-2
            font-semibold transition
            hover:bg-blue-600
          "
            >
              Get Started
            </Link>
          </li>
        </ul>

      </nav>
    </div>)
}
