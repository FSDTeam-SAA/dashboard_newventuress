"use client";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useState } from "react";
import SendBulkNewsLetter from "./SendBulkNewsLetter";

const NewsLetterHedder = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="h-[80px] w-full bg-white p-[8px] rounded-[12px] flex items-center justify-end mb-[30px]">

        <div>
          <Button onClick={() => setIsOpen(true)} asChild>
            <span className="flex items-center gap-2 cursor-pointer">
              Send Bulk News Letter <Mail/>
            </span>
          </Button>
        </div>
      </div>

      {/* send bulk news letter  */}
      {
        isOpen && (
          <SendBulkNewsLetter open ={isOpen} onOpenChange={setIsOpen}/>
        )
      }
    </div>
  );
};

export default NewsLetterHedder;
