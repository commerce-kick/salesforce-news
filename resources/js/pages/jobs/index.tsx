import JobCard from '@/components/job-card';
import Layout from '@/layouts/default';
import { InfiniteScroll } from '@inertiajs/react';

export default function JobShowPage({ jobs }: { jobs: any[] }) {
    console.log(jobs);

    return (
        <Layout>
            <section className="bg-secondary py-20">
                <div className="mx-auto w-full max-w-2xl px-6 lg:max-w-7xl">
                    <h1 className="text-5xl font-bold sm:text-6xl">
                        Salesforce Jobs
                    </h1>
                    <div className="mt-4 text-lg text-muted-foreground">
                        Stay updated with the latest jobs
                    </div>
                </div>
            </section>
            <section className="container mx-auto mt-8 max-w-screen-2xl px-4 md:px-6">
                <InfiniteScroll data="jobs">
                    <div className="grid gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
                        {jobs?.data?.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>
                </InfiniteScroll>
            </section>
        </Layout>
    );
}
