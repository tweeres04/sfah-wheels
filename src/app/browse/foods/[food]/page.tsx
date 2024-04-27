import { notFound } from 'next/navigation'
import { readFile } from 'fs/promises'
import { join } from 'path'
import yaml from 'js-yaml'
import { flatData } from '../../../flatData'
import { Food as FoodComponent } from './Food'

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
