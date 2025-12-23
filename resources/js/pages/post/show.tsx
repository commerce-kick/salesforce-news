import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Layout from '@/layouts/default';
import { Link } from '@inertiajs/react';
import { CalendarDays, User } from 'lucide-react';

export default function PostPage({
    post,
    htmlContent,
}: {
    post: any;
    htmlContent: string;
}) {
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
                                <Badge
                                    variant="secondary"
                                    className="capitalize"
                                >
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

                                <Separator
                                    orientation="vertical"
                                    className="h-4"
                                />

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
                            <div
                                className="prose prose-neutral dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: htmlContent,
                                }}
                            />

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
