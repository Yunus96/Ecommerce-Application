import { db } from "~/server/db";
import bcrypt, { hash } from "bcryptjs"
import { sendVerificationEmail } from "~/helpers/sendVerificationEmail";
import { NextResponse } from "next/server";
sendVerificationEmail

export async function POST(request : Request) {
    try {
        const {name, email, password} = await request.json()

        const hashedPassword = await hash(password, 10)
        const verifyCode = Math.floor(10000000 + Math.random() * 90000000).toString();

        const expiryDate = new Date()
        expiryDate.setHours(expiryDate.getHours() + 1)

        //check if email already exist
        const existingUserByEmail = await db.user.findUnique({
                    where: {email}
        })
            if (existingUserByEmail) {
                if(existingUserByEmail.isVerified){
                    return NextResponse.json({
                        user: null,
                        message: "User already exist"
                    }, {status: 409})
                } else {
                    const hashedPassword = await hash(password, 10)
                    //existingUserByEmail.password = hashedPassword
                    //existingUserByEmail.verifyCode = verifyCode
                    //existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                    await db.user.update({
                        where: {
                            email: email,
                        },
                        data: {
                            password: hashedPassword,
                            verifyCode,
                            verifyCodeExpiry: expiryDate
                        }
                    })
                }
            } else {
             // creating data in db
             const newUser = await db.user.create({
                data:{
                        name,
                        email,
                        password : hashedPassword ,
                        verifyCode,
                        verifyCodeExpiry: expiryDate
                    }
                }) 
                const { password: newUserPassword, ...rest } = newUser;
            }

    
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

        }
        catch (error) {
            console.log('Error registering user', error)
            return Response.json(
            {
                success: false,
                message: "Error registering user"
            },
            { status : 500 }
        )
    }
}