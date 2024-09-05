'use client'

import Link from 'next/link'
import { Collapsible, CollapsibleContent } from '@radix-ui/react-collapsible'
import { capitalize, sortBy, kebabCase } from 'lodash'
import { Data } from '../types'
import { Button } from '@/components/ui/button'
import { BrowseCollapsibleTrigger } from './BrowseCollapsibleTrigger'

type Props = {
	data: Data
}

export default function Browse({ data }: Props) {
	const indentClass = 'ml-8'
	return (
		<div>
			{sortBy(Object.keys(data)).map((category) => (
				<Collapsible key={category}>
					<BrowseCollapsibleTrigger>
						{category}
					</BrowseCollapsibleTrigger>
					<CollapsibleContent>
						{sortBy(Object.keys(data[category])).map(
							(continent) => (
								<Collapsible
									className={indentClass}
									key={`${category}${continent}`}
								>
									<BrowseCollapsibleTrigger>
										{continent}
									</BrowseCollapsibleTrigger>
									<CollapsibleContent>
										{sortBy(
											Object.keys(
												data[category][continent]
											)
										).map((country) => (
											<Collapsible
												className={indentClass}
												key={`${category}${continent}${country}`}
											>
												<BrowseCollapsibleTrigger
													isCountry
												>
													{country}
												</BrowseCollapsibleTrigger>
												<CollapsibleContent>
													{category === 'Acid'
														? sortBy(
																Object.keys(
																	data[
																		category
																	][
																		continent
																	][country]
																)
														  ).map((acidType) => (
																<Collapsible
																	key={`${category}${continent}${country}${acidType}`}
																	className={
																		indentClass
																	}
																>
																	<BrowseCollapsibleTrigger>
																		{
																			acidType
																		}{' '}
																		Acid{' '}
																	</BrowseCollapsibleTrigger>
																	<CollapsibleContent>
																		{data[
																			category
																		][
																			continent
																		][
																			country
																		][
																			acidType
																		].map(
																			(
																				foodItem
																			) => (
																				<div
																					className={
																						indentClass
																					}
																					key={`${category}${continent}${country}${foodItem}`}
																				>
																					<Link
																						href={`/browse/foods/${kebabCase(
																							foodItem
																						)}`}
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
																				</div>
																			)
																		)}
																	</CollapsibleContent>
																</Collapsible>
														  ))
														: data[category][
																continent
														  ][country].map(
																(foodItem) => (
																	<div
																		className={
																			indentClass
																		}
																		key={`${category}${continent}${country}${foodItem}`}
																	>
																		<Link
																			href={`/browse/foods/${kebabCase(
																				foodItem
																			)}`}
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
																	</div>
																)
														  )}
												</CollapsibleContent>
											</Collapsible>
										))}
									</CollapsibleContent>
								</Collapsible>
							)
						)}
					</CollapsibleContent>
				</Collapsible>
			))}
		</div>
	)
}
