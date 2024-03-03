import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@radix-ui/react-collapsible'
import { capitalize, sortBy } from 'lodash'
import mixpanel from 'mixpanel-browser'
import { Button } from '@/components/ui/button'
import { Data } from './types'
import { ChevronsUpDown } from 'lucide-react'

export function BrowseButton({ children, ...props }) {
	return (
		<Button
			variant="browse"
			size="browse"
			className="text-xl"
			onClick={() => {
				mixpanel.track('Click Browse Item', {
					Item: children,
					Screen: 'Browse',
				})
			}}
			{...props}
		>
			{children}
		</Button>
	)
}

export function BrowseCollapsibleTrigger({ children }) {
	return (
		<CollapsibleTrigger className="flex w-100" asChild>
			<BrowseButton>
				{children} <ChevronsUpDown />
			</BrowseButton>
		</CollapsibleTrigger>
	)
}

type Props = {
	data: Data
	setWhatGoesWithItem: (foodItem: string) => void
}

export default function Browse({ data, setWhatGoesWithItem }: Props) {
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
												<BrowseCollapsibleTrigger>
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
																					<BrowseButton
																						onClick={() => {
																							setWhatGoesWithItem(
																								foodItem
																							)
																						}}
																					>
																						{capitalize(
																							foodItem
																						)}
																					</BrowseButton>
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
																		<BrowseButton
																			onClick={() => {
																				setWhatGoesWithItem(
																					foodItem
																				)
																			}}
																		>
																			{capitalize(
																				foodItem
																			)}
																		</BrowseButton>
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
