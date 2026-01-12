import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#1E293B',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(60, 30) scale(0.75)" stroke="#FFFFFF" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M160 580 L160 200 C160 90 250 40 340 40 C430 40 480 100 480 180 C480 260 420 320 340 320 L280 320"/>
            <path d="M200 320 C200 420 260 480 340 480 L340 400"/>
            <circle cx="380" cy="140" r="20" fill="#FFFFFF"/>
            <path d="M480 180 L540 200 L480 220"/>
            <path d="M340 480 L340 580"/>
            <path d="M280 520 L400 520"/>
          </g>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
