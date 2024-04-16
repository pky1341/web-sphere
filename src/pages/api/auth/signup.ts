import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if (req.method==="POST") {
        const {FirstName,LastName,Email,Password}=req.body;
        const hashedPassword=await bcrypt.hash(Password,16);
        try {
            const user=await prisma.user.create({
                data:{
                    firstName:FirstName,
                    lastName:LastName,
                    email:Email,
                    password:hashedPassword
                }
            });
            console.log("hello guys");
            res.status(200).json({Message:"User created successfully"});
        } catch (error) {
            console.log(error);
            console.log("hi gys");
            res.status(500).json({error:"Failed to create user"});
        }
    } else {
        res.status(405).json({error:"mathod not allowed"});
    }
}