import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import yaml from 'js-yaml'

import Browse from './Browse'
import { Metadata } from 'next'

const title = 'Browse - SFAH Wheels'
const description =
	'Browse by category and region to find ingredients that go well together'
const url = 'https://sfah-wheels.tweeres.ca/browse'

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

export default async function BrowsePage() {
	const dataString = await readFile(
		join(process.cwd(), 'src', 'data.yml'),
		'utf8'
	)
	const data = yaml.load(dataString)

	return <Browse data={data} />
}
