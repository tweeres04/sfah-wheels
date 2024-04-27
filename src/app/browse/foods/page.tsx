import { readFile } from 'fs/promises'
import { join } from 'path'
import yaml from 'js-yaml'
import { flatData } from '@/app/flatData'
import Link from 'next/link'
import { capitalize, orderBy } from 'lodash'

export default async function Foods() {
	const fileData = await readFile(
		join(process.cwd(), 'src', 'data.yml'),
		'utf8'
	)
	const data = yaml.load(fileData)

	const flatData_ = flatData(data)

	const allFoods = Array.from(new Set(flatData_.map((fd) => fd.foodItem)))

	const allFoodsSorted = orderBy(allFoods)

	return (
		<ul className="grid sm:grid-cols-2 lg:grid-cols-3">
			{allFoodsSorted.map((f) => (
				<li key={f}>
					<Link href={`/browse/foods/${f}`}>{capitalize(f)}</Link>
				</li>
			))}
		</ul>
	)
}
