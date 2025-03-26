import AuthUIProvider from "@/components/ui/AuthUIProvider";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("./_components/login-form"), {
  ssr: false,
});

const Page = () => {
  return (
    <AuthUIProvider
      sidebarImage="https://i.ibb.co.com/jPFh8S6d/image-5.png"
      fullWidth
    >
      <div className="max-w-[500px] mx-auto *:dark:text-black">
        <LoginForm />
      </div>
    </AuthUIProvider>
  );
};

export default Page;
