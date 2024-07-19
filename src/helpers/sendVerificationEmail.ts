import { resend } from "~/lib/resend";
import VerificationEmail from '../../emails/VerificationEmail';
import { ApiResponse } from "~/types/ApiResponse";

export async function sendVerificationEmail(
    email:string,
    name: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        const emailSent =await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verification Code',
            react: VerificationEmail({name, otp:  verifyCode})
        });
        console.log("emailSent",emailSent)
        return {
            success: true, 
            message: 'Verification email sent successfully'
        }
    } catch (emailError) {
        console.error('Error sending verification email', 
            emailError)
            return {
                success: false, 
                message: 'failed to send verification email'
            }
    }
}