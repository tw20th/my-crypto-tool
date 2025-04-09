// app/api/og/[id]/route.tsx
import { ImageResponse } from '@vercel/og'
import { fetchPostById } from '@/hooks/useFirestorePosts'

export const runtime = 'edge' // ← required

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const post = await fetchPostById(params.id)

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: '#1a202c',
          color: 'white',
          width: '1200px',
          height: '630px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px',
          textAlign: 'center',
        }}
      >
        <div>
          <h1>{post.title}</h1>
          <p style={{ fontSize: 24, marginTop: '20px' }}>{post.date}</p>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
