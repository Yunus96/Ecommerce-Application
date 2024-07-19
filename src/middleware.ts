import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware (request : NextRequest){
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/sign-in' || path === '/sign-up'
    const token = request.cookies.get('token')?.value || ''

    if (isPublicPath && token) {
        return NextResponse.redirect('/categories')
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect('/sign-in')
    }
}

export const config = {
    matcher: [
        '/',
        '/categories',
        '/sign-in',
        '/sign-up'
    ]
}