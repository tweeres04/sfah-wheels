import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import yaml from 'js-yaml'

import Search from './Search'
import { flatData } from './flatData'

type Props = {
	searchParams: Record<string, string>
}

export default async function Home({ searchParams }: Props) {
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

	return <Search flatData={flatData_} initialSearchParams={searchParams} />
}
