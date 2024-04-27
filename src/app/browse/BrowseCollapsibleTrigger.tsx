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
		<div className="flex w-100 place-items-center">
			<CollapsibleTrigger asChild>
				<Button variant="browse" size="browse">
					{children} <ChevronsUpDown />{' '}
				</Button>
			</CollapsibleTrigger>
			{isCountry ? (
				<Button
					variant="browse"
					size="browse"
					className="px-1 h-6 w-6"
					asChild
				>
					<Link href={`/browse/regions/${children}`}>
						<Search />
					</Link>
				</Button>
			) : null}
		</div>
	)
}
