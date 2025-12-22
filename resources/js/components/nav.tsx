'use client';

import Login from '@/actions/Filament/Auth/Pages/Login';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Link, router } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { useState } from 'react';

interface ResponsiveNavProps {
    currentCategory?: string | null;
    isAuthenticated?: boolean;
    categories: string[];
}

export default function Nav({
    categories,
    currentCategory = 'ALL',
    isAuthenticated = false,
}: ResponsiveNavProps) {
    const [selectedCategory, setSelectedCategory] = useState(currentCategory);
    const [open, setOpen] = useState(false);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        setOpen(false);
        router.get('/', {
            category: category === 'ALL' ? undefined : category,
        });
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4 px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Logo className="h-8 w-8 text-blue-400" />
                    <span className="hidden text-lg font-semibold sm:inline-block">
                        News
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden flex-1 items-center justify-center gap-2 md:flex">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={
                                category === selectedCategory
                                    ? 'default'
                                    : 'ghost'
                            }
                            className="uppercase"
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </Button>
                    ))}
                </nav>

                {/* Desktop Auth Buttons */}
                <div className="hidden items-center gap-2 md:flex">
                     <Button
                                    variant="outline"
                                    className="w-full bg-transparent"
                                    asChild
                                >
                                    <a href={Login.url()}>
                                        {isAuthenticated
                                            ? 'Dashboard'
                                            : 'Register'}
                                    </a>
                                </Button>
                </div>

                {/* Mobile Menu */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Open menu"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-75 sm:w-100">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>
                        <div className="mt-8 flex flex-col gap-4">
                            {/* Mobile Categories */}
                            <div className="flex flex-col gap-2">
                                {categories.map((category) => (
                                    <Button
                                        key={category}
                                        variant={
                                            category === selectedCategory
                                                ? 'default'
                                                : 'ghost'
                                        }
                                        className="w-full justify-start uppercase"
                                        onClick={() =>
                                            handleCategoryClick(category)
                                        }
                                    >
                                        {category}
                                    </Button>
                                ))}
                            </div>

                            {/* Mobile Auth Button */}
                            <div className="mt-4 border-t pt-4">
                                <Button
                                    variant="outline"
                                    className="w-full bg-transparent"
                                    asChild
                                >
                                    <a href={Login.url()}>
                                        {isAuthenticated
                                            ? 'Dashboard'
                                            : 'Register'}
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
