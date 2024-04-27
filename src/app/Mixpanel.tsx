'use client'

import { useEffect } from 'react'
import mixpanel from 'mixpanel-browser'

export default function Mixpanel() {
	useEffect(() => {
		if (!process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
			throw 'no mixpanel env variable'
		}
		mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, {
			debug: process.env.NODE_ENV !== 'production',
			track_pageview: true,
			persistence: 'localStorage',
		})
	}, [])

	return null
}
