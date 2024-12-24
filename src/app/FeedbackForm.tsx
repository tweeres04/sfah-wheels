'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { FormEvent, useState, useEffect } from 'react'
import mixpanel from 'mixpanel-browser'

function useFormVisibility() {
	const [isDismissed, setIsDismissed] = useState(false)
	const [timeElapsed, setTimeElapsed] = useState(false)

	useEffect(() => {
		setIsDismissed(Boolean(localStorage.getItem('feedbackFormDismissed')))
	}, [])

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeElapsed(true)
		}, 7500)
		return () => clearTimeout(timer)
	}, [])

	const dismiss = () => {
		setIsDismissed(true)
		localStorage.setItem('feedbackFormDismissed', new Date().toISOString())
		mixpanel.track('Feedback Form Dismissed')
	}

	return { shouldShowForm: timeElapsed && !isDismissed, dismiss }
}

export default function FeedbackForm() {
	const { shouldShowForm, dismiss } = useFormVisibility()
	const [showSuccess, setShowSuccess] = useState(false)

	async function onSubmit(event: FormEvent) {
		event.preventDefault()

		const formData = new FormData(event.target as HTMLFormElement)
		const response = await fetch('/api/feedback', {
			method: 'POST',
			body: formData,
		})
		if (response.ok) {
			setShowSuccess(true)
			setTimeout(dismiss, 3000)
			mixpanel.track('Feedback Submitted', {
				email: formData.get('email'),
				feedback: formData.get('feedback'),
			})
		} else {
			dismiss()
		}
	}

	return shouldShowForm ? (
		<div className="fixed bottom-0 w-full flex justify-center">
			<form onSubmit={onSubmit}>
				<Card className="rounded-none w-full max-w-[600px] mx-auto">
					{showSuccess ? (
						<CardContent className="p-6 text-center w-[555px] h-[340px] bg-green-50 text-green-950">
							Thanks for your feedback!
						</CardContent>
					) : (
						<>
							<CardHeader className="py-3">
								<CardTitle className="text-lg font-normal">
									What are you trying to find on this site
									today?
								</CardTitle>
							</CardHeader>
							<CardContent>
								<Textarea name="feedback" required />
								<Label htmlFor="email">Email (optional)</Label>
								<Input type="email" name="email" />
							</CardContent>
							<CardFooter>
								<Button
									type="button"
									className="w-full"
									variant="secondary"
									onClick={dismiss}
								>
									Not now
								</Button>
								<Button className="w-full">Submit</Button>
							</CardFooter>
						</>
					)}
				</Card>
			</form>
		</div>
	) : null
}
