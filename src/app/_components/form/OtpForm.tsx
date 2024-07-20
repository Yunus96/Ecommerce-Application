"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios, { AxiosError } from 'axios'
import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp"
import { toast, useToast } from "~/components/ui/use-toast"
import { useParams, useRouter } from "next/navigation"
import { ApiResponse } from "~/types/ApiResponse"

const FormSchema = z.object({
  verifyCode: z.string().min(8, {
    message: "Your one-time password must be 8 characters.",
  }),
})

export default function OtpForm() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      verifyCode: "",
    },
  })

  
  const onSubmit = async (data:any) => {
    const response = await fetch('/api/verify-code',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: params.email,
        verifyCode: data.verifyCode
      })
    })
      console.log(response)
      if (response.ok) {
        router.replace('sign-in')
      } else {
        console.error("Error in signup of user");
      }
  }

  return (
    <div className=" mb-36 border rounded-2xl border-slate-500 p-10 pt-14">
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="verifyCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">One-Time Password</FormLabel>
                <FormDescription>
                  Please enter the one-time password sent to your Email.
                </FormDescription>
                <FormControl>
                  <InputOTP maxLength={8} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="border-slate-900"/>
                      <InputOTPSlot index={1} className="border-slate-900"/>
                      <InputOTPSlot index={2} className="border-slate-900"/>
                      <InputOTPSlot index={3} className="border-slate-900"/>
                      <InputOTPSlot index={4} className="border-slate-900"/>
                      <InputOTPSlot index={5} className="border-slate-900"/>
                      <InputOTPSlot index={6} className="border-slate-900"/>
                      <InputOTPSlot index={7} className="border-slate-900"/>
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}