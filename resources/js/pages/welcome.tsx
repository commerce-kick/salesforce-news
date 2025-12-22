import PostCard from '@/components/post-card';
import Layout from '@/layouts/default';
import { IPost } from '@/types/post';
import { InfiniteScroll } from '@inertiajs/react';

export default function Welcome({
    posts,
}: {
    posts: IPost[];
}) {
    return (
        <Layout>
            <main className="container mx-auto mt-8 max-w-screen-2xl px-4 md:px-6">
                <InfiniteScroll
                    data="posts"
                    manual
                    previous={({ loading, fetch, hasMore }) =>
                        hasMore && (
                            <button onClick={fetch} disabled={loading}>
                                {loading ? 'Loading...' : 'Load previous'}
                            </button>
                        )
                    }
                    next={({ loading, fetch, hasMore }) =>
                        hasMore && (
                            <button onClick={fetch} disabled={loading}>
                                {loading ? 'Loading...' : 'Load more'}
                            </button>
                        )
                    }
                >
                    <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
                        {posts.data.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                </InfiniteScroll>
            </main>
        </Layout>
    );
}
