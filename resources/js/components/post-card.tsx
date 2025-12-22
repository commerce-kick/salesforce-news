import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { IPost } from '@/types/post';
import { Link } from '@inertiajs/react';

export default function PostCard({ post }: { post: IPost }) {

   const media = post.media?.length ? post.media[0] : null;

    return (
       <Link href={`/post/${post.slug}`}>
        <Card className='relative pt-0 overflow-hidden'>
            {media ? <img src={media.original_url} alt={media.alt || 'Post image'} /> : <img src="/placeholder-image.svg" alt="Placeholder image" />}

            <Badge className='absolute right-4 top-4 uppercase' variant="destructive">{post.category}</Badge>

            <CardContent>
                <h2 className="text-xl font-bold">{post.title}</h2>
            </CardContent>
        </Card></Link>
    );
}
