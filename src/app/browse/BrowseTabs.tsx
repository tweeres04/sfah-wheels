'use client'

import Link from 'next/link'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePathname } from 'next/navigation'

export default function BrowseTabs() {
	const pathname = usePathname()
	const secondPartOfPathname = pathname.split('/')[2] ?? ''
	return (
		<Tabs value={secondPartOfPathname}>
			<TabsList className="w-full grid grid-cols-3">
				<TabsTrigger value="" asChild>
					<Link href="/browse">By category</Link>
				</TabsTrigger>
				<TabsTrigger value="foods" asChild>
					<Link href="/browse/foods">By food</Link>
				</TabsTrigger>
				<TabsTrigger value="regions" asChild>
					<Link href="/browse/regions">By region</Link>
				</TabsTrigger>
			</TabsList>
		</Tabs>
	)
}
