'use client'

import { VariantSchema } from "@/types/variant-schema"
import { useFieldArray, useFormContext } from "react-hook-form"
import * as z from 'zod'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { UploadDropzone } from "@/app/api/uploadthing/upload"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "lucide-react"
import { cn } from "@/lib/utils"


export default function VariantImages() {
  const { getValues, control, setError } =
    useFormContext<z.infer<typeof VariantSchema>>();

  const { fields, remove, append, update, move } = useFieldArray({
    control,
    name: "variantImages",
  });

  return (
    <div>
      <FormField
        control={control}
        name="variantImages"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tags</FormLabel>
            <FormControl>
              <UploadDropzone
                className="ut-allowed-content:text-secondary-foreground ut-label:text-primary ut-upload-icon:text-primary/50
                 hover:bg-primary/1-0 transition-all duration-500  ease-in-out border-secondary ut-button:bg-primary/75 ut-button:ut-readying:bg-primary/75 ut-button:ut-readying:bg-secondary"
                onUploadError={(error) => {
                  setError("variantImages", {
                    type: "validate",
                    message: error.message,
                  });
                  return;
                }}
                onBeforeUploadBegin={(files) => {
                  files.map((file) =>
                    append({
                      name: file.name,
                      size: file.size,
                      url: URL.createObjectURL(file),
                    })
                  );
                  return files;
                }}
                onClientUploadComplete={(files) => {
                  const images = getValues('variantImages')
                  images.map((field, imgIDX) => {
                    if(field.url.search('blob:') === 0) {
                      const image = files.find((img) => img.name === field.name)
                      if(image) {
                        update(imgIDX, {
                          url: image.url,
                          name: image.name,
                          size: image.size,
                          key: images.key,
                        })
                      }
                    }
                  })
                  return
                }}
                config={{ mode: "auto" }}
                endpoint="variantUploader"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="rounded overflow-x-auto">
      <Table>
  <TableHeader>
    <TableRow>
      <TableHead>Order</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Size</TableHead>
      <TableHead>Image</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
   {fields.map((field, index) => {
    return (
      <TableRow
        className={
          cn(
            field.url.search("blob:") === 0
              ? "animate-pulse transition-all"
              : "",  "text-sm font-bold text-muted-foreground hover:text-primary"
          ) }
      >
        <TableCell>{index}</TableCell>
        <TableCell>{field.name}</TableCell>
        <TableCell>{(field.size / (1024)).toFixed(2)} MB</TableCell>
        <TableCell>
          <div className="flex items-center justify-center">
          <Image src={field.url} alt={field.name} className="rounded-md" width={72} height={48} />
          </div>
        </TableCell>
        <TableCell>
          <Button variant='ghost' onClick={(e) => {
            e.preventDefault()
            remove(index)
          }} className="scale-75">
        <TrashIcon className="h-4" />
          </Button>
        </TableCell>
      </TableRow>
    );
   })}
  </TableBody>
</Table>
      </div>
    </div>
  );
}