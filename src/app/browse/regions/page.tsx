import { readFile } from 'fs/promises'
import { join } from 'path'
import yaml from 'js-yaml'
import { flatData } from '@/app/flatData'
import Link from 'next/link'
import { orderBy } from 'lodash'
import { Metadata } from 'next'

const title = 'Browse by region - What Goes With'
const description = 'Find ingredients that are used in a region'
const url = 'https://whatgoeswith.tweeres.com/browse/regions'

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
		siteName: title,
		locale: 'en_US',
		type: 'website',
	},
}

export default async function Regions() {
	const fileData = await readFile(
		join(process.cwd(), 'src', 'data.yml'),
		'utf8'
	)
	const data = yaml.load(fileData)

	const flatData_ = flatData(data)

	const allRegions = Array.from(new Set(flatData_.map((fd) => fd.country)))

	const allRegionsSorted = orderBy(allRegions)

	return (
		<ul className="grid sm:grid-cols-2 lg:grid-cols-3">
			{allRegionsSorted.map((r) => (
				<li key={r}>
					<Link href={`/browse/regions/${r}`}>{r}</Link>
				</li>
			))}
		</ul>
	)
}
