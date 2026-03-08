import React from 'react'
import logo from '/src/images/logo.png'

export default function ReccuiterFooter() {
  return (
    <footer className="bg-[#0b0b3b] text-white py-12 px-4 ">
      <div className="max-w-7xl mx-auto">
        {/* Top section: Logo + Links */}
        <div className="md:flex md:justify-between md:items-start mb-8">
          {/* Logo */}
          <div className="mb-8 md:mb-0">
            <a href="/" className="flex items-center gap-2">
              <img src={logo} alt="SkillSync Logo" className="h-8" />
              <span className="text-2xl font-bold">SkillSync</span>
            </a>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm font-medium">
            {/* Resources */}
            <div>
              <h3 className="uppercase font-semibold mb-4 text-[#f9ba34]">Resources</h3>
              <ul className="space-y-2">
                <li><a href="https://flowbite.com/" className="hover:underline text-white">Flowbite</a></li>
                <li><a href="https://tailwindcss.com/" className="hover:underline text-white">Tailwind CSS</a></li>
              </ul>
            </div>
            {/* Follow Us */}
            <div>
              <h3 className="uppercase font-semibold mb-4 text-[#f9ba34]">Follow us</h3>
              <ul className="space-y-2">
                <li><a href="https://github.com/themesberg/flowbite" className="hover:underline text-white">Github</a></li>
                <li><a href="https://discord.gg/4eeurUVvTy" className="hover:underline text-white">Discord</a></li>
              </ul>
            </div>
            {/* Legal */}
            <div>
              <h3 className="uppercase font-semibold mb-4 text-[#f9ba34]">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline text-white">Terms &amp; Conditions</a></li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 mb-8" />

        {/* Bottom section: copyright + social */}
        <div className="sm:flex sm:justify-between sm:items-center">
          <span className="text-sm text-gray-400 sm:text-center">
            © 2026 <a href="/" className="hover:underline text-[#f9ba34]">SkillSync™</a>. All Rights Reserved.
          </span>

          <div className="flex mt-4 sm:mt-0 sm:justify-center space-x-5">
            {/* Example social icons */}
            <a href="#" className="text-gray-400 hover:text-[#f9ba34]">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591a.6.6 0 0 1 .592-.591h.543Z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-[#f9ba34]">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.942 5.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.586 11.586 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3 17.392 17.392 0 0 0-2.868 11.662 15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.638 10.638 0 0 1-1.706-.83c.143-.106.283-.217.418-.331a11.664 11.664 0 0 0 10.118 0c.137.114.277.225.418.331-.544.328-1.116.606-1.71.832a12.58 12.58 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM8.678 14.813a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.929 1.929 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
              </svg>
              <span className="sr-only">Discord</span>
            </a>
            {/* Add more social icons similarly */}
          </div>
        </div>
      </div>
    </footer>
  )
}
