'use client'

import { VariantsWithProduct } from "@/lib/infer-type"
import Image from "next/image"
import Link from "next/link"


type ProductTypes = {
  variants: VariantsWithProduct[];
};

export default function Products({ variants }: ProductTypes) {
  return (
    <main className="grid">
      {variants.map((variant) => (
        <Link
          key={variant.id}
          href={`/products/${variant.id}?id=${variant.id}&productID=${variant.productID}&price=${variant.product.price}&title=${variant.product.title}&type=${variant.productType}&image=${variant.variantImages[0].url}`}
        >
          <Image
            className="rounded-md"
            src={variant.variantImages[0].url}
            width={720}
            height={480}
            alt={variant.product.title}
            loading="lazy"
          />
          <div className="flex justify-between">
            <div>
                <h2>{variant.product.title}</h2>
                <p>{variant.productType}</p>
            </div>
          </div>
        </Link>
      ))}
    </main>
  );
}