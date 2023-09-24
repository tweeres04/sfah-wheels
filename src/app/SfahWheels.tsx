'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Search from './SfahWheels/Search'
import Browse from './SfahWheels/Browse'

export default function SfahTable({ data }) {
	return (
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
	)
}
