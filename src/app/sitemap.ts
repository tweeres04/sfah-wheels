import { MetadataRoute } from 'next'

import { generateStaticParams as gspFoods } from './browse/foods/[food]/page'
import { generateStaticParams as gspRegions } from './browse/regions/[region]/page'
import { escape } from 'html-escaper'

function urlFromPath(path: string) {
	path = escape(path)
	path = encodeURI(path)
	return `https://sfah-wheels.tweeres.ca${path}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const foodSitemapItems = (await gspFoods()).map(({ food }) => ({
		url: urlFromPath(`/browse/foods/${food}`),
	}))
	const regionSitemapItems = (await gspRegions()).map(({ region }) => ({
		url: urlFromPath(`/browse/regions/${region}`),
	}))

	return [
		{ url: urlFromPath('/') },
		{ url: urlFromPath('/browse') },
		{ url: urlFromPath('/browse/foods') },
		{ url: urlFromPath('/browse/regions') },
		...foodSitemapItems,
		...regionSitemapItems,
	]
}
