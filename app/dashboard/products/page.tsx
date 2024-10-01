import { db } from "@/server"
import placeholder from '@/public/placeholder.svg'
import { DataTable } from "./data-table"
import { columns } from "./columns"

export default async function Products() {
  const products = await db.query.products.findMany({
    orderBy: (products, {desc}) => [desc(products.id)],
  })
  if(!products) throw new Error('No products found')


    const dataTable = products.map((product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        variants: [],
        image: placeholder.src,
      }
    })

    if(!dataTable) throw new Error('No data found')
  return (
    <DataTable columns={columns} data={dataTable} />
  )
}
