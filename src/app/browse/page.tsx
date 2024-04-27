import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import yaml from 'js-yaml'

import Browse from './Browse'

export default async function BrowsePage() {
	const dataString = await readFile(
		join(process.cwd(), 'src', 'data.yml'),
		'utf8'
	)
	const data = yaml.load(dataString)

	return <Browse data={data} />
}
