import { db } from "~/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        return "hi"
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