import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import yaml from 'js-yaml'

import SfahWheels from './SfahWheels'

export default async function Home() {
	const fileData = await readFile(
		join(process.cwd(), 'src', 'data.yml'),
		'utf8'
	)
	const data = yaml.load(fileData)

	return (
		<div className="container p-2 grid gap-3">
			<h1 className="text-2xl">
				<a href="https://www.saltfatacidheat.com/">SFAH</a> Wheels
			</h1>
			<SfahWheels data={data} />
		</div>
	)
}
