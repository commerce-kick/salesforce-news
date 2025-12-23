import FollowController from '@/actions/App/Http/Controllers/FollowController';
import PostCard from '@/components/post-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/layouts/default';
import { InfiniteScroll, Link, usePage } from '@inertiajs/react';

export default function UserProfilePage({
    user,
    posts,
    isFollowing,
    followers,
}: {
    user: any;
    posts: any;
    isFollowing: boolean;
    followers: any[];
}) {
    const { auth } = usePage().props;

    return (
        <Layout>
            <section className="bg-secondary py-20">
                <div className="container mx-auto space-y-4 px-6">
                    <h1 className="text-5xl font-bold capitalize sm:text-6xl">
                        {user.name}'s Profile
                    </h1>
                    {auth.user && user.id != auth.user.id && (
                        <div>
                            <Button asChild>
                                <Link
                                    href={FollowController.url({
                                        id: user.id,
                                    })}
                                    method="post"
                                >
                                    {isFollowing ? 'Unfollow' : 'Follow'}
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </section>
            <section className="container mx-auto mt-8 grid gap-8 px-6 md:grid-cols-4">
                <div className="col-span-3">
                    <InfiniteScroll data="posts">
                        <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
                            {posts?.data?.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
                <div>
                    <Card>
                        <CardContent>
                            <h2 className="mb-4 text-2xl font-bold">
                                Followers
                            </h2>
                            <div className="">
                                {followers?.map((follower) => (
                                    <Link
                                        key={follower.id}
                                        href={`/user/${follower.id}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage
                                                    src={
                                                        follower.avatar ||
                                                        '/placeholder.svg'
                                                    }
                                                    alt={follower.name}
                                                />
                                                <AvatarFallback className="text-xs">
                                                    {follower.name
                                                        ?.charAt(0)
                                                        .toUpperCase() || 'U'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="text-sm leading-none font-medium">
                                                    {follower?.name}
                                                </span>
                                                <span className="mt-1 text-xs text-muted-foreground">
                                                    {follower?.email}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </Layout>
    );
}
