'use client'

import Link from 'next/link'
import { CollapsibleTrigger } from '@radix-ui/react-collapsible'
import { Button } from '@/components/ui/button'
import { ChevronsUpDown, Search } from 'lucide-react'

type BCTProps = {
	isCountry?: boolean
	setGoesWithCountry?: (country: string | null) => void
	children: string
}

export function BrowseCollapsibleTrigger({
	isCountry = false,
	children,
}: BCTProps) {
	return (
		<CollapsibleTrigger className="flex w-100 place-items-center">
			<Button variant="browse" size="browse">
				{children} <ChevronsUpDown />{' '}
			</Button>
			{isCountry ? (
				<Link href={`/browse/regions/${children}`}>
					<Button variant="browse" size="browse" className="p-1">
						<Search className="w-4 h-4" />
					</Button>
				</Link>
			) : null}
		</CollapsibleTrigger>
	)
}
