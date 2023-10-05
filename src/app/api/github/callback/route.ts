import { sealData } from 'iron-session/edge';
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

import GithubProvider from "@/services/authentication/github-provider";
import { setSession } from "@/services/authentication/authentication-session";

const provider = new GithubProvider();

export async function GET(request: Request) {

    try {
        const user = await provider.authenticate(request);

        await setSession(user);

        return NextResponse.redirect(new URL('/home', request.url));
    } catch (error) {
        console.error('Access Token Error', (error as Error).message);

        throw new Error('Authentication failed');
    }
}