import { MetadataRoute } from 'next'
import icon from './icon.png'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'SFAH Wheels',
		short_name: 'SFAH Wheels',
		description: 'Learn what ingredients go together',
		start_url: '/',
		display: 'standalone',
		background_color: '#fff',
		theme_color: '#fff',
		icons: [
			{
				src: icon.src,
				sizes: '512x512',
				type: 'image/png',
			},
		],
	}
}
