import { User } from "./authentication-provider"
import {sealData, unsealData} from "iron-session/edge/index";
import {cookies} from "next/headers";
import {NextRequest} from "next/server";

const sessionPassword = process.env.SESSION_PASSWORD as string;
if(!sessionPassword) throw new Error("SESSION_PASSWORD is not set");

export async function getSession(request: NextRequest) : Promise<User | null> {
    const encryptedSession = request.cookies.get('auth_session')?.value;

    const session = encryptedSession
        ? await unsealData(encryptedSession, {
            password: sessionPassword,
        })
        : null;

    return session ? JSON.parse(session) as User : null;
}

export async function setSession(user: User) : Promise<void> {
    const encryptedSession = await sealData(JSON.stringify(user), {
        password: sessionPassword,
    });

    cookies().set('auth_session', encryptedSession);
}
