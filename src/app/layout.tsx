import './globals.css'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import Mixpanel from './Mixpanel'
import { Button } from '@/components/ui/button'
import MainTabs from './MainTabs'
import FeedbackForm from './FeedbackForm'

const inter = Inter({ subsets: ['latin'] })

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
						What Goes With
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
					<footer className="text-center py-32 text-sm">
						<p>
							By{' '}
							<a
								href="https://tweeres.ca"
								title="Tyler Weeres"
								className="text-blue-600"
							>
								Tyler Weeres
							</a>
						</p>
						<p>
							Pot icon created by{' '}
							<a
								href="https://www.flaticon.com/free-icons/boiling"
								title="Pot icon"
								className="text-blue-600"
							>
								Freepik - Flaticon
							</a>
						</p>
					</footer>
				</div>
				<FeedbackForm />
				<Mixpanel />
				{/* Ahrefs analytics */}
				<script
					src="https://analytics.ahrefs.com/analytics.js"
					data-key="OR25pSoDpycSw5Y6N2q99Q"
					async
				></script>
			</body>
		</html>
	)
}
