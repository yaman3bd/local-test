import {Inter} from 'next/font/google'
import {Trans, useTranslation} from "next-i18next";
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import i18nextConfig from "@/next-i18next.config.js";
import {setTenantDomain} from "@/lib/axios";
import Link from "next/link";
import {fetchTenant, getRunningTenantQueries} from "@/store/slices/api/tenantSlice";
import {storeWrapper} from "@/store";
import {fetchCourses, getRunningCoursesQueries, useFetchCoursesQuery} from "@/store/slices/api/courseSlice";

const inter = Inter({subsets: ['latin']})

export const getServerSideProps: GetServerSideProps = storeWrapper.getServerSideProps(
    (store) =>
        async ({req, locale}) => {
            setTenantDomain(req);

            store.dispatch(fetchTenant.initiate());

            store.dispatch(fetchCourses.initiate());

            await Promise.all([...store.dispatch(getRunningTenantQueries()), ...store.dispatch(getRunningCoursesQueries())]);

            const trans = (await serverSideTranslations(locale ?? i18nextConfig.i18n.defaultLocale, ["titles", "gdpr"], i18nextConfig))

            return {
                props: {
                    ...trans
                }
            };
        }
);
export default function Home() {
     const {data} = useFetchCoursesQuery();

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            {data?.data?.map((course: any) => (
                <div key={course.id}>{course.title}</div>
            ))}
            <hr/>
            <Link href="/">
                <Trans i18nKey="titles:blog"
                components={{
                    em: <em/>,
                }}
                >
                    test
                </Trans>
            </Link>
        </main>
    )
}
