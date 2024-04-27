import { Data } from './types'

export function flatData(data: Data) {
	return Object.keys(data).flatMap((category) =>
		Object.keys(data[category]).flatMap((continent) =>
			Object.keys(data[category][continent]).flatMap((country) =>
				category === 'Acid'
					? Object.keys(data[category][continent][country]).flatMap(
							(type) =>
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
	)
}
