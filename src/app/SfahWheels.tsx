'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import Search from './SfahWheels/Search'
import Browse from './SfahWheels/Browse'

function useDismissedAlert() {
	const localStorageKey = 'dismissed-what-goes-with-alert'
	const dismissedAlertFromLocalStorage =
		typeof window !== 'undefined'
			? localStorage.getItem(localStorageKey)
			: null
	const [dismissedAlert, setDismissedAlert] = useState(
		dismissedAlertFromLocalStorage
	)

	function dismissAlert() {
		const now = Date.now().toString()
		setDismissedAlert(now)
		localStorage.setItem('dismissed-what-goes-with-alert', now)
	}

	return { dismissedAlert, dismissAlert }
}

export default function SfahTable({ data }) {
	const { dismissAlert, dismissedAlert } = useDismissedAlert()
	return (
		<>
			{!dismissedAlert && new Date() < new Date('2024-04-01') ? (
				<Alert>
					<AlertTitle>What goes with my ingredient?</AlertTitle>
					<AlertDescription>
						You can now tap an ingredient to find ideas for what
						goes well with it
						<div className="flex flex-row-reverse gap-1">
							<Button
								size="sm"
								variant="secondary"
								onClick={dismissAlert}
							>
								Got it
							</Button>
						</div>
					</AlertDescription>
				</Alert>
			) : null}
			<Tabs defaultValue="search">
				<TabsList className="w-full grid grid-cols-2">
					<TabsTrigger value="search">Search</TabsTrigger>
					<TabsTrigger value="browse">Browse</TabsTrigger>
				</TabsList>
				<TabsContent value="search" className="grid gap-3">
					<Search data={data} />
				</TabsContent>
				<TabsContent value="browse">
					<Browse data={data} />
				</TabsContent>
			</Tabs>
		</>
	)
}
