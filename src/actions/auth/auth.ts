"use server"; // Ensure this is at the top to mark this as a server action

import { LoginFormValues } from "@/app/(auth)/login/_components/login-form";
import { signIn } from "@/auth"; // Import NextAuth's signIn function
import { AuthError } from "next-auth"; // Import AuthError for error handling

export interface ServerResType {
  success: boolean;
  message: string;
  data?: any;
}

export async function SignInWithEmailAndPassword(data: LoginFormValues) {
  try {
    // Attempt to sign in with credentials
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false, // Disable automatic redirect to handle it manually
    });

    console.log("LOGIN SUCCESS");

    // If successful, return a success message
    return { success: true, message: "Login successful." } as ServerResType;
  } catch (error: any) {
    console.log("SERVER_ACTION_ERROR:", error);

    // Handle specific NextAuth errors
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            message: "Something went wrong",
          } as ServerResType;

        default:
          return {
            success: false,
            message:
              " The email or password you entered is incorrect. Please try again.",
          } as ServerResType;
      }
    }

    // Handle CallbackRouteError
    if (error.message.includes("CallbackRouteError")) {
      return {
        success: false,
        message: "Login failed. Please check your credentials and try again.",
      } as ServerResType;
    }

    throw Error(error);
  }
}
