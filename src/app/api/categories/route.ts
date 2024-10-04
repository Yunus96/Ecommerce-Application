import { db } from "~/server/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        const userEmail =decodedToken.email
        const reqBody = await request.json()
        console.log(reqBody)
        const {email,labelId, label} = reqBody

        //check if user exists
        const user = await db.categories.findFirst({
            where: {userEmail}
        })
        if(user){
            const deleteUsers = await db.categories.deleteMany({
                where: {
                    email: userEmail
                }
            })
            console.log(deleteUsers)
        } else {
            const newUser = await db.categories.create({
                data:{
                    email: userEmail,
                    label,
                    labelId
                    }
                })
                console.log(newUser)
            NextResponse.json({
                success: true,
                message: "categories updated for the user"
            }, {status: 200})
        }



    } catch (error) {
        console.log("Error verifying user", error);        
        return Response.json(
            {
                success : false,
                message : "Error while getting categories"
            }
            , {status: 500})

    }
    
}