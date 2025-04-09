// components/Blog/BlogItem.tsx
import Link from 'next/link'
import Card from '@/components/ui/Card'

type BlogItemProps = {
  slug: string
  title: string
  date: string
  description: string
}

export default function BlogItem({
  slug,
  title,
  date,
  description,
}: BlogItemProps) {
  return (
    <Card
      className="hover:shadow-md transition-shadow"
      variant="outlined"
      padding="md"
    >
      <Link href={`/blog/${slug}`}>
        <h2 className="text-lg font-semibold text-blue-600 hover:underline">
          {title}
        </h2>
      </Link>
      <p className="text-sm text-gray-500 mt-1">{date}</p>
      <p className="text-gray-700 dark:text-gray-300 mt-2">{description}</p>
    </Card>
  )
}
