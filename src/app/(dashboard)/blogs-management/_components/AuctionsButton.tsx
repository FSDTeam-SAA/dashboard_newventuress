
"use client"
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import EditBlogForm from "./EditBlogForm";


const AuctionsButton = ({ row }: any) => {
  const [isOpen, setIsOpen] = useState(false)
  console.log(row);



  const handleLogout = () => {
    setIsOpen(true); 
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-white h-auto w-[110px] rounded-lg shadow-[4px_4px_8px_0px_#0000000D,-4px_-4px_8px_0px_#0000000D]"
        >
          <DropdownMenuItem

            onClick={() => {
              {
                
                handleLogout(); 
              }
            }}

            className="p-[8px] hover:bg-[#E6EEF6] cursor-pointer  focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            Edit


          </DropdownMenuItem>


          <DropdownMenuItem
            className="p-[8px] text-red-600 cursor-pointer hover:bg-[#E6EEF6] rounded-b-[8px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isOpen && (

        <section
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50"
          onClick={() => setIsOpen(false)} 
        >
          <div
            style={{ boxShadow: "0px 0px 22px 8px #C1C9E4" }}
            className="relative w-[343px] md:w-[1250px] rounded-[16px] border overflow-hidden"
            onClick={(e) => e.stopPropagation()} 
          >
            
            <div className="absolute inset-0 z-0 bg-[url('/assets/img/modalbg.png')] bg-no-repeat bg-cover rounded-[16px] opacity-50" />

            
            <div className="relative z-10">
              <EditBlogForm />
            </div>
          </div>
        </section>

      )
      }

    </div >
  );
};

export default AuctionsButton;
