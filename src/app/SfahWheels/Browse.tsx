import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@radix-ui/react-collapsible'
import { capitalize, sortBy } from 'lodash'
import { Button } from '@/components/ui/button'
import { Data } from './types'

function ChevronIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
			className="w-4 h-4"
		>
			<path
				fill-rule="evenodd"
				d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
				clip-rule="evenodd"
			/>
		</svg>
	)
}

export function BrowseButton(props) {
	return (
		<Button
			{...props}
			variant="ghost"
			className="font-normal h-auto text-xl py-0 px-2 text-left"
		></Button>
	)
}

export function BrowseCollapsibleTrigger({ children, ...props }) {
	return (
		<CollapsibleTrigger className="flex w-100" asChild {...props}>
			<BrowseButton>
				{children} <ChevronIcon />
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
