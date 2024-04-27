'use client'

import Link from 'next/link'
import { capitalize, orderBy } from 'lodash'
import { ExternalLink } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { Collapsible, CollapsibleContent } from '@radix-ui/react-collapsible'

import { BrowseCollapsibleTrigger } from '../../BrowseCollapsibleTrigger'
import { FoodRecord } from '../../../types'

type Props = {
	adjectivesData: Record<string, string>
	region: string
	allFoodRecords: FoodRecord[]
}

export default function Region({
	adjectivesData,
	region,
	allFoodRecords,
}: Props) {
	const indentClass = 'ml-5 sm:ml-8'

	const categories = Array.from(
		new Set(allFoodRecords.map((fr) => fr.category))
	).sort()
	allFoodRecords = orderBy(allFoodRecords, 'foodItem')
	return (
		<>
			<header>
				<h1 className="text-2xl">{region}</h1>
				<Button asChild variant="link" className="p-0 h-auto">
					<a
						href={`https://google.com/search?q=${encodeURIComponent(
							adjectivesData[region]
						)} cuisine`}
						target="_blank"
					>
						Search Google for {adjectivesData[region]} cuisine
						<ExternalLink className="ml-1" />
					</a>
				</Button>
			</header>
			<div>
				<h2 className="text-lg mb-1">Ingredients used in {region}</h2>
				<div>
					<ul>
						<li>
							{categories.map((category) => (
								<Collapsible
									key={`${region}${category}`}
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
														fi.country === region &&
														fi.category === category
												)
												.map(({ foodItem }) => (
													<li
														key={foodItem}
														className={indentClass}
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
												))}
										</ul>
									</CollapsibleContent>
								</Collapsible>
							))}
						</li>
					</ul>
				</div>
			</div>
		</>
	)
}
