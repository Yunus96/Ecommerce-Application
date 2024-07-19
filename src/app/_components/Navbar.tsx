import React from "react";
import Link from "next/link";
import { Button, buttonVariants  } from "./button"
import { Search, ShoppingCart } from 'lucide-react'
import OfferNotification from "./OfferNotification";




function Navbar() {
    return (
        <>
            <div className='py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0 mb-0'>
            <div className='container flex items-start py-0 px-0 my-0 mx-0 justify-end text-justify'>
                <Link href='#' className='text-xs align-text-top px-3'>
                    Help
                </Link>
                <Link href='#' className='text-xs align-text-top px-3'>
                    Orders & Return
                </Link>
                <Link href='#' className='text-xs align-text-top px-3'>
                    Hi, Yunus
                </Link>
            </div>
            <div className='container flex items-start justify-between'>
            <Link href='/' className="text-2xl">
            {/* <HandMetal />*/}<b>Ecommerce</b>
            </Link>
            <div className="flex mx-9 my-2 justify-between">
                <Link className='flex mx-6 pt-1'  href='/sign-in'>
                <Search />
                </Link>
                <Link className='flex pt-1'  href='/sign-in'>
                <ShoppingCart />
                </Link>
            </div>
            
            </div>
            </div>
            <OfferNotification />
        </>
        );
}

export default Navbar;