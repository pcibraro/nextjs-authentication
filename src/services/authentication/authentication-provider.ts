import { redirect } from "next/navigation";

export type User = {
    id: string;
    login: string;
}

export default interface IAuthenticationProvider
{
    authorize(): Promise<typeof redirect>;
    authenticate(request: Request): Promise<User>;
}