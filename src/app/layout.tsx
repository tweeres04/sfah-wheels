import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import Mixpanel from './Mixpanel'
import { Button } from '@/components/ui/button'
import MainTabs from './MainTabs'

const inter = Inter({ subsets: ['latin'] })

const title = 'SFAH Wheels'
const description = 'Digitized wheels from Salt Fat Acid Heat'
const url = 'https://sfah-wheels.tweeres.ca'

export const metadata: Metadata = {
	title,
	description,
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

export default async function RootLayout({
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
				<div className="container mx-auto p-2 space-y-3">
					<Link href="/" className="text-xl">
						SFAH Wheels
					</Link>
					<p className="text-xs">
						All information here is from the amazing book{' '}
						<Button
							asChild
							variant="link"
							className="p-0 h-auto text-xs"
						>
							<a
								href="https://www.saltfatacidheat.com/"
								target="_blank"
							>
								Salt Fat Acid Heat
							</a>
						</Button>
						, which I highly recommend to anyone who wants to
						improve at cooking.
					</p>
					<MainTabs />
					{children}
				</div>
				<Mixpanel />
			</body>
		</html>
	)
}
