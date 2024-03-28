'use client'

import { ReactNode, useRef } from 'react'
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

export function BrowseCollapsibleTrigger({
	children,
}: {
	children: ReactNode
}) {
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
	country: string | null
	allFoodRecords: FoodRecord[]
	setWhatGoesWithItem: (whatGoesWithItem: string | null) => void
	setWhatGoesWithCountry: (whatGoesWithCountry: string | null) => void
}

export default function WhatGoesWithCountry({
	country,
	allFoodRecords,
	setWhatGoesWithItem,
	setWhatGoesWithCountry,
}: Props) {
	const scrollContainerRef = useRef<HTMLDivElement>(null)
	const indentClass = 'ml-5 sm:ml-8'

	const categories = Array.from(
		new Set(allFoodRecords.map((fr) => fr.category))
	).sort()
	allFoodRecords = orderBy(allFoodRecords, 'foodItem')
	return (
		<Sheet
			open={Boolean(country)}
			onOpenChange={() => setWhatGoesWithCountry(null)}
		>
			<SheetContent
				className="overflow-y-auto space-y-3"
				ref={scrollContainerRef}
			>
				<SheetHeader>
					<SheetTitle>{country}</SheetTitle>
					<SheetDescription>
						<p>
							<Button
								asChild
								variant="link"
								className="p-0 h-auto"
							>
								<a
									href={`https://google.com/search?q=${country} cuisine`}
									target="_blank"
								>
									Search Google for {country} cuisine
									<ExternalLink className="ml-1" />
								</a>
							</Button>
						</p>
					</SheetDescription>
				</SheetHeader>
				<div>
					<h2 className="text-lg mb-1">
						Ingredients used in {country}
					</h2>
					<div>
						<ul>
							<li>
								{categories.map((category) => (
									<Collapsible
										key={`${country}${category}`}
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
																country &&
															fi.category ===
																category
													)
													.map(({ foodItem }) => (
														<li
															key={foodItem}
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
													))}
											</ul>
										</CollapsibleContent>
									</Collapsible>
								))}
							</li>
						</ul>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}
