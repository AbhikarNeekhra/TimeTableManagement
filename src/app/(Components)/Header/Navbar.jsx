'use client'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from 'react';


const menuItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Contact',
    href: '#',
  },
  {
    name: 'Login',
    href: '/auth/login',
  },
  {
    name: 'Signup',
    href: '/auth/signup',
  },
  {
    name: 'Dashboard',
    href: '/auth/dashboard',
  },
]

const Navbar = () => {
  const router = useRouter()
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="relative w-full bg-white border-b border-gray-400">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <div >
            <Image width={75} height={75} src="/assets/images/mits-logo.png" alt="MITS Logo" />
          </div>
          <span className="font-bold">Madhav Institute of Technology &amp; Science, Gwalior (M.P.), INDIA</span>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div>
            <ion-icon onclick="onToggleMenu(this)" name="menu" className="text-3xl cursor-pointer md:hidden"></ion-icon>
          </div>
        </div>
        <div className="hidden lg:block">
          {/* <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Button text
          </button> */}
          {session?.user ? (
            <div>
              {/* <Image width={75} height={75} src={session.user.image} className="h-8 w-8 rounded-full" alt='' /> */}
              <p>Role:{session?.user?.role}</p>
              <p>Email:{session.user.email}</p>
              {/* <p>{session.user.name}</p> */}
              <button className=" bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec] col-start-3 " onClick={() => signOut()}>Sign out</button>
            </div>
          ) : (
            <a href="/auth/login" className="  bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec] col-start-3 ">Sign In</a>

          )}
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <div className="logo img-fluid w-8 h-8">
                      <Image width={75} height={75} src="/assets/images/mits-logo.png" alt="MITS Logo" />
                    </div>
                    <span className="font-bold">Madhav Institute of Technology &amp; Science, Gwalior (M.P.), INDIA</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
                {session?.user ? (
                  <div>
                    <button className="mt-4 w-full rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" onClick={() => signOut()}>Sign out</button>
                  </div>
                ) : (
                  <div>
                    <button className="mt-4 w-full rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" onClick={() => router.push("/auth/login")}>Sign In</button>
                  </div>
                )}
                {/* <button
                  type="button"
                  className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Button text
                </button> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


export default Navbar;