import { notFound } from 'next/navigation'
import { readFile } from 'fs/promises'
import { join } from 'path'
import yaml from 'js-yaml'
import { flatData } from '../../../flatData'
import RegionComponent from './Region'
import { Metadata } from 'next'

type GmProps = {
	params: {
		region: string
	}
}

export function generateMetadata({ params: { region } }: GmProps): Metadata {
	const decodedRegion = decodeURIComponent(region)
	const title = `${decodedRegion} - What Goes With`
	const description = `Find ingredients that are used in ${decodedRegion}`
	const url = `https://whatgoeswith.tweeres.com/browse/regions/${decodedRegion}`

	return {
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
}

export async function generateStaticParams() {
	const fileData = await readFile(
		join(process.cwd(), 'src', 'data.yml'),
		'utf8'
	)
	const data = yaml.load(fileData)

	const flatData_ = flatData(data)

	const uniqueRegions = Array.from(new Set(flatData_.map((fd) => fd.country)))

	return uniqueRegions.map((ur) => ({ region: ur }))
}

type Props = {
	params: {
		region: string
	}
}

export default async function Region({ params: { region } }: Props) {
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

	region = decodeURIComponent(region)

	const foodData = flatData_.find((d) => d.country === region)

	if (!foodData) {
		notFound()
	}

	return (
		<RegionComponent
			allFoodRecords={flatData_}
			adjectivesData={adjectivesData}
			region={region}
		/>
	)
}
