'use client'

import { useMemo, useState } from 'react'
import { sortBy, capitalize } from 'lodash'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

export default function Search({ data }) {
	const [search, setSearch] = useState('')

	const flatData = useMemo(
		() =>
			Object.keys(data).flatMap((category) =>
				Object.keys(data[category]).flatMap((continent) =>
					Object.keys(data[category][continent]).flatMap((country) =>
						category === 'Acid'
							? Object.keys(
									data[category][continent][country]
							  ).flatMap((type) =>
									data[category][continent][country][
										type
									].flatMap((foodItem) => ({
										category: `${type} Acid`,
										continent,
										country,
										type,
										foodItem,
									}))
							  )
							: data[category][continent][country].flatMap(
									(foodItem) => ({
										category,
										continent,
										country,
										foodItem,
									})
							  )
					)
				)
			),
		[data]
	)

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
		() =>
			sortBy(visibleData, [
				'foodItem',
				'category',
				'country',
				'continent',
			]),
		[visibleData]
	)
	return (
		<>
			<div>
				<Label htmlFor="search">Search</Label>
				<Input
					id="search"
					onChange={(event) => {
						setSearch(event.target.value)
					}}
				/>
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
						<TableHead>Continent</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{sortedVisibleData.map(
						({ category, continent, country, foodItem }) => (
							<TableRow
								key={`${category}${continent}${country}${foodItem}`}
							>
								<TableCell>{capitalize(foodItem)}</TableCell>
								<TableCell>{category}</TableCell>
								<TableCell>{country}</TableCell>
								<TableCell>{continent}</TableCell>
							</TableRow>
						)
					)}
				</TableBody>
			</Table>
		</>
	)
}
