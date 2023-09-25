import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

const title = 'SFAH Wheels'
const description = 'Digitized wheels from Salt Fat Acid Heat'
const url = 'https://sfah-wheels.tweeres.ca'

export const metadata: Metadata = {
	title,
	description,
	robots: {
		index: false,
	},
	alternates: {
		canonical: url,
	},
	openGraph: {
		title,
		description,
		url,
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
			<body className={inter.className}>
				{/* Google tag (gtag.js) */}
				{process.env.NODE_ENV === 'production' ? (
					<>
						<Script src="https://www.googletagmanager.com/gtag/js?id=G-JP1C6M1WLR" />
						<Script id="google-analytics">
							{`window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());

							gtag('config', 'G-JP1C6M1WLR');`}
						</Script>
					</>
				) : null}
				{children}
			</body>
		</html>
	)
}
