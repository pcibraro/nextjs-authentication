import { AuthorizationCode } from 'simple-oauth2';
import { redirect } from "next/navigation";
import IAuthenticationProvider, { User } from "@/services/authentication/authentication-provider";

// Configuration for the GitHub OAuth2 client
const client = new AuthorizationCode({
    client: {
        id: process.env.GITHUB_CLIENT_ID as string,
        secret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    auth: {
        tokenHost: 'https://github.com',
        tokenPath: '/login/oauth/access_token',
        authorizePath: '/login/oauth/authorize',
    },
});

export default class GithubProvider implements IAuthenticationProvider
{
    async authorize() : Promise<typeof redirect> {
        const authorizationUri = client.authorizeURL({
            redirect_uri: 'http://localhost:3000/api/github/callback',
            scope: 'user'// requesting access to user data
        });

        return redirect(authorizationUri);
    }

    async authenticate(request: Request): Promise<User> {
        const { searchParams } = new URL(request.url)

        const code = searchParams.get('code')

        if(!code) {
            throw new Error("authentication code was not provided");
        }

        try {
            const accessTokenResult = await client.getToken({
                code: code as string,
                redirect_uri: 'http://localhost:3000/api/github/callback',
            });

            // You can now use the access token to make authenticated requests.
            const accessToken = accessTokenResult.token.access_token;
            const userResponse = await fetch('https://api.github.com/user', {
                headers: {
                    Authorization: `token ${accessToken}`,
                },
            });

            const user = await userResponse.json();

            return {
                id: user.id,
                login: user.login
            }
        } catch (error) {
            if(error instanceof Error) { console.error('Access Token Error', error.message); }
            else { console.error('Access Token Error', error); }

            throw new Error('Authentication failed');
        }
    }
}
