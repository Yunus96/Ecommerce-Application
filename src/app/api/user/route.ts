import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import * as z from "zod"

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
        const newUser = await db.user.create({
            data:{
                name,
                email,
                password : hashedPassword 
            }
        })

        const { password: newUserPassword, ...rest } = newUser;



        return NextResponse.json({
            user: rest,
            message: "User created successfully",
        }, {status: 201})
    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong",
        }, {status: 500})
    }
}