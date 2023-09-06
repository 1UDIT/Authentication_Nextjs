import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    session: {
        maxAge: 30 * 24 * 60 * 60
    },

    // providers: [
    //     CredentialsProvider({
    //         id: 'credentials',
    //         name: 'Credentials',

    //         credentials: {
    //             username: { label: "Username", type: "text", placeholder: "jsmith" },
    //             password: { label: "Password", type: "password" },
    //         },
    //         async authorize(credentials, req) {
    //             // Add logic here to look up the user from the credentials supplied
    //             console.log("username", credentials?.username, "password", credentials?.password);

    //             const res = await fetch("http://localhost:8000/auth/login", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({
    //                     username: credentials?.username,
    //                     password: credentials?.password,
    //                 }),
    //             });
    //             const user = await res.json();

    //             if (user) {
    //                 return user;
    //             } else {
    //                 return null;
    //             }

    //         },
    //     }),
    // ],

    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',

            credentials: {
                username: { label: 'test', type: 'email' },
                password: { label: 'test', type: 'password' },
            },
            async authorize(credentials, req) {
                console.log("username",credentials.username);
                const user = { id: 1, name: 'test', password: 'test' };
                if (user.name === credentials.username && user.password === credentials.password) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user;
                }
                // If you return null or false then the credentials will be rejected
                return null;
                // You can also Reject this callback with an Error or with a URL:
                // throw new Error('error message') // Redirect to error page
                // throw '/path/to/redirect'        // Redirect to a URL
            },
        }),
    ],  

    secret: process.env.NEXTAUTH_SECRET_KEY,
    session: {
        strategy: "jwt",
      },
    pages: {
        signIn: "/",
    },
});

export { handler as GET, handler as POST }; 