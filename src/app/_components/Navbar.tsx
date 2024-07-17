import React from "react";
import Link from "next/link";
import { Button, buttonVariants  } from "./button"
import { Search, ShoppingCart } from 'lucide-react'




function Navbar() {
    return (
        <div className=' bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
        <div className='container flex items-start py-0 px-0 my-0 mx-0 justify-end text-justify'>
            <Link href='#' className='text-xs px-5'>
                Help
            </Link>
            <Link href='#' className='text-xs px-5'>
                Orders & Return
            </Link>
            <Link href='#' className='text-xs px-5'>
                Hi, Yunus
            </Link>
        </div>
        <div className='container flex items-start justify-between'>
          <Link href='/' className="text-2xl">
           {/* <HandMetal />*/}Ecommerce
          </Link>
          <div className="flex mx-14 my-2 justify-between">
            <Link className='flex mx-6'  href='/sign-in'>
            <Search />
            </Link>
            <Link className='flex '  href='/sign-in'>
            <ShoppingCart />
            </Link>
          </div>
          
        </div>
        </div>
        );
}

export default Navbar;