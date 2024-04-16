import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if (req.method==="POST") {
        const {firstName, lastName, email, password} = req.body;
        console.log(req.body.firstName);
        // const salt=await bcrypt.genSalt(10);
        // const hashedPassword=await bcrypt.hash(Password,salt);
        try {
            const user=await prisma.user.create({
                data:{
                    firstName:firstName,
                    lastName:lastName,
                    email:email,
                    password:password
                }
            });
            res.status(200).json({message:"User created successfully"});
        } catch (error) {
            res.status(500).json({error:"Failed to create user"});
        }
    } else {
        res.status(405).json({error:"mathod not allowed"});
    }
}