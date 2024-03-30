'use client'

import { useRef } from 'react'
import { capitalize, orderBy, countBy, toPairs } from 'lodash'
import { ExternalLink, ChevronsUpDown } from 'lucide-react'
import mixpanel from 'mixpanel-browser'

import { Button } from '@/components/ui/button'

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@radix-ui/react-collapsible'

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'

import { FoodRecord } from './types'

export function BrowseCollapsibleTrigger({ children }) {
	return (
		<CollapsibleTrigger className="flex w-100" asChild>
			<Button
				variant="browse"
				size="browse"
				onClick={() => {
					mixpanel.track('Click Browse Item', {
						Item: children,
						Screen: 'What Goes With',
					})
				}}
			>
				{children} <ChevronsUpDown />
			</Button>
		</CollapsibleTrigger>
	)
}

type Props = {
	foodItem: string | null
	allFoodRecords: FoodRecord[]
	setWhatGoesWithItem: (whatGoesWithItem: string | null) => void
}

export default function WhatGoesWith({
	foodItem,
	allFoodRecords,
	setWhatGoesWithItem,
}: Props) {
	const scrollContainerRef = useRef<HTMLDivElement>(null)
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
		<Sheet
			open={Boolean(foodItem)}
			onOpenChange={() => setWhatGoesWithItem(null)}
		>
			<SheetContent
				className="overflow-y-auto space-y-3"
				ref={scrollContainerRef}
			>
				<SheetHeader>
					<SheetTitle>{capitalizedFoodItem}</SheetTitle>
					<SheetDescription>
						<p>
							<Button
								asChild
								variant="link"
								className="p-0 h-auto"
							>
								<a
									href={`https://google.com/search?q=${foodItem}`}
									target="_blank"
								>
									Search Google for {capitalizedFoodItem}{' '}
									<ExternalLink className="ml-1" />
								</a>
							</Button>
						</p>
					</SheetDescription>
				</SheetHeader>
				{goesWellWith.length > 0 ? (
					<div>
						<h2 className="text-lg mb-1">Commonly used with</h2>
						<ul className="list-disc ml-4">
							{goesWellWith.map((gww) => (
								<li key={gww.food}>
									<Button
										variant="browse"
										size="browse"
										onClick={() => {
											setWhatGoesWithItem(gww.food)
											scrollContainerRef.current?.scroll(
												0,
												0
											)
										}}
									>
										{capitalize(gww.food)} ({gww.count}{' '}
										regions)
									</Button>
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
								<BrowseCollapsibleTrigger>
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
																			<Button
																				variant="browse"
																				size="browse"
																				onClick={() => {
																					setWhatGoesWithItem(
																						foodItem
																					)
																					scrollContainerRef.current?.scroll(
																						0,
																						0
																					)
																				}}
																			>
																				{capitalize(
																					foodItem
																				)}
																			</Button>
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
			</SheetContent>
		</Sheet>
	)
}
