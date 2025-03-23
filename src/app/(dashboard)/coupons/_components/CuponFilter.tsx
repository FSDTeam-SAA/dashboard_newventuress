"use client"

import { useState, useEffect } from "react"
import DateRangePicker from "./CuponDateRange"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function CuponFilter() {
  const [date, setDate] = useState<DateRange | undefined>()
  
    // Log date changes
    useEffect(() => {
      if (date) {
        console.log("Date Range Changed:", {
          from: date.from ? format(date.from, "yyyy-MM-dd") : undefined,
          to: date.to ? format(date.to, "yyyy-MM-dd") : undefined,
        })
      }
    }, [date])
  
    const formatDateRange = (range: DateRange | undefined) => {
      if (range?.from) {
        if (range.to) {
          return `${format(range.from, "LLL dd, y")} - ${format(range.to, "LLL dd, y")}`
        }
        return format(range.from, "LLL dd, y")
      }
      return "Pick a date range"
    }
  return (
    <div className="flex items-center bg-white mb-[30px] gap-4 p-4 w-full rounded-[12px]">

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Show</span>
        <Select defaultValue="all">
          <SelectTrigger className="py-[9px] px-[10px] bg-primary text-white border-0 [&>svg]:text-white">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Entries</span>
        <Select>
          <SelectTrigger className="py-[9px] px-[10px] bg-primary text-white border-0  [&>svg]:text-white">
            <SelectValue placeholder="Chose stores" />

          </SelectTrigger>
          <SelectContent>
            <SelectItem value="store1">Store 1</SelectItem>
            <SelectItem value="store2">Store 2</SelectItem>
            <SelectItem value="store3">Store 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
      <DateRangePicker
                      date={date}
                      onDateChange={(newDate) => {
                        setDate(newDate)
                        console.log("Date Range Selected:", {
                          from: newDate?.from ? format(newDate.from, "yyyy-MM-dd") : undefined,
                          to: newDate?.to ? format(newDate.to, "yyyy-MM-dd") : undefined,
                        })
                      }}
                      trigger={
                        <Button variant="outline" className="w-auto justify-start text-left font-normal bg-primary text-[#F5F5F5] hover:text-[#F5F5F5]">
                          {formatDateRange(date)}
                          <ChevronDown />
                        </Button>
                      }
                    />
      </div>

      <div className="ml-auto">
        <Button variant="default" className="bg-primary text-white ">
          Bulk Delete
        </Button>
      </div>
    </div>
  )
}

