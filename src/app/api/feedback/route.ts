import Mailgun from 'mailgun.js'
import invariant from 'tiny-invariant'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
	const formData = await request.formData()
	let email = formData.get('email')
	const feedback = formData.get('feedback')

	email = email === '' ? null : email

	if (!feedback) {
		return new Response(null, { status: 400 })
	}

	invariant(process.env.MAILGUN_API_KEY, 'MAILGUN_API_KEY not found in .env')

	const mailgun = new Mailgun(FormData)
	const mg = mailgun.client({
		username: 'api',
		key: process.env.MAILGUN_API_KEY,
	})

	const data = {
		from: 'feedback@whatgoeswith.tweeres.com',
		to: 'tweeres04@gmail.com',
		subject: 'What goes with - New Feedback',
		text: email
			? `Email: ${email}

Feedback:
${feedback}`
			: feedback,
		'h:Reply-To': email,
	}
	await mg.messages.create('mg.tweeres.com', data)

	return new Response()
}
