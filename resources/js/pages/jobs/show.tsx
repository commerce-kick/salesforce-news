import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Layout from '@/layouts/default';
import { Link } from '@inertiajs/react';
import {
    Building2,
    CalendarDays,
    Clock,
    DollarSign,
    Mail,
    MapPin,
    Verified,
} from 'lucide-react';

export default function JobPage({
    job,
    htmlContent,
}: {
    job: any;
    htmlContent: string;
}) {
    const formattedDate = new Date(job.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formattedSalary = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(job.salary);

    const jobTypeLabel = job.job_type
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    const userInitials = job.user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase();

    return (
        <Layout>
            <div className="min-h-screen bg-muted/30 px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                    {/* Header Card */}
                    <Card className="mb-6 overflow-hidden border-border/40 pt-0 shadow-sm">
                        <CardHeader className="bg-gradient-to-br from-primary/5 to-primary/10 pt-4 pb-8">
                            <div className="mb-4 flex items-start justify-between gap-4">
                                <Badge
                                    variant="secondary"
                                    className="font-medium capitalize"
                                >
                                    {jobTypeLabel}
                                </Badge>
                                <Badge
                                    variant={
                                        job.status === 'published'
                                            ? 'default'
                                            : 'outline'
                                    }

                                    className="capitalize"
                                >
                                    <Verified /> {job.company_name}
                                </Badge>
                            </div>

                            <h1 className="mb-6 text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
                                {job.title}
                            </h1>

                            {/* Company Info */}
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Building2 className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">
                                            {job.company_name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {job.location}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="pt-6">
                            {/* Key Details Grid */}
                            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
                                    <DollarSign className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="mb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                            Salary
                                        </p>
                                        <p className="font-semibold">
                                            {formattedSalary}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
                                    <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="mb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                            Location
                                        </p>
                                        <p className="font-semibold">
                                            {job.location}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
                                    <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="mb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                            Job Type
                                        </p>
                                        <p className="font-semibold">
                                            {jobTypeLabel}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
                                    <CalendarDays className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="mb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                            Posted
                                        </p>
                                        <p className="text-sm font-semibold">
                                            {formattedDate}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-6" />

                            {/* Job Description */}
                            <div>
                                <h2 className="mb-4 text-xl font-semibold">
                                    Job Description
                                </h2>

                                <div
                                    className="prose max-w-none prose-neutral dark:prose-invert prose-headings:font-semibold prose-h2:text-xl prose-h3:text-lg prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                                    dangerouslySetInnerHTML={{
                                        __html: htmlContent,
                                    }}
                                />
                            </div>

                            {/* Tags Section */}
                            {job.tags && job.tags.length > 0 && (
                                <>
                                    <Separator className="my-6" />
                                    <div>
                                        <h3 className="mb-3 text-sm font-medium tracking-wide text-muted-foreground uppercase">
                                            Skills & Tags
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {job.tags.map((tag: any) => (
                                                <Badge
                                                    key={tag.id}
                                                    variant="outline"
                                                    className="font-normal"
                                                >
                                                    <Link
                                                        href={`/jobs`}
                                                        data={{
                                                            tag: tag.slug.en,
                                                        }}
                                                    >
                                                        {tag.name.en}
                                                    </Link>
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            <Separator className="my-6" />

                            {/* Contact Section */}
                            <div className="rounded-lg bg-muted/50 p-6">
                                <h3 className="mb-4 text-lg font-semibold">
                                    Contact Information
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-5 w-5 text-muted-foreground" />
                                        <a
                                            href={`mailto:${job.company_email}`}
                                            className="font-medium text-primary hover:underline"
                                        >
                                            {job.company_email}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback className="bg-primary/10 text-xs text-primary">
                                                {userInitials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-medium">
                                                Posted by {job.user.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {job.user.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
