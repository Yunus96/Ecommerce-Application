import * as React from 'react';
import { Html, Button } from "@react-email/components";

interface VerificationEmailProps{
  name: string,
  otp: string
}
export default function VerificationEmail({ name, otp } : VerificationEmailProps) {

  return (
    <Html lang="en">
      <h2>Hi {name}, Here is your otp</h2>
      <h2>OTP : {otp}</h2>
      <Button href="#">Click me</Button>
    </Html>
  );
}
