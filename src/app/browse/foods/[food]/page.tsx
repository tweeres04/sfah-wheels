import { notFound } from 'next/navigation'
import { readFile } from 'fs/promises'
import { join } from 'path'
import yaml from 'js-yaml'
import { flatData } from '../../../flatData'
import { Food as FoodComponent } from './Food'
import { Metadata } from 'next'
import { capitalize } from 'lodash'

type GmProps = {
	params: {
		food: string
	}
}

export function generateMetaData({ params: { food } }: GmProps): Metadata {
	const capitalizedFood = capitalize(food)
	const title = `${capitalizedFood} - SFAH Wheels`
	const description = `Find ingredients that go with ${food}`
	const url = `https://sfah-wheels.tweeres.ca/browse/foods/${food}`

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

	const uniqueFoods = Array.from(new Set(flatData_.map((fd) => fd.foodItem)))

	return uniqueFoods.map((uf) => ({ food: uf }))
}

type Props = {
	params: {
		food: string
	}
}

export default async function Food({ params: { food } }: Props) {
	const fileData = await readFile(
		join(process.cwd(), 'src', 'data.yml'),
		'utf8'
	)
	const data = yaml.load(fileData)

	const flatData_ = flatData(data)

	food = decodeURIComponent(food)

	const foodData = flatData_.find((d) => d.foodItem === food)

	if (!foodData) {
		notFound()
	}

	return <FoodComponent allFoodRecords={flatData_} foodItem={food} />
}
