"use client"

import { faker,simpleFaker } from '@faker-js/faker';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link";

import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "~/components/ui/pagination"
import { toast } from "~/components/ui/use-toast"
import { useEffect, useState } from "react";

let items = [{"id":1,"label":"Grocery"},
    {"id":2,"label":"Electronics"},
    {"id":3,"label":"Clothing"},
    {"id":4,"label":"Grocery"},
    {"id":5,"label":"Electronics"},
    {"id":6,"label":"Health"},
    {"id":7,"label":"Music"},
    {"id":8,"label":"Tools"},
    {"id":9,"label":"Music"},
    {"id":10,"label":"Garden"},
    {"id":11,"label":"Jewelry"},
    {"id":12,"label":"Garden"},
    {"id":13,"label":"Industrial"},
    {"id":14,"label":"Home"},
    {"id":15,"label":"Automotive"},
    {"id":16,"label":"Clothing"},
    {"id":17,"label":"Home"},
    {"id":18,"label":"Garden"},
    {"id":19,"label":"Home"},
    {"id":20,"label":"Garden"},
    {"id":21,"label":"Movies"},
    {"id":22,"label":"Kids"},
    {"id":23,"label":"Toys"},
    {"id":24,"label":"Computers"},
    {"id":25,"label":"Kids"},
    {"id":26,"label":"Books"},
    {"id":27,"label":"Garden"},
    {"id":28,"label":"Clothing"},
    {"id":29,"label":"Jewelry"},
    {"id":30,"label":"Shoes"},
    {"id":31,"label":"Computers"},
    {"id":32,"label":"Sports"},
    {"id":33,"label":"Automotive"},
    {"id":34,"label":"Toys"},
    {"id":35,"label":"Music"},
    {"id":36,"label":"Baby"},
    {"id":37,"label":"Baby"},
    {"id":38,"label":"Music"},
    {"id":39,"label":"Music"},
    {"id":40,"label":"Outdoors"},
    {"id":41,"label":"Industrial"},
    {"id":42,"label":"Books"},
    {"id":43,"label":"Sports"},
    {"id":44,"label":"Grocery"},
    {"id":45,"label":"Health"},
    {"id":46,"label":"Health"},
    {"id":47,"label":"Shoes"},
    {"id":48,"label":"Shoes"},
    {"id":49,"label":"Music"},
    {"id":50,"label":"Clothing"},
    {"id":51,"label":"Electronics"},
    {"id":52,"label":"Toys"},
    {"id":53,"label":"Sports"},
    {"id":54,"label":"Health"},
    {"id":55,"label":"Music"},
    {"id":56,"label":"Music"},
    {"id":57,"label":"Music"},
    {"id":58,"label":"Industrial"},
    {"id":59,"label":"Industrial"},
    {"id":60,"label":"Kids"},
    {"id":61,"label":"Books"},
    {"id":62,"label":"Kids"},
    {"id":63,"label":"Outdoors"},
    {"id":64,"label":"Automotive"},
    {"id":65,"label":"Games"},
    {"id":66,"label":"Books"},
    {"id":67,"label":"Clothing"},
    {"id":68,"label":"Clothing"},
    {"id":69,"label":"Music"},
    {"id":70,"label":"Home"},
    {"id":71,"label":"Garden"},
    {"id":72,"label":"Health"},
    {"id":73,"label":"Health"},
    {"id":74,"label":"Sports"},
    {"id":75,"label":"Health"},
    {"id":76,"label":"Shoes"},
    {"id":77,"label":"Sports"},
    {"id":78,"label":"Health"},
    {"id":79,"label":"Electronics"},
    {"id":80,"label":"Grocery"},
    {"id":81,"label":"Baby"},
    {"id":82,"label":"Industrial"},
    {"id":83,"label":"Shoes"},
    {"id":84,"label":"Industrial"},
    {"id":85,"label":"Kids"},
    {"id":86,"label":"Grocery"},
    {"id":87,"label":"Automotive"},
    {"id":88,"label":"Books"},
    {"id":89,"label":"Sports"},
    {"id":90,"label":"Home"},
    {"id":91,"label":"Clothing"},
    {"id":92,"label":"Health"},
    {"id":93,"label":"Sports"},
    {"id":94,"label":"Kids"},
    {"id":95,"label":"Garden"},
    {"id":96,"label":"Kids"},
    {"id":97,"label":"Baby"},
    {"id":98,"label":"Toys"},
    {"id":99,"label":"Jewelry"},
    {"id":100,"label":"Tools"}]

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})

export function CategoryForm() {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ["recents", "home"],
    },
  })


  let selectedCategories: string[][]  = []
  const [selectCat, setSelectedCat ] = useState([])
  const [data, setData] = useState(items);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(6);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItem = data.slice(firstItemIndex, lastItemIndex)

  function onSubmit(data: any) {
    setSelectedCat([selectedCategories]);
    
  }
  console.log(selectCat);
  return (
    <div className="mb-0 text-center border rounded-2xl border-slate-500 p-10 pt-3 mt-0">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
            control={form.control}
            name="items"
            render={() => (
                <FormItem>
                <div className="mb-6 ">
                    <FormLabel className="text-base">Please mark your interest!</FormLabel>
                    <FormDescription>
                    We will keep you notified
                    </FormDescription>
                </div>
                {currentItem.map((item, idx) => (
                    <FormField
                    key={idx}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                        return (
                        <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                        >
                            <FormControl>
                            <Checkbox
                                checked={field.value?.includes(item.id)}
                      
                                onCheckedChange={(checked) => {
                                  selectedCategories.push(field.value)
                                return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                        (value) => value !== String(item.id)
                                        )
                                    )
                                }}
                            />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                            {item.label}
                            </FormLabel>
                        </FormItem>
                        )
                    }}
                    />
                ))}
                <FormMessage />
                </FormItem>
            )}
            />
            <PaginationSection 
            totalItems={data.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setcurrentPage={setCurrentPage}
            />
            <Button type="submit" className="w-full">Submit</Button>
        </form>
        </Form>
    </div>
  )
}

function PaginationSection({
    totalItems,
    itemsPerPage,
    currentPage,
    setcurrentPage
}:
{
    totalItems: any,
    itemsPerPage: any,
    currentPage: any,
    setcurrentPage : any  
}){
  let pages = []
  for (let i = 0; i < Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i)
  }

  const handleNextPage = ()=>{
    if (currentPage < pages.length) {
        setcurrentPage(currentPage + 1)
    }
  }
  const handlePrevPage = ()=>{
      if (currentPage > 1) {
          setcurrentPage(currentPage - 1)
      }
  }
    return( 
    <Pagination>
            <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={()=> handlePrevPage()} />
                </PaginationItem>  

                {pages.map((page, idx)=>(
                    <PaginationItem
                    key={idx}
                    className={currentPage === page ? "bg-gray-400 rounded-md": ""}>
                      <PaginationLink onClick={()=>setCurrentPage(page)}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                
                <PaginationItem>
                <PaginationNext onClick={()=> handleNextPage()} />
                </PaginationItem>
            </PaginationContent>
            </Pagination>
)}
