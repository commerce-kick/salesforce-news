import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { IPost } from "@/types/post"
import { Link } from "@inertiajs/react"
import { Calendar, Clock } from "lucide-react"

export default function PostCard({ post }: { post: IPost }) {
  const media = post.media?.length ? post.media[0] : null

  const getFirstParagraph = (content: any): string => {
    if (!content || !content.content) return ""

    // Find the first paragraph node
    const firstParagraph = content.content.find((node: any) => node.type === "paragraph" && node.content)

    if (!firstParagraph || !firstParagraph.content) return ""

    // Extract text from all text nodes in the paragraph
    return firstParagraph.content
      .filter((node: any) => node.type === "text")
      .map((node: any) => node.text)
      .join("")
  }

  const description = getFirstParagraph(post.content)

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Calculate reading time (approximate)
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return `${minutes} min read`
  }

  return (
    <Link href={`/post/${post.slug}`}>
      <Card className="group relative h-full overflow-hidden border-0 bg-card shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Image Container with Overlay */}
        <div className="relative aspect-[16/9] overflow-hidden">
          {media ? (
            <img
              src={media.original_url || "/placeholder.svg"}
              alt={media.alt || post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
              <span className="text-muted-foreground text-4xl">📄</span>
            </div>
          )}

          {/* Category Badge */}
          <Badge className="absolute right-4 top-4 uppercase font-semibold shadow-lg" variant="destructive">
            {post.category}
          </Badge>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <CardContent className="space-y-4 pt-6">
          {/* Title */}
          <h2 className="text-xl font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h2>

          {/* Description/Excerpt */}
          {description && <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{description}</p>}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag.id} variant="secondary" className="text-xs font-normal">
                  {tag.name.en}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Author and Meta Information */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.user?.avatar || "/placeholder.svg"} alt={post.user?.name} />
                <AvatarFallback className="text-xs">{post.user?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-none">{post.user?.name}</span>
                <span className="text-xs text-muted-foreground mt-1">{post.user?.email}</span>
              </div>
            </div>
          </div>

          {/* Date and Reading Time */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(post.updated_at)}</span>
            </div>
            {post.content && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{calculateReadingTime(JSON.stringify(post.content))}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
