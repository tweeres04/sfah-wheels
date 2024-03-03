import { MetadataRoute } from 'next'
 
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
        src: '/cooking-pot.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}