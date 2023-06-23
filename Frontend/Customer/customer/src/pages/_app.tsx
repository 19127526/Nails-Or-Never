import axiosClient from '@/api-client/axiosClient'
import {Provider} from 'react-redux'
import {SWRConfig} from 'swr'
import EmptyLayout from "@/components/layout/empty";
import {AppPropsWithLayout} from "@/model/common";
import {createEmotionCache} from "@/utils/create-emotion-cache";
import {store} from "@/app/store";
import Head from "next/head";
import React, {Suspense} from "react";
import LoadingComponent from "@/components/loading";
import Loading from "@/components/layout/loading";
import NextTopLoader from 'nextjs-toploader';
import Script from "next/script";
import "@/public/css/index.min.css"

import * as Bootstrap from "../public/js/bootstrap.bundle.min"


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function App({Component, pageProps, emotionCache = clientSideEmotionCache}: AppPropsWithLayout) {
    const Layout = Component.Layout ?? EmptyLayout
    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
                <meta name="generator" content="WordPress 6.2.2"/>
                <title>nail</title>
                <link rel="canonical" href="https://w20.wocmarketing.com/services/"/>
                <link rel="shortlink" href="https://w20.wocmarketing.com/?p=25"/>
                <link rel="icon" href="https://w20.wocmarketing.com/wp-content/uploads/2023/05/cropped-temp-fav-32x32.png" sizes="32x32"/>
                <link rel="icon" href="https://w20.wocmarketing.com/wp-content/uploads/2023/05/cropped-temp-fav-192x192.png" sizes="192x192"/>
                <link rel="apple-touch-icon" href="https://w20.wocmarketing.com/wp-content/uploads/2023/05/cropped-temp-fav-180x180.png"/>
                <meta name="msapplication-TileImage" content="https://w20.wocmarketing.com/wp-content/uploads/2023/05/cropped-temp-fav-270x270.png"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&amp;family=Manrope:wght@400;500;700;800&amp;display=swap" rel="stylesheet"/>
                <Script src="https://www.google-analytics.com/analytics.js" />
            </Head>
            <Script src="http://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" type="text/javascript" id="jquery-3.6.0-js"/>
            <Script type="text/javascript" src="window.js"></Script>
            {/*<Script type="text/javascript" src="jquery-3.6.0.min.js" id="jquery-3.6.0-js" strategy="lazyOnload"></Script>*/}
            <Script type="text/javascript" src="bootstrap.bundle.min.js" id="bootstrap-js"strategy="lazyOnload"></Script>
            <Script type="text/javascript" src="aos.js" id="aos-js" strategy="lazyOnload"></Script>
            <Script type="text/javascript" src="flickity.pkgd.min.js" id="flickity-js" strategy="lazyOnload"></Script>
            <Script type="text/javascript" src="slick.min.js" id="slick-js" strategy="lazyOnload"></Script>
            <Script type="text/javascript" src="sweetalert2.all.min.js" id="sweetalert2-js" strategy="lazyOnload"></Script>
            <Script type="text/javascript" id="main-js-extra" src="main.js" strategy="lazyOnload" ></Script>
            <Script type="text/javascript" src="lightbox.min.js" id="lightbox-js" strategy="lazyOnload"strategy="lazyOnload"></Script>
            <Script type="text/javascript" src="main.min.js" id="main-js" strategy="lazyOnload"></Script>
            <Script type="text/javascript" src="style.js" id="stylejs-js"  strategy="lazyOnload"></Script>
            <Provider store={store}>
                    <SWRConfig value={{fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false}}>
                        <Suspense fallback={<Loading />}>
                            <Layout>
                                <NextTopLoader showSpinner={false} />
                                <Component {...pageProps} />
                            </Layout>
                        </Suspense>
                    </SWRConfig>
            </Provider>
            {/*<Script type="text/javascript" src="../public/js/jquery-3.6.0.min.js" id="jquery-3.6.0-js"></Script>*/}
            {/*<Script type="text/javascript" src="../public/js/bootstrap.bundle.min.js" id="bootstrap-js"></Script>*/}
            {/*<Script type="text/javascript" src="../public/js/lightbox.min.js" id="lightbox-js"></Script>*/}
            {/*<Script type="text/javascript" src="../public/js/aos.js" id="aos-js"></Script>*/}
            {/*<Script type="text/javascript" src="../public/js/flickity.pkgd.min.js" id="flickity-js"></Script>*/}
            {/*<Script type="text/javascript" src="../public/js/slick.min.js" id="slick-js"></Script>*/}
            {/*<Script type="text/javascript" src="../public/js/sweetalert2.all.min.js" id="sweetalert2-js"></Script>*/}
            {/*<Script type="text/javascript" id="main-js-extra" src="../public/js/main.js"></Script>*/}
            {/*<Script type="text/javascript" src="../public/js/main.min.js" id="main-js"></Script>*/}
            {/*<Script type="text/javascript" src="../public/js/style.js" id="stylejs-js"></Script>*/}

        </>
    )
}