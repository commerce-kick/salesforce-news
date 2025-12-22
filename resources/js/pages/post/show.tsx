import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Layout from '@/layouts/default';
import { Link } from '@inertiajs/react';
import { CalendarDays, User } from 'lucide-react';

// Tiptap content renderer
function renderTiptapContent(content: any, media: any[]): React.ReactNode {
    if (!content || !content.content) return null;

    // Create a map of media items by UUID for quick lookup
    const mediaMap = new Map(media.map((item) => [item.uuid, item]));

    return content.content.map((node: any, index: number) => {
        if (node.type === 'paragraph') {
            const textAlign = node.attrs?.textAlign || 'start';
            const alignmentClass =
                textAlign === 'center'
                    ? 'text-center'
                    : textAlign === 'end'
                      ? 'text-end'
                      : 'text-start';

            return (
                <div key={index} className={`mb-4 ${alignmentClass}`}>
                    {node.content?.map((inline: any, idx: number) => {
                        if (inline.type === 'text') {
                            return (
                                <span key={idx} className="leading-relaxed">
                                    {inline.text}
                                </span>
                            );
                        }
                        if (inline.type === 'image') {
                            const imageId = inline.attrs?.id;
                            const mediaItem = imageId
                                ? mediaMap.get(imageId)
                                : null;
                            const imageSrc =
                                mediaItem?.original_url || inline.attrs?.src;
                            const alt = inline.attrs?.alt || 'Post image';

                            if (imageSrc) {
                                return (
                                    <img
                                        key={idx}
                                        src={imageSrc || '/placeholder.svg'}
                                        alt={alt}
                                        className="my-4 h-auto max-w-full rounded-lg"
                                        width={inline.attrs?.width || undefined}
                                        height={
                                            inline.attrs?.height || undefined
                                        }
                                    />
                                );
                            }
                        }
                        return null;
                    })}
                </div>
            );
        }
        return null;
    });
}

export default function PostPage({ post }: { post: any }) {
    const formattedDate = new Date(post.created_at).toLocaleDateString(
        'en-US',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        },
    );

    const userInitials = post.user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase();

    return (
        <Layout>
            <div className="min-h-screen bg-background px-4 py-12">
            <div className="mx-auto max-w-4xl">
                <Card>
                    <CardHeader className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="capitalize">
                                {post.category}
                            </Badge>
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight text-balance">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                        {userInitials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex items-center gap-1">
                                    <User className="h-4 w-4" />
                                    <span>{post.user.name}</span>
                                </div>
                            </div>

                            <Separator orientation="vertical" className="h-4" />

                            <div className="flex items-center gap-1">
                                <CalendarDays className="h-4 w-4" />
                                <time dateTime={post.created_at}>
                                    {formattedDate}
                                </time>
                            </div>
                        </div>
                    </CardHeader>

                    <Separator />

                    <CardContent className="pt-6">
                        <div className="prose prose-neutral dark:prose-invert max-w-none">
                            {renderTiptapContent(post.content, post.media)}
                        </div>

                        {post.tags && post.tags.length > 0 && (
                            <>
                                <Separator className="my-6" />
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag: any) => (
                                        <Badge
                                            key={tag.id}
                                            variant="outline"
                                            asChild
                                        >
                                            <Link
                                                href={`/`}
                                                data={{
                                                    tag: tag.slug.en,
                                                }}
                                            >
                                                {tag.name.en}
                                            </Link>
                                        </Badge>
                                    ))}
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
        </Layout>
    );
}
