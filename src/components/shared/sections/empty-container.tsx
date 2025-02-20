import { TextEffect } from "@/components/ui/text-effect";
import { CircleAlert } from "lucide-react";

interface Props {
  message: string;
}

const EmptyContainer = ({ message }: Props) => {
  return (
    <div className="flex min-h-[40vh] w-full flex-col items-center justify-center gap-2 font-inter">
      <CircleAlert className="h-5 w-5" />
      <p className="text-14px text-tourHub-gray max-w-[400px] text-center">
        <TextEffect
          per="char"
          preset="fade"
          variants={{}}
          className=""
          onAnimationComplete={() => {}}
        >
          {message}
        </TextEffect>
      </p>
    </div>
  );
};

export default EmptyContainer;
