"use client";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import BlogGallery from "./BlogGallery";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string(),
});

const EditBlogForm: React.FC = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });


    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
    };
    return (
        <div className="bg-white rounded-[24px] p-[32px]">
            <div
                className={
                    "flex justify-start items-center bg-primary px-4 py-3 mb- rounded-t-lg text-white text-[32px] leading-[38px] font-semibold"
                }
            >
                Edit Blogs
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-[54px]">
                        <div className="w-[58%] space-y-[16px] mt-[60px]">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-start items-center">
                                            Title<span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder=""
                                                type=""
                                                className="h-[51px] border-[#9C9C9C]"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-start items-center">Short Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Type Description Here"
                                                className="resize-none border-[#9C9C9C] h-[192px]"
                                                rows={12}
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                        <div className="w-[42%] h-full mt-[16px] border border-[#9C9C9C] rounded-lg  ">
                            <BlogGallery />
                        </div>
                    </div>
                    <div className="flex justify-end pt-[60px]">
                        <Button type="submit" className="py-[12px] px-[24px]">
                            Post
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default EditBlogForm;
