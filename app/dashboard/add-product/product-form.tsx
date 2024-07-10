"use client"

import { useForm } from "react-hook-form"
import { zProductSchema } from "@/types/product-schema"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { DollarSign } from "lucide-react"
  

export default function ProductForm(){

    const form = useForm<zProductSchema>({
        defaultValues: {
            title: '',
            description: '',
            price: 0
        }
    })

   return (
    <Card>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card Description</CardDescription>
    </CardHeader>
    <CardContent>
    <Form {...form}>
      <form onSubmit={() => console.log('hjey')} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Title</FormLabel>
              <FormControl>
                <Input placeholder="Bamboo glass water" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                {/* <Input placeholder="Bamboo glass water" {...field} /> */}
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
              <FormLabel>Product Price</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                    <DollarSign size={36} className="p-2  bg-muted rounded-md" />
                    <Input {...field} type="number" placeholder="Your price in USD" step='0.1' min={0} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">Submit</Button>
      </form>
    </Form>
    </CardContent>
  </Card>
  
   )
}