import prisma from "@/lib/prisma";
import NextAuth from "next-auth/next";

export default NextAuth({
    callbacks:{
        async jwt(token,user,account,profile,isNewuser){
            if (isNewuser) {
                const user=await prisma.user.create({
                    name:
                });
            }
            return token
        }
    }
});