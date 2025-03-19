// Packages
import Image from "next/image";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";
import { ReactNode } from "react";

// Local imports
import { cn } from "@/lib/utils";
import LoginBackButton from "./login-back-button";
import logo from "../../../public/assets/img/logo.png";

interface AuthUIProviderProps {
  children: ReactNode;
  sidebarImage: string;
  fullWidth?: boolean;
  backButton?: true | false;
}

const AuthUIProvider = async ({
  children,
  sidebarImage,
  fullWidth,
  backButton = true,
}: AuthUIProviderProps) => {
  // generating a blur data url
  const buffer = await fetch(sidebarImage).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const { base64 } = await getPlaiceholder(buffer);
  return (
    <div className="min-h-screen  overflow-hidden">
      <div className="container ">
        <div className="relative rounded-lg ">
          <div className="flex items-center justify-center md:justify-between h-[100px] ">
            <Link href="/">
              <div className="flex items-center gap-1">
                <Image
                  src={logo}
                  alt="Pacific Rim Fusion"
                  width={60}
                  height={60}
                  className="rounded-full"
                  priority
                />
                <span className="font-semibold text-[10px] md:text-[15px] leading-[12px] md:leading-[16px] text-gradient dark:text-gradient-pink">
                  Pacific <br /> Rim <br /> Fusion
                </span>
              </div>
            </Link>
            {backButton && (
              <div className="hidden md:block">
                <LoginBackButton />
              </div>
            )}
          </div>
          <div
            className={cn(
              "grid min-h-[calc(100vh-80px)] md:py-[90px] items-center",
              fullWidth ? "grid-cols-1 md:py-0" : "grid-cols-1 md:grid-cols-2"
            )}
          >
            {!fullWidth && (
              <div className="relative hidden md:block w-full lg:w-[570px] md:max-h-[684px] h-full">
                <Image
                  src={sidebarImage}
                  alt="CBD Products"
                  fill
                  className="object-cover object-center rounded-[16px]"
                  placeholder="blur"
                  blurDataURL={base64}
                />
              </div>
            )}
            <div className={cn(fullWidth ? "md:p-0" : "md:p-8")}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthUIProvider;
