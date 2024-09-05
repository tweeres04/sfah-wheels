'use client'

import { useMemo, useState } from 'react'
import { capitalize, sortBy, debounce, kebabCase } from 'lodash'
import { useRouter } from 'next/navigation'
import mixpanel from 'mixpanel-browser'
import Link from 'next/link'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import { FoodRecord } from './types'

const logSearchToMixpanel = debounce((query) => {
	mixpanel.track('Search', {
		Query: query,
	})
}, 1000)

function useSearch(initialSearchParams: Record<string, string>) {
	const router = useRouter()
	const [search, baseSetSearch] = useState(() => {
		const searchParams = new URLSearchParams(initialSearchParams)
		const searchQuery = searchParams.get('q')

		return searchQuery ?? ''
	})

	function setSearch(newValue: string) {
		logSearchToMixpanel(newValue)
		baseSetSearch(newValue)

		const searchParams = new URLSearchParams(window.location.search)
		if (newValue !== '') {
			searchParams.set('q', newValue)
		} else {
			searchParams.delete('q')
		}

		const newUrl = new URL(window.location.href)
		newUrl.search = searchParams.toString()

		router.replace(newUrl.href)
	}

	return { search, setSearch }
}

type Props = {
	flatData: FoodRecord[]
	initialSearchParams: Record<string, string>
}

export default function Search({ flatData, initialSearchParams }: Props) {
	const { search, setSearch } = useSearch(initialSearchParams)
	const visibleData = useMemo(() => {
		const searchTerms = search.split(' ')
		return flatData.filter(({ category, continent, country, foodItem }) =>
			searchTerms.every(
				(searchTerm) =>
					category.toLowerCase().includes(searchTerm.toLowerCase()) ||
					continent
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					country.toLowerCase().includes(searchTerm.toLowerCase()) ||
					foodItem.toLowerCase().includes(searchTerm.toLowerCase())
			)
		)
	}, [flatData, search])

	const sortedVisibleData = useMemo(
		() => sortBy(visibleData, ['foodItem', 'category', 'country']),
		[visibleData]
	)
	return (
		<>
			<div>
				<Label htmlFor="search">Search</Label>
				<div className="flex gap-1">
					<Input
						id="search"
						onChange={(event) => {
							setSearch(event.target.value)
						}}
						className="flex-grow"
						value={search}
					/>{' '}
					<Button
						variant="outline"
						onClick={() => {
							mixpanel.track('Clear Search')
							setSearch('')
						}}
						disabled={search.length === 0}
					>
						Clear
					</Button>
				</div>
			</div>
			<Table className={search === '' ? 'hidden' : undefined}>
				<TableCaption>
					Ingredients from{' '}
					<a
						className="italic"
						href="https://www.saltfatacidheat.com/"
					>
						Salt Fat Acid Heat
					</a>
					&apos;s world wheels
				</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Food Item</TableHead>
						<TableHead>Category</TableHead>
						<TableHead>Region</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{sortedVisibleData.map(
						({ category, continent, country, foodItem }) => (
							<TableRow
								key={`${category}${continent}${country}${foodItem}`}
							>
								<TableCell>
									<Link
										href={`/browse/foods/${kebabCase(
											foodItem
										)}`}
									>
										<Button
											className="h-auto px-2 py-0 text-left"
											variant="ghost"
										>
											{capitalize(foodItem)}
										</Button>
									</Link>
								</TableCell>
								<TableCell>{category}</TableCell>
								<TableCell>
									<Link
										href={`/browse/regions/${kebabCase(
											country
										)}`}
									>
										<Button
											className="h-auto px-2 py-0 text-left"
											variant="ghost"
										>
											{country}
										</Button>
									</Link>
								</TableCell>
							</TableRow>
						)
					)}
				</TableBody>
			</Table>
		</>
	)
}
