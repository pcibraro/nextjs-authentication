import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { unsealData } from 'iron-session/edge';

import { getSession } from "@/services/authentication/authentication-session";

export async function middleware(request: NextRequest) {

    const user = getSession(request);

    if(!user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/home/:path*',
}