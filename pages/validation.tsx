import {Inter} from 'next/font/google'
import {useTranslation} from "next-i18next";
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import i18nextConfig from "@/next-i18next.config.js";
import {setTenantDomain} from "@/lib/axios";
import Link from "next/link";
import {fetchTenant, getRunningTenantQueries} from "@/store/slices/api/tenantSlice";
import {storeWrapper} from "@/store";
import {fetchCourses, getRunningCoursesQueries} from "@/store/slices/api/courseSlice";

const inter = Inter({subsets: ['latin']})

export const getServerSideProps: GetServerSideProps = storeWrapper.getServerSideProps(
    (store) =>
        async ({req, locale}) => {
            setTenantDomain(req);

            store.dispatch(fetchTenant.initiate());

            store.dispatch(fetchCourses.initiate());

            await Promise.all([...store.dispatch(getRunningTenantQueries()), ...store.dispatch(getRunningCoursesQueries())]);

            const trans = (await serverSideTranslations(locale ?? i18nextConfig.i18n.defaultLocale, ["validation", "common"], i18nextConfig))

            return {
                props: {
                    ...trans
                }
            };
        }
);
export default function Home() {
    const {t} = useTranslation()
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            <Link href="/">
                {t("common:back_to_home")}
            </Link>
            {t("validation:unexpected_error")}
        </main>
    )
}
