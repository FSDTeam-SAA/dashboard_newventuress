"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  subject: z.string().min(2, {
    message: "Subject must be at least 10 characters.",
  }),
  text: z.string().min(2, {
    message: "Text must be at least 20 characters.",
  }),
});
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { X } from "lucide-react";
import JoditInput from "@/components/ui/JoditInput";

const SendBulkNewsLetter = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      text: "",
    },
  });

  const session = useSession();
  const token = session?.data?.user?.token;
  console.log({ token });
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["send-bulk-news-letter"],
    mutationFn: (data: any) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }).then((res) => res.json()),

    onSuccess: (data) => {
      if (!data?.status) {
        toast.error(data.message, {
          position: "top-right",
          richColors: true,
        });
        return;
      }
      form.reset();
      onOpenChange(false);
      toast.success(data.message, {
        position: "top-right",
        richColors: true,
      });
      queryClient.invalidateQueries({ queryKey: ["news-letter"] });
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
    console.log(values);
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="w-full flex items-center justify-end">
              <X className="cursor-pointer" onClick={() => onOpenChange(false)}/>
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your Subject ....." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <JoditInput control={form.control} name={field.name} placeholder="Start typing..." />
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center justify-end">
              <Button disabled={isPending} type="submit">{isPending ? "Submitting..." : "Submit"}</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SendBulkNewsLetter;
