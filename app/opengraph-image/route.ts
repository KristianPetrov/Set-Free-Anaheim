import { NextRequest } from 'next/server'
import path from 'path'
import { readFile } from 'fs/promises'

export const runtime = 'nodejs'

export async function GET(_req: NextRequest) {
  const filePath = path.join(process.cwd(), 'public', 'set-free-og.png')
  const image = await readFile(filePath)
  return new Response(image, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}


