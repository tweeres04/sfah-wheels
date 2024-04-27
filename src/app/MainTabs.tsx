'use client'

import Link from 'next/link'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePathname } from 'next/navigation'

export default function MainTabs() {
	const pathname = usePathname()
	const firstPartOfPathname = pathname.split('/')[1]
	return (
		<Tabs value={firstPartOfPathname}>
			<TabsList className="w-full grid grid-cols-2">
				<TabsTrigger value="" asChild>
					<Link href="/">Search</Link>
				</TabsTrigger>
				<TabsTrigger value="browse" asChild>
					<Link href="/browse">Browse</Link>
				</TabsTrigger>
			</TabsList>
		</Tabs>
	)
}
