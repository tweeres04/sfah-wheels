import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import yaml from 'js-yaml'

import SfahWheels from './SfahWheels/SfahWheels'
import { Button } from '@/components/ui/button'

export default async function Home() {
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

	return (
		<div className="container p-2 grid gap-3">
			<h1 className="text-2xl">
				<a href="https://www.saltfatacidheat.com/">SFAH</a> Wheels
			</h1>
			<p className="text-xs">
				All information here is from the amazing book{' '}
				<Button asChild variant="link" className="p-0 h-auto text-xs">
					<a href="https://www.saltfatacidheat.com/" target="_blank">
						Salt Fat Acid Heat
					</a>
				</Button>
				, which I highly recommend to anyone who wants to improve at
				cooking.
			</p>
			<SfahWheels data={data} adjectivesData={adjectivesData} />
		</div>
	)
}
