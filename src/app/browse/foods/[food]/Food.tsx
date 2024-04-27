'use client'

import Link from 'next/link'
import { capitalize, orderBy, countBy, toPairs } from 'lodash'
import { ExternalLink } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { Collapsible, CollapsibleContent } from '@radix-ui/react-collapsible'

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import { BrowseCollapsibleTrigger } from '../../BrowseCollapsibleTrigger'
import { FoodRecord } from '../../../types'

type Props = {
	foodItem: string | null
	allFoodRecords: FoodRecord[]
}

export function Food({ foodItem, allFoodRecords }: Props) {
	const indentClass = 'ml-5 sm:ml-8'
	const capitalizedFoodItem = capitalize(foodItem ?? '')
	const countries = orderBy(
		Array.from(
			new Set(
				allFoodRecords
					.filter((foodRecord) => foodRecord.foodItem === foodItem)
					.map((foodRecord) => foodRecord.country)
			)
		)
	).sort()
	const goesWellWithRecords = allFoodRecords.filter(
		(fr) => fr.foodItem !== foodItem && countries.includes(fr.country)
	)
	const goesWellWithCounts = countBy(goesWellWithRecords, 'foodItem')
	let goesWellWith = toPairs(goesWellWithCounts).map(([food, count]) => ({
		food,
		count,
	}))
	if (goesWellWith[0]?.count === 1) {
		goesWellWith = []
	} else {
		goesWellWith = orderBy(goesWellWith, 'count', 'desc').slice(0, 5)
	}
	const categories = Array.from(
		new Set(allFoodRecords.map((fr) => fr.category))
	).sort()
	allFoodRecords = orderBy(allFoodRecords, 'foodItem')
	return (
		<div className="space-y-5">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/browse">Browse</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/browse/foods">Foods</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{capitalizedFoodItem}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<header>
				<h1 className="text-2xl">{capitalizedFoodItem}</h1>
				<Button asChild variant="link" className="p-0 h-auto">
					<a
						href={`https://google.com/search?q=${foodItem}`}
						target="_blank"
					>
						Search Google for {capitalizedFoodItem}{' '}
						<ExternalLink className="ml-1" />
					</a>
				</Button>
			</header>
			{goesWellWith.length > 0 ? (
				<div>
					<h2 className="text-lg mb-1">Commonly used with</h2>
					<ul className="list-disc ml-4">
						{goesWellWith.map((gww) => (
							<li key={gww.food}>
								<Link href={`/browse/foods/${gww.food}`}>
									<Button variant="browse" size="browse">
										{capitalize(gww.food)} ({gww.count}{' '}
										regions)
									</Button>
								</Link>
							</li>
						))}
					</ul>
				</div>
			) : null}
			<div>
				<h2 className="text-lg mb-1">
					Regions that include {foodItem} in their cuisine
				</h2>
				<div>
					{countries.map((c) => (
						<Collapsible key={`${foodItem}${c}`}>
							<BrowseCollapsibleTrigger isCountry>
								{c}
							</BrowseCollapsibleTrigger>
							<CollapsibleContent>
								<ul>
									<li className={indentClass}>
										{categories.map((category) => (
											<Collapsible
												key={`${foodItem}${category}`}
												defaultOpen={true}
											>
												<BrowseCollapsibleTrigger>
													{category}
												</BrowseCollapsibleTrigger>
												<CollapsibleContent>
													<ul key={category}>
														{allFoodRecords
															.filter(
																(fi) =>
																	fi.country ===
																		c &&
																	fi.category ===
																		category
															)
															.map(
																({
																	foodItem,
																}) => (
																	<li
																		key={
																			foodItem
																		}
																		className={
																			indentClass
																		}
																	>
																		<Link
																			href={`/browse/foods/${foodItem}`}
																		>
																			<Button
																				variant="browse"
																				size="browse"
																			>
																				{capitalize(
																					foodItem
																				)}
																			</Button>
																		</Link>
																	</li>
																)
															)}
													</ul>
												</CollapsibleContent>
											</Collapsible>
										))}
									</li>
								</ul>
							</CollapsibleContent>
						</Collapsible>
					))}
				</div>
			</div>
		</div>
	)
}
