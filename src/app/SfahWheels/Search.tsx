'use client'

import { useMemo, useState } from 'react'
import { capitalize, sortBy } from 'lodash'

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

type Props = {
	flatData: FoodRecord[]
	setWhatGoesWithItem: (foodItem: string | null) => void
}

export default function Search({ flatData, setWhatGoesWithItem }: Props) {
	const [search, setSearch] = useState('')

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
									<Button
										className="h-auto px-2 py-0 text-left"
										variant="ghost"
										onClick={() => {
											setWhatGoesWithItem(foodItem)
										}}
									>
										{capitalize(foodItem)}
									</Button>
								</TableCell>
								<TableCell>{category}</TableCell>
								<TableCell>{country}</TableCell>
							</TableRow>
						)
					)}
				</TableBody>
			</Table>
		</>
	)
}
