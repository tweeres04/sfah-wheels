import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import yaml from 'js-yaml'

import SearchComponent from './Search'
import { flatData } from './flatData'
import { Metadata } from 'next'

const title = 'Search - What Goes With'
const description =
	'Search a category, region, or ingredient to find the right ingredient for your dish'
const url = 'https://whatgoeswith.tweeres.com'

export const metadata: Metadata = {
	title,
	description,
	alternates: {
		canonical: url,
	},
	openGraph: {
		title,
		description,
		url,
		siteName: 'What Goes With',
		locale: 'en_US',
		type: 'website',
	},
}

type Props = {
	searchParams: Record<string, string>
}

export default async function Search({ searchParams }: Props) {
	const dataPromise = readFile(join(process.cwd(), 'src', 'data.yml'), 'utf8')
	const adjectivesPromise = readFile(
		join(process.cwd(), 'src', 'region_adjectives.yml'),
		'utf8'
	)
	let [data, adjectivesData] = await Promise.all([
		dataPromise,
		adjectivesPromise,
	])
	data = yaml.load(data)
	adjectivesData = yaml.load(adjectivesData)
	const flatData_ = flatData(data)

	return (
		<SearchComponent
			flatData={flatData_}
			initialSearchParams={searchParams}
		/>
	)
}
