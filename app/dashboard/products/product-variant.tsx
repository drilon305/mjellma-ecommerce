"use client";

import { VariantsWithImagesTags } from "@/lib/infer-type";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { VariantSchema } from "@/types/variant-schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputTags } from "./input-tags";
import VariantImages from "./variant-images";
  

export const ProductVariant = ({
  editMode,
  productID,
  variant,
  children,
}: {
  editMode: boolean;
  productID: number;
  variant?: VariantsWithImagesTags;
  children: React.ReactNode;
}) => {

    const form = useForm<z.infer<typeof VariantSchema>>({
        resolver: zodResolver(VariantSchema),
        defaultValues: {
            tags: [],
            variantImages: [],
            color: '#000000',
            editMode,
            id: undefined,
            productID,
            productType: 'Black Notebooks'

        },
    })

    function onSubmit(values: z.infer<typeof VariantSchema>) {
        console.log(values)
      }

  return (
    <Dialog>
    <DialogTrigger>{children}</DialogTrigger>
    <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-[860px] rounded-md">
      <DialogHeader>
        <DialogTitle>{editMode ? 'Edit' : 'Create'} your variant</DialogTitle>
        <DialogDescription>
         Manage your product variants here.
        </DialogDescription>
      </DialogHeader>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="productType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variant Title</FormLabel>
              <FormControl>
                <Input placeholder="Pick a title for your variant" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variant Color</FormLabel>
              <FormControl>
                <Input type="color" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
               <InputTags {...field} onChange={(e) => field.onChange(e)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <VariantImages />
        {editMode && variant && (
            <Button type="button" onClick={(e) => e.preventDefault()}>
                Delete Variant
            </Button>
        )}
        {/* <VariantImages /> */}
        <Button type="submit">{editMode ? 'Update Variant' : 'Create Variant'}</Button>
      </form>
    </Form>

    </DialogContent>
  </Dialog>
  );
}
