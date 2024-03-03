'use client'

import { capitalize } from 'lodash'
import { Button } from '@/components/ui/button'

import { Collapsible, CollapsibleContent } from '@radix-ui/react-collapsible'

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'

import { FoodRecord } from './types'
import { BrowseCollapsibleTrigger } from './Browse'

type Props = {
	foodItem: string | null
	allFoodRecords: FoodRecord[]
	setWhatGoesWithItem: (whatGoesWithItem: null) => void
}

export default function WhatGoesWith({
	foodItem,
	allFoodRecords,
	setWhatGoesWithItem,
}: Props) {
	const indentClass = 'ml-5 sm:ml-8'
	const capitalizedFoodItem = capitalize(foodItem ?? '')
	const countries = Array.from(
		new Set(
			allFoodRecords
				.filter((foodRecord) => foodRecord.foodItem === foodItem)
				.map((foodRecord) => foodRecord.country)
		)
	)
	const categories = Array.from(
		new Set(allFoodRecords.map((fr) => fr.category))
	)
	return (
		<Sheet open={!!foodItem} onOpenChange={() => setWhatGoesWithItem(null)}>
			<SheetContent className="overflow-y-auto space-y-3">
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
									Search Google for {capitalizedFoodItem}
								</a>
							</Button>
						</p>
					</SheetDescription>
				</SheetHeader>
				<h2>Countries and their ingredients that include {foodItem}</h2>
				<div>
					{countries.map((c) => (
						<Collapsible key={c}>
							<BrowseCollapsibleTrigger>
								{c}
							</BrowseCollapsibleTrigger>
							<CollapsibleContent>
								<ul>
									<li className={indentClass}>
										{categories.map((category) => (
											<Collapsible
												key={category}
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
																		{capitalize(
																			foodItem
																		)}
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
			</SheetContent>
		</Sheet>
	)
}