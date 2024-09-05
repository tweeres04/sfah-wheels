import { notFound } from 'next/navigation'
import { readFile } from 'fs/promises'
import { join } from 'path'
import yaml from 'js-yaml'
import { flatData } from '../../../flatData'
import { Food as FoodComponent } from './Food'
import { Metadata } from 'next'
import { capitalize, kebabCase } from 'lodash'

type GmProps = {
	params: {
		food: string
	}
}

export async function generateMetadata({
	params: { food },
}: GmProps): Metadata {
	const fileData = await readFile(
		join(process.cwd(), 'src', 'data.yml'),
		'utf8'
	)
	const data = yaml.load(fileData)

	const flatData_ = flatData(data)

	const foodData = flatData_.find((d) => kebabCase(d.foodItem) === food)

	if (!foodData) {
		notFound()
	}

	const humanFood = foodData.foodItem

	const capitalizedFood = capitalize(humanFood)
	const title = `${capitalizedFood} - What Goes With`
	const description = `Find ingredients that go with ${humanFood}`
	const url = `https://whatgoeswith.tweeres.com/browse/foods/${food}`

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
			siteName: 'What Goes With',
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

	const uniqueFoods = Array.from(
		new Set(flatData_.map((fd) => kebabCase(fd.foodItem)))
	)

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

	const foodData = flatData_.find((d) => kebabCase(d.foodItem) === food)

	if (!foodData) {
		notFound()
	}

	return (
		<FoodComponent
			allFoodRecords={flatData_}
			foodItem={foodData.foodItem}
		/>
	)
}
