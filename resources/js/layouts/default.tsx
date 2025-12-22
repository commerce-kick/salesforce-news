import Login from '@/actions/Filament/Auth/Pages/Login';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Link, router, usePage } from '@inertiajs/react';
import { useQueryState } from 'nuqs';

export default function Layout({ children }: { children: React.ReactNode }) {
    const [category, setCategory] = useQueryState('category')


    const categories = usePage<{ categories: string[] }>().props.categories;

    const onPress = (category: string) => {
        router.get('/', { category: category === 'ALL' ? undefined : category });
    };

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60 md:px-6 ">
                <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
                    <Link href="/">
                        <Logo className="h-8 w-auto text-blue-500" />
                    </Link>

                    <nav className="group flex flex-1 list-none items-center justify-center gap-4">
                        {categories.map((cat) => {
                            return (
                                <Button
                                    variant={cat === (category || 'ALL') ? 'default' : 'ghost'}
                                    className="uppercase"
                                    onClick={() => {
                                        onPress(cat);
                                    }}
                                    key={cat}
                                >
                                    {cat}
                                </Button>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" asChild>
                            <a href={Login.url()}>Login/Register</a>
                        </Button>
                    </div>
                </div>
            </header>

            {children}
        </>
    );
}
