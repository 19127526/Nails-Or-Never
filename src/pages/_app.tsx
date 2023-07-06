import axiosClient from '@/api-client/axiosClient'
import {Provider} from 'react-redux'
import {SWRConfig} from 'swr'
import EmptyLayout from "@/components/layout/empty";
import {AppPropsWithLayout} from "@/model/common";
import {createEmotionCache} from "@/utils/create-emotion-cache";
import Head from "next/head";
import React, {Suspense} from "react";
import LoadingComponent from "@/components/loading";
import NextTopLoader from 'nextjs-toploader';
import Script from "next/script";
import "@/public/css/index.min.css"
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {persistor} from "@/app/store";
import {store} from "@/app/store";
import "./_app.css"
import {getGalleryPagination} from "@/api-client/gallery/Gallery.api";
import {getDetailAboutUs} from "@/api-client/about-us/AboutUs.api";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()
const queryClient = new QueryClient();

export default function App({Component, pageProps, emotionCache = clientSideEmotionCache}: AppPropsWithLayout) {
    const Layout = Component.Layout ?? EmptyLayout
    return (
        <>
            <Head>
        
                <link rel="canonical" href="https://nailsornever.com/"/>
                <link rel="shortlink" href="https://nailsornever.com/"/>
                <link rel="icon" href="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png" sizes="32x32"/>
                <link rel="icon" href="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png" sizes="192x192"/>
                <link rel="apple-touch-icon" href="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png"/>
                <meta name="msapplication-TileImage" content="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&amp;family=Manrope:wght@400;500;700;800&amp;display=swap" rel="stylesheet"/>
                <Script src="https://www.google-analytics.com/analytics.js" />
            </Head>
            <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" type="text/javascript" id="jquery-3.6.0-js"/>
            <Script type="text/javascript" src="https://nails.shoedog.vn/public/window.js"></Script>
            {/*<Script type="text/javascript" src="jquery-3.6.0.min.js" id="jquery-3.6.0-js" strategy="lazyOnload"></Script>*/}
            <Script type="text/javascript" src="https://nails.shoedog.vn/public/bootstrap.bundle.min.js" id="bootstrap-js" strategy="lazyOnload"></Script>
            <Script type="text/javascript" src="https://nails.shoedog.vn/public/aos.js" id="aos-js" strategy="lazyOnload"></Script>
            <Script type="text/javascript" src="https://nails.shoedog.vn/public/flickity.pkgd.min.js" id="flickity-js" strategy="lazyOnload"></Script>
            <Script type="text/javascript" src="https://nails.shoedog.vn/public/slick.min.js" id="slick-js" strategy="lazyOnload"></Script>
            <Script type="text/javascript" src="https://nails.shoedog.vn/public/sweetalert2.all.min.js" id="sweetalert2-js" strategy="lazyOnload"></Script>
            <Script type="text/javascript" id="main-js-extra" src="https://nails.shoedog.vn/public/main.js" strategy="lazyOnload" ></Script>
            <Script type="text/javascript" src="https://nails.shoedog.vn/public/lightbox.min.js" id="lightbox-js" strategy="lazyOnload"></Script>
            <Script type="text/javascript" src="https://nails.shoedog.vn/public/main.min.js" id="main-js" strategy="lazyOnload"></Script>
            <Script type="text/javascript" src="https://nails.shoedog.vn/public/style.js" id="stylejs-js"  strategy="lazyOnload"></Script>
            <Provider store={store}>
                <PersistGate loading={<LoadingComponent />} persistor={persistor}>
                    <Suspense fallback={<LoadingComponent />}>
                        <QueryClientProvider client={queryClient}>
                            <SWRConfig value={{fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false}}>
                                    <Layout>
                                        <NextTopLoader showSpinner={false} />
                                        <Component {...pageProps} />
                                    </Layout>
                            </SWRConfig>
                        </QueryClientProvider>
                    </Suspense>
                </PersistGate>
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
