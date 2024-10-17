"use client"

import { ColumnDef, Row } from "@tanstack/react-table"
import { MoreHorizontal, PlusCircle, PlusCircleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { useAction } from "next-safe-action/hooks"
import { deleteProduct } from "@/server/actions/delete-product"
import { toast } from "sonner"
import Link from "next/link"
import { VariantsWithImagesTags } from "@/lib/infer-type"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import ProductVariant from "./product-variant"



type ProductColumn = {
    title: string;
    price: number;
    image: string;
    variants: VariantsWithImagesTags[]
    id: number;
}

async function deleteProductWrapper(id: number) {
    const { data } = await deleteProduct({ id })
    if(!data) {
        return new Error('No data found')
    }
    if (data?.success) {
        toast.success(data.success);
    }
    if (data?.error) {
        toast.error(data.error);
    }
 }

 const ActionCell = ({ row }: {row: Row<ProductColumn>}) => {
    const { execute, status } = useAction(deleteProduct, {
        onSuccess: (data) => {
            if(data?.error) toast.error(data.error)
            if(data?.success) toast.success(data.success)
        },
        onExecute: () => {
            toast.loading('Deleting Product')
        },
    })

    const product = row.original;

    return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="w-8 h-8 p-0">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="dark:focus:bg-primary focus:bg-primary/50 cursor-pointer">
              <Link href={`/dashboard/add-product?id=${product.id}`} >Edit Product</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => execute({id: product.id})} className="dark:focus:bg-destructive focus:bg-destructive/50 cursor-pointer">
              Delete Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
 }


export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "variants",
    header: "Variants",
    cell: ({ row }) => {
      const variants = row.getValue("variants") as VariantsWithImagesTags[];
      return (
        <div>
          {variants.map((variant) => (
            <div key={variant.id}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <ProductVariant />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{variant.productType}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
          <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-primary">
                    <PlusCircle className="w-4 h-4" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Create a new variant</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        currency: "EUR",
        style: "currency",
      }).format(price);
      return <div className="font-medium text-xs">{formatted}</div>;
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const cellImage = row.getValue("image") as string;
      const cellTitle = row.getValue("title") as string;
      return (
        <div className="">
          <Image
            src={cellImage}
            alt={cellTitle}
            width={50}
            height={50}
            className="rounded-md"
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ActionCell,
  },
];