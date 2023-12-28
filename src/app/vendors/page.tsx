import MaxWidthWrapper from '../../components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'
import { VENDOR_CATEGORIES } from '../../config'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react'

import { getServerSideUser } from '@/lib/payload-utils'
import { cookies } from 'next/headers'

type Param = string | string[] | undefined

interface ProductsPageProps {
  searchParams: { [key: string]: Param }
}

const parse = (param: Param) => {
  return typeof param === 'string' ? param : undefined
}

const ProductsPage = async ({
  searchParams,
}: ProductsPageProps) => {
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  const sort = parse(searchParams.sort)
  const category = parse(searchParams.category)

  const label = VENDOR_CATEGORIES.find(
    ({ value }) => value === category
  )?.label

  return (
    <MaxWidthWrapper>
      {/* <div className='mt-10 flex justify-end'>
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc"><p className='flex flex-row gap-3'><span><ArrowUpAZ className='w-5 h-5'/></span>Ascending</p></SelectItem>
            <SelectItem value="desc"><p className='flex flex-row gap-3'><span><ArrowDownAZ className='w-5 h-5'/></span>Descending</p></SelectItem>
          </SelectContent>
        </Select>
      </div> */}

      <ProductReel
        title={label ?? 'Vendors'}
        href='#'
        user={user?.id}
        query={{
          category,
          limit: 40,
          sort:
            sort === 'desc' || sort === 'asc'
              ? sort
              : undefined,
        }}
      />
    </MaxWidthWrapper>
  )
}

export default ProductsPage
