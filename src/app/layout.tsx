import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const title = 'SFAH Wheels'
const description = 'Digitized wheels from Salt Fat Acid Heat'

export const metadata: Metadata = {
	title,
	description,
	robots: {
		index: false,
	},
	openGraph: {
		title,
		description,
		url: 'https://sfah-wheels.tweeres.ca',
		siteName: title,
		locale: 'en_US',
		type: 'website',
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	)
}
