import PostCard from '@/components/post-card';
import Layout from '@/layouts/default';
import { IPost } from '@/types/post';
import { InfiniteScroll } from '@inertiajs/react';

export default function Welcome({ posts }: { posts: IPost[] }) {
    return (
        <Layout>
            <section className="bg-secondary py-20">
                <div className="mx-auto w-full max-w-2xl px-6 lg:max-w-7xl">
                    <h1 className="text-5xl font-bold sm:text-6xl">
                        Salesforce News
                    </h1>
                    <div className="mt-4 text-lg text-muted-foreground">
                        Stay updated with the latest news and articles from our
                        community.
                    </div>
                </div>
            </section>
            <section className="container mx-auto mt-8 max-w-screen-2xl px-4 md:px-6">
                <InfiniteScroll data="posts">
                    <div className="grid gap-x-8 gap-y-12 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {posts?.data?.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                </InfiniteScroll>
            </section>


             <section className="bg-accent/10 py-20 mt-16 text-center">

                    <h1>No partnerts</h1>

             </section>
        </Layout>
    );
}
