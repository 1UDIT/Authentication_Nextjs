import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'


export function middleware(request) {
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/'

    const token = request.cookies.get('next-auth.session-token')?.value || ''

    // console.log(  "request.cookies",request.cookies);

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/HomePage', request.nextUrl))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

}


// See "Matching Paths" below to learn more
export const config = {
    matcher: [ 
        '/HomePage',
    ]
} 