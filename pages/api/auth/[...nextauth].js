import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../lib/prisma';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({ server: process.env.EMAIL_SERVER, from: process.env.EMAIL_FROM }),
    GithubProvider({ clientId: process.env.GH_ID, clientSecret: process.env.GH_SECRET })
  ],
  secret: process.env.NEXTAUTH_SECRET
});
