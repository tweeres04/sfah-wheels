export type Category = 'Fat' | 'Flavour' | 'Cooking Acid' | 'Finishing Acid'
export type Continent =
	| 'Europe'
	| 'North America'
	| 'South America'
	| 'Asia'
	| 'Africa'
export type Country =
	| 'Greece & Cyprus'
	| 'Scandinavia'
	| 'Eastern Europe'
	| 'Germany'
	| 'Spain'
	| 'Italy'
	| 'France'
	| 'United Kingdom'
	| 'USA & Canada'
	| 'Mexico'
	| 'Central America'
	| 'Caribbean'
	| 'Argentina & Uruguay'
	| 'Chile, Peru & Bolivia'
	| 'Brazil'
	| 'China'
	| 'Japan'
	| 'Korea'
	| 'Thailand'
	| 'Vietnam'
	| 'India'
	| 'Iran'
	| 'Mediterranean'
	| 'West Africa'
	| 'North Africa'
	| 'Horn of Africa'
export type FoodRecord = {
	category: Category
	continent: Continent
	country: Country
	foodItem: string
}

export type DataCategory = 'Acid' | 'Fat' | 'Flavour'
export type AcidType = 'Cooking' | 'Finishing'
export type Data = Record<
	DataCategory,
	Record<Continent, Record<Country, Record<AcidType, string> | string>>
>
