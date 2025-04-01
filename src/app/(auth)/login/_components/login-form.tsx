"use client"

// Packages
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

// Local imports
import { type ServerResType, SignInWithEmailAndPassword } from "@/actions/auth/auth"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
})

// Export the type so it can be imported in other files
export type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginForm() {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    startTransition(() => {
      SignInWithEmailAndPassword(data)
        .then((res: ServerResType) => {
          console.log(res)
          if (res.success) {
            toast.success("Login successfull 🎉", {
              position: "bottom-right",
              richColors: true,
            })

            // Add a small delay before redirecting to allow the session to be established
            setTimeout(() => {
              router.push("/")
              router.refresh()
            }, 500)
          } else {
            toast.error(res.message, {
              position: "top-center",
              richColors: true,
            })
          }
        })
        .catch((err) => {
          console.log(err.message)
          toast.error(err.message, {
            position: "bottom-right",
            richColors: true,
          })
        })
    })
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 1,
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.5,
        },
      }}
      className="w-full"
    >
      <div className="space-y-2 text-center">
        <h1 className="text-[36px] leading-[43.2px] font-semibold text-gradient dark:text-gradient-pink mb-[27px]">
          Log In
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-normal leading-[19.2px] text-[#444444]">
                  Username or Email<span className="text-[#E70F0F]">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Write your user name or email"
                    className="border-[1px] border-[#9E9E9E] focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[#9E9E9E]  text-black dark:!text-black font-normal text-[16px] leading-[19.2px] p-[16px] h-[51px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-normal leading-[19.2px] text-[#444444]">
                  Password<span className="text-[#E70F0F]">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Write your password"
                    className="border-[1px] border-[#9E9E9E] focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[#9E9E9E] text-black dark:!text-black font-normal text-[16px] leading-[19.2px] p-[16px] h-[51px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full p-[24px] h-[56px]" disabled={isPending}>
            {isPending ? "Logging in..." : "Log In"}
          </Button>
        </form>
      </Form>
      <div className="text-center">{/* Additional content can go here */}</div>
    </motion.div>
  )
}

