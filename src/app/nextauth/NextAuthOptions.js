import Credentials from "next-auth/providers/credentials";
import { query } from "@/lib/db";
import GoogleProvider from "next-auth/providers/google";
import { hash, compare } from "bcryptjs";

export const authOptions = {
  session: {
    strategy: "jwt",
    jwt: true,
    maxAge: 60 * 60,
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: null,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        const email = profile.email;
        const Checkquery = `SELECT role FROM authentication WHERE email = "${email}"`;
        let user = await query({ query: Checkquery, value: [] });
        user = user[0];
        if (user) {
          return {
            id: profile.sub,
            name: `${profile.given_name} ${profile.family_name}`,
            email: profile.email,
            image: profile.picture,
            role: user.role,
          };
        } else {
          return null;
        }
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const hashedPassword = await hash(password, 3);
        // const Checkquery = `SELECT * FROM authentication WHERE email = "${email}" AND password = "${hashedPassword}"`;
        const Checkquery = `SELECT * FROM authentication WHERE email = "${email}"`;
        console.log(
          "original password",
          password,
          "hashed password",
          hashedPassword,
          "query",
          Checkquery
        );
        let user = await query({ query: Checkquery, value: [] });
        user = user[0];
        console.log("user", user.password);
        if (user) {
          const checkPass = await compare(password, user.password);
          if (!checkPass) {
            // client.close();
            console.log("Password doesnt match", checkPass);
            throw new Error("Password doesnt match");
          } else {
            return {
              email: user.email,
              role: user.role,
            };
          }
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (user?.role) {
        session.role = user.role;
      }
      const sanitizedToken = Object.keys(token).reduce((p, c) => {
        if (c !== "iat" && c !== "exp" && c !== "jti" && c !== "apiToken") {
          return { ...p, [c]: token[c] };
        } else {
          return p;
        }
      }, {});
      return { ...session, user: sanitizedToken, apiToken: token.apiToken };
    },
    async jwt({ token, user, account, profile }) {
      if (typeof user !== "undefined") {
        return user;
      }
      return token;
    },
  },
};

export default authOptions;
