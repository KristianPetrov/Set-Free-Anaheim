import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #000000 0%, #111111 60%, #3f0d0d 100%)',
          color: '#ffffff',
          gap: 24,
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: -1,
          }}
        >
          Set Free Anaheim
        </div>
        <div
          style={{
            fontSize: 30,
            opacity: 0.9,
          }}
        >
          Urban Church & Outreach
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            right: 48,
            fontSize: 20,
            opacity: 0.9,
          }}
        >
          magichousesetfree.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}


