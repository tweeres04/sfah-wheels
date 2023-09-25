import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@radix-ui/react-collapsible'
import { capitalize, sortBy } from 'lodash'

export default function Browse({ data }) {
	const indentClass = 'ml-10'
	return (
		<>
			{sortBy(Object.keys(data)).map((category) => (
				<Collapsible key={category}>
					<CollapsibleTrigger>{category}</CollapsibleTrigger>
					<CollapsibleContent>
						{sortBy(Object.keys(data[category])).map(
							(continent) => (
								<Collapsible
									className={indentClass}
									key={`${category}${continent}`}
								>
									<CollapsibleTrigger>
										{continent}
									</CollapsibleTrigger>
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
												<CollapsibleTrigger>
													{country}
												</CollapsibleTrigger>
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
																	<CollapsibleTrigger>
																		{
																			acidType
																		}{' '}
																		Acid
																	</CollapsibleTrigger>
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
																					{capitalize(
																						foodItem
																					)}
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
																		{capitalize(
																			foodItem
																		)}
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
		</>
	)
}
