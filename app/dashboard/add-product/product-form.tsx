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
            <FormItem className="py-2">
              <FormLabel>Product Title</FormLabel>
              <FormControl>
                <Input placeholder="Bamboo glass water" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </CardContent>
    <CardFooter>
      <p>Card Footer</p>
    </CardFooter>
  </Card>
  
   )
}