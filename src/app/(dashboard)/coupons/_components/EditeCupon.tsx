"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  discountType: z.string(),
  amount: z.string(),
  startDate: z.string(),
  expireDate: z.string(),
  emailRestrictions: z.string(),
  usageLimit: z.string(),
  usageLimitPerUser: z.string(),
  product: z.string(),
  category: z.string(),
  subCategory: z.string(),
  saveInfo: z.boolean().default(false),
})

interface EditCouponProps {
  setIsOpen: (open: boolean) => void;
  couponData: any; // Add couponData prop
}

export default function EditeCupon({ setIsOpen, couponData }: EditCouponProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: couponData?.original?.code || "",
      description: couponData?.original?.description || "",
      discountType: couponData?.original?.type || "",
      amount: couponData?.original?.amount || "",
      startDate: couponData?.original?.startDate || "",
      expireDate: couponData?.original?.expireDate || "",
      emailRestrictions: couponData?.original?.emailRestrictions || "",
      usageLimit: couponData?.original?.limit || "",
      usageLimitPerUser: couponData?.original?.usageLimitPerUser || "",
      product: couponData?.original?.product || "",
      category: couponData?.original?.category || "",
      subCategory: couponData?.original?.subCategory || "",
      saveInfo: couponData?.original?.saveInfo || false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsOpen(false);
  }

  function onBack() {
    setIsOpen(false);
  }

  return (
    <div className="h-auto bg-gray-50 space-y-0">
      <div className="mx-auto max-w-[1250px] rounded-lg bg-white shadow-sm">
        <div className="bg-gradient-to-r from-[#121D42] via-[#152764] to-[#4857BD] flex justify-between items-center rounded-t-[8px] py-[20px] px-[32px]">
          <h1 className="text-2xl font-semibold text-white text-left">Edit Coupons</h1>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onBack()}
            className="py-[10px] px-[12px]"
          >
            Back to List <ArrowRight className="mr-2 h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="pl-[32px] pr-[20px] space-y-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="w-full flex justify-start text-base font-normal leading-[19px] text-[#444444]">
                      Title <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input className="h-[51px] border-[1px] border-[#B0B0B0] rounded-[8px] px-4" {...field} />
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
                    <FormLabel className="w-full flex justify-start text-base font-normal leading-[19px] text-[#444444]">Description</FormLabel>
                    <FormControl>
                      <Textarea className="h-[91px] border-[1px] border-[#9E9E9E] rounded-[8px]" placeholder="Type Description here" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="w-full flex justify-start text-base font-normal leading-[19px] text-[#444444]">Discount Type</FormLabel>
                    <FormControl>
                      <Input className="h-[51px] border-[1px] border-[#9E9E9E] rounded-[8px] px-4" placeholder="Percentage discount" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="w-full flex justify-start text-base font-normal leading-[19px] text-[#444444]">Amount</FormLabel>
                    <FormControl>
                      <Input className="h-[51px] border-[1px] border-[#9E9E9E] rounded-[8px] px-4" placeholder="Percentage discount" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-[30px]">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="w-full flex justify-start text-base font-normal leading-[19px] text-[#444444]">Start Date</FormLabel>
                      <FormControl>
                        <Input className="h-[51px] border-[1px] border-[#9E9E9E] rounded-[8px] px-4" type="text" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expireDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="w-full flex justify-start text-base font-normal leading-[19px] text-[#444444]">Expire Date</FormLabel>
                      <FormControl>
                        <Input className="h-[51px] border-[1px] border-[#9E9E9E] rounded-[8px] px-4" type="text" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="emailRestrictions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="w-full flex justify-start text-base font-normal leading-[19px] text-[#444444]">Email Restrictions</FormLabel>
                    <FormControl>
                      <Input className="h-[51px] border-[1px] border-[#9E9E9E] rounded-[8px] px-4" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="usageLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="w-full flex justify-start text-base font-normal leading-[19px] text-[#444444]">Usage Limit</FormLabel>
                      <FormControl>
                        <Input className="h-[51px] border-[1px] border-[#9E9E9E] rounded-[8px] px-4" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="usageLimitPerUser"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="w-full flex justify-start text-base font-normal leading-[19px] text-[#444444]">Usage limit per user</FormLabel>
                      <FormControl>
                        <Input className="h-[51px] border-[1px] border-[#9E9E9E] rounded-[8px] px-4" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="w-full flex justify-start text-base font-normal leading-[19px] text-[#444444]">Product</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <FormControl className="h-[48px] border-[1px] border-[#B0B0B0] rounded-[8px]">
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="product1">Product 1</SelectItem>
                        <SelectItem value="product2">Product 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="w-full flex justify-start text-base font-normal leading-[19px] text-[#444444]">Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <FormControl className="h-[48px] border-[1px] border-[#B0B0B0] rounded-[8px]" >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="category1">Category 1</SelectItem>
                          <SelectItem value="category2">Category 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="w-full flex justify-start text-base font-normal leading-[19px] text-[#444444]">Sub-Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <FormControl className="h-[48px] border-[1px] border-[#B0B0B0] rounded-[8px]">
                          <SelectTrigger>
                            <SelectValue placeholder="Select sub-category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sub1">Sub-Category 1</SelectItem>
                          <SelectItem value="sub2">Sub-Category 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="saveInfo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-xs font-normal leading-[14px] text-[#919792]">
                        Save this information for faster Adding Products
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex justify-end pb-[32px]">
                <Button type="submit" className="w-[138px] h-[44px] py-[12px] px-[41px] bg-[#1e2875] hover:bg-[#3c3c8f]">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </div>
    </div>
  );
}
