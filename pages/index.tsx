import {Inter} from 'next/font/google'
import {useTranslation} from "next-i18next";
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import i18nextConfig from "@/next-i18next.config.js";
import {setTenantDomain} from "@/lib/axios";
import Link from "next/link";
import {storeWrapper} from "@/store";
import {fetchCourses, getRunningCoursesQueries} from "@/store/slices/api/courseSlice";
import {fetchTenant, getRunningTenantQueries} from "@/store/slices/api/tenantSlice";

const inter = Inter({subsets: ['latin']})

export const getServerSideProps: GetServerSideProps = storeWrapper.getServerSideProps(
    (store) =>
        async ({req, locale}) => {
            setTenantDomain(req);

            store.dispatch(fetchTenant.initiate());

            store.dispatch(fetchCourses.initiate());

            await Promise.all([...store.dispatch(getRunningTenantQueries()), ...store.dispatch(getRunningCoursesQueries())]);
            const trans = (await serverSideTranslations(locale ?? i18nextConfig.i18n.defaultLocale, ["common", "auth", "otp"], i18nextConfig))

            return {
                props: {
                    ...trans
                }
            };
        }
);
export default function Home() {
    const {t} = useTranslation();

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            {t("auth:welcome_back")}

            <Link href="/validation">
                go to validation page
            </Link>
        </main>
    )
}
