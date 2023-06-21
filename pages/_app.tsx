import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {appWithTranslation} from "next-i18next";
import i18nextConfig from "@/next-i18next.config";
import {Provider as ReduxProvider} from "react-redux";
import {storeWrapper} from "@/store";

function App({Component, pageProps: {session, ...rest}}: AppProps) {
    const {store, props} = storeWrapper.useWrappedStore(rest);
    const {emotionCache: clientSideEmotionCache, pageProps} = props;
    return (
        <ReduxProvider store={store}>
            <Component {...pageProps} />
        </ReduxProvider>
    );
}

export default appWithTranslation(App, i18nextConfig)
