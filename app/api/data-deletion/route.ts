import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Meta sends a signed_request parameter with deletion requests.
// This endpoint parses it, logs the request, and returns a confirmation.

function parseSignedRequest(signedRequest: string, appSecret: string) {
  const [encodedSig, payload] = signedRequest.split('.')

  const sig = Buffer.from(encodedSig.replace(/-/g, '+').replace(/_/g, '/'), 'base64')
  const data = JSON.parse(Buffer.from(payload.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'))

  const expectedSig = crypto
    .createHmac('sha256', appSecret)
    .update(payload)
    .digest()

  if (!crypto.timingSafeEqual(sig, expectedSig)) {
    throw new Error('Invalid signature')
  }

  return data
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData()
    const signedRequest = body.get('signed_request') as string

    if (!signedRequest) {
      return NextResponse.json({ error: 'Missing signed_request' }, { status: 400 })
    }

    const appSecret = process.env.META_APP_SECRET
    if (!appSecret) {
      console.error('META_APP_SECRET not set')
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
    }

    const data = parseSignedRequest(signedRequest, appSecret)
    const userId = data.user_id

    // Generate a unique confirmation code for this deletion request
    const confirmationCode = crypto.randomBytes(16).toString('hex')

    // Log the request — swap this out for a DB write or email notification
    // if you want a paper trail beyond server logs
    console.log(`[DATA DELETION] User: ${userId} | Code: ${confirmationCode} | Time: ${new Date().toISOString()}`)

    // Optional: fire an email notification to yourself
    // await sendDeletionNotification(userId, confirmationCode)

    // Meta requires this exact response shape
    return NextResponse.json({
      url: `https://protagonist.ink/data-deletion?code=${confirmationCode}`,
      confirmation_code: confirmationCode,
    })
  } catch (err) {
    console.error('[DATA DELETION ERROR]', err)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
