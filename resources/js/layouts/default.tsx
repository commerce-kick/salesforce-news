import Nav from '@/components/nav';
import { usePage } from '@inertiajs/react';
import { useQueryState } from 'nuqs';

export default function Layout({ children }: { children: React.ReactNode }) {
    const [category, setCategory] = useQueryState('category');

    const { categories, auth } = usePage().props;



    return (
        <>
            <Nav
                categories={categories}
                isAuthenticated={!!auth?.user}
                currentCategory={category}
            />

            {children}
        </>
    );
}
