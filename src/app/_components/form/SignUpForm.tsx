'use client'

import { Button } from "~/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "~/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

 
const FormSchema = z.object({
  name: z.string().min(1, "Name is required ").max(20),
  email: z.string().min(1, 'Email is required').email('Invalid Email'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must have 8 character')
})

const SignUpForm = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          name: "",
          email: "",
          password: ""
        },
      })

      const onSubmit = async (values: z.infer<typeof FormSchema> ) =>{

        const response = await fetch('/api/sign-up',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password
          })
        })
        console.log(response)
        if (response.ok) {
          router.push(`/otp/${values.email}`);
        } else {
          console.log('Registration failed', Error);
          
        }
      }


    return (
    <div className='border rounded-2xl border-slate-500 px-8 pb-5 pt-2 mb-16'>
      <div className="text-center text-2xl pb-6 pt-4">
        <h1><b>Create Your Account</b></h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full ">
          
          <div className="space-y-2">

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="johddoe" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />            
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          

          <Button className="w-full mt-3" type="submit">Sign Up</Button>
        </form>
        <div className='mx-auto text-xs my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
          or
        </div>
        <p className='text-center text-xs text-gray-600 mt-2'>
          If you already have an account, please&nbsp;
          <Link className='text-blue-500 hover:underline' href='/sign-in'>
            Sign In
          </Link>
        </p>
      </Form>
    </div>
    )
}

export default SignUpForm;