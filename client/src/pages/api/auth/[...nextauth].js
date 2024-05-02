import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/Google"
import FacebookProvider from 'next-auth/providers/facebook'
import LinkedInProvider from "next-auth/providers/linkedin";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/db";

  // Configure one or more authentication prov iders 






export const authOptions = {
  // adapter: MongoDBAdapter(clientPromise),
  

  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET
    })
    // ...add more providers here
  ],
  database: process.env.DATABASE_URL,
  
  
  // pages: {
  //   signIn: "/login", 
  //   signOut: "/logout",  
  //   error: "/error",  
  //   verifyRequest: "/verify-request ",  
  //   newUser: null//"/account /register" 
    
  // },
  // theme: {
  //   colorScheme: "light", 
  //   },
  
}

export default NextAuth(authOptions)