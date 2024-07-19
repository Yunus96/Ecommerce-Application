import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import * as z from "zod"
import { sendVerificationEmail } from "~/helpers/sendVerificationEmail";
import VerificationEmail from "emails/VerificationEmail";

//define a schema for input validation
const userSchema = z
  .object({
    name: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  })

export async function POST(req: Request){
    try {
        const body = await req.json();
        const {  name, email, password } = userSchema.parse(body)

        //check if email already exist
        const existingUserByEmail = await db.user.findUnique({
            where: {email}
        })
        if (existingUserByEmail) {
            return NextResponse.json({
                user: null,
                message: "User already exist"
            }, {status: 409})
        }

        // creating data in db
        const hashedPassword = await hash(password, 10)
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        const newUser = await db.user.create({
            data:{
                name,
                email,
                password : hashedPassword ,
                verifyCode
            }
        })

        const { password: newUserPassword, ...rest } = newUser;



        return NextResponse.json({
            user: rest,
            message: "User created successfully",
        }, {status: 201})

        // send verification email
        const emailResponse = await sendVerificationEmail( 
            email, 
            name, 
            verifyCode
        )
        if(!emailResponse.success){
            return Response.json({
                success: false,
                message: emailResponse.message
            }, {status: 500})
        }
        return Response.json({
            success: true,
            message: "User registered successfully. Please verify your mail"
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong User was not created in DB ",
        }, {status: 500})
    }
}