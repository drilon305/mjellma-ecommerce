import ProductType from "@/components/products/product-type";
import { db } from "@/server"
import { productVariants } from "@/server/schema";
import { eq } from "drizzle-orm";


export async function generateStatisParams() {
    const data = await db.query.productVariants.findMany({
        with: {
          variantImages: true,
          variantTags: true,
          product: true,
        },
        orderBy: (productVariants, {desc}) => [desc(productVariants.id)]
      })
      if(data) {
      const slugID = data.map((variant) => ({ slug: variant.id.toString()}))
      return slugID;
      }
      return []
}

export default  async function Page({ params } : { params: { slug: string}}) {

    const variant = await db.query.productVariants.findFirst({
        where: eq(productVariants.id, Number(params.slug)),
        with: {
            product: {
                with: {
                    productVariants: {
                        with: { variantImages: true, variantTags: true}
                    }
                }
            }
        }
    })

    if(variant) {
    return (
        <main>
               <section>
                <div className="flex-1">
                <h1>images</h1>
                </div>
                <div className="flex flex-1 gap-2 flex-col">
            <h2>{variant?.product.title}</h2>
            <div>
                <ProductType variants={variant.product.productVariants}/>
            </div>
                </div>
               </section>
        </main>
    )
}
}