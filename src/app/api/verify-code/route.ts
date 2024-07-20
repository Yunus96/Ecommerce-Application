import { db } from "~/server/db";
import { NextRequest, NextResponse } from "next/server";
import { any } from "zod";

export async function POST(request: Request) {
    try {
        const { email, verifyCode } = await request.json()
        console.log(email, verifyCode)
        const decodedEmail = decodeURIComponent(email);
        const user = await db.user.findUnique({
            where: {email}
        })
        if (!user) {
            return Response.json(
                {
                    success : false,
                    message : "User not found"
                }
                , {status: 404})
        };
        const codeExpiry =user.verifyCodeExpiry || ""
        console.log(codeExpiry)
        const isCodeValid = Number(user.verifyCode) === verifyCode;
        const isCodeNotExpired = codeExpiry > new Date();

        if (isCodeValid && isCodeNotExpired) {
            await db.user.update({
                where: {
                    email: email,
                },
                data: {
                    isVerified: true
                }
            })
            return Response.json(
                {
                    success : true,
                    message : "Account verified successfully"
                }
                , {status: 200})
        } else if(!isCodeNotExpired) {
            return Response.json(
                {
                    success : false,
                    message : "Verification code has expired. please sign up again to get a new code"
                }
                , {status: 400})
        } else {
            return Response.json(
                {
                    success : false,
                    message : "Incorrect Verification Code"
                }
                , {status: 400})
        }
    } catch (error) {
        console.log("Error verifying user", error);        
        return Response.json(
            {
                success : false,
                message : "Error verifying user"
            }
            , {status: 500})

    }
}