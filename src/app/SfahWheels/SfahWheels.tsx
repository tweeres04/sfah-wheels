'use client'

import { useState, useMemo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import Search from './Search'
import Browse from './Browse'
import WhatGoesWith from './WhatGoesWith'

import mixpanel from 'mixpanel-browser'
import WhatGoesWithCountry from './WhatGoesWithCountry'

function useDismissedAlert() {
	const localStorageKey = 'dismissed-what-goes-with-alert'
	const dismissedAlertFromLocalStorage =
		typeof window !== 'undefined'
			? localStorage.getItem(localStorageKey)
			: true
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

function useMixpanel() {
	mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, {
		debug: process.env.NODE_ENV !== 'production',
		track_pageview: true,
		persistence: 'localStorage',
	})
}

function useWhatGoesWith() {
	const [whatGoesWithItem, baseSetWhatGoesWithItem] = useState<string | null>(
		null
	)
	const [whatGoesWithCountry, baseSetWhatGoesWithCountry] = useState<
		string | null
	>(null)

	function setWhatGoesWithItem(foodItem: string | null) {
		if (foodItem) {
			mixpanel.track('Open What Goes With', {
				'Food Item': foodItem,
			})
		}
		baseSetWhatGoesWithItem(foodItem)
		baseSetWhatGoesWithCountry(null)
	}
	function setWhatGoesWithCountry(country: string | null) {
		if (country) {
			mixpanel.track('Open What Goes With', {
				Country: country,
			})
		}
		baseSetWhatGoesWithCountry(country)
		baseSetWhatGoesWithItem(null)
	}

	return {
		whatGoesWithItem,
		setWhatGoesWithItem,
		whatGoesWithCountry,
		setWhatGoesWithCountry,
	}
}

export default function SfahTable({ data, adjectivesData }) {
	useMixpanel()
	const { dismissAlert, dismissedAlert } = useDismissedAlert()
	const {
		setWhatGoesWithItem,
		whatGoesWithItem,
		whatGoesWithCountry,
		setWhatGoesWithCountry,
	} = useWhatGoesWith()

	const flatData = useMemo(
		() =>
			Object.keys(data).flatMap((category) =>
				Object.keys(data[category]).flatMap((continent) =>
					Object.keys(data[category][continent]).flatMap((country) =>
						category === 'Acid'
							? Object.keys(
									data[category][continent][country]
							  ).flatMap((type) =>
									data[category][continent][country][
										type
									].flatMap((foodItem) => ({
										category: `${type} Acid`,
										continent,
										country,
										type,
										foodItem,
									}))
							  )
							: data[category][continent][country].flatMap(
									(foodItem) => ({
										category,
										continent,
										country,
										foodItem,
									})
							  )
					)
				)
			),
		[data]
	)

	return (
		<>
			{!dismissedAlert && new Date() < new Date('2024-04-01') ? (
				<Alert>
					<AlertTitle>What goes with my ingredient?</AlertTitle>
					<AlertDescription>
						You can now tap an ingredient to find ideas for what
						goes with it
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
					<Search
						flatData={flatData}
						setWhatGoesWithItem={setWhatGoesWithItem}
						setWhatGoesWithCountry={setWhatGoesWithCountry}
					/>
				</TabsContent>
				<TabsContent value="browse">
					<Browse
						data={data}
						setWhatGoesWithItem={setWhatGoesWithItem}
						setWhatGoesWithCountry={setWhatGoesWithCountry}
					/>
				</TabsContent>
			</Tabs>
			<WhatGoesWith
				foodItem={whatGoesWithItem}
				allFoodRecords={flatData}
				setWhatGoesWithItem={setWhatGoesWithItem}
				setWhatGoesWithCountry={setWhatGoesWithCountry}
			/>
			<WhatGoesWithCountry
				adjectivesData={adjectivesData}
				country={whatGoesWithCountry}
				allFoodRecords={flatData}
				setWhatGoesWithItem={setWhatGoesWithItem}
				setWhatGoesWithCountry={setWhatGoesWithCountry}
			/>
		</>
	)
}
