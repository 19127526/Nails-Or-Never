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
import "antd/dist/reset.css";
import "@/public/css/index.min.css"
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {persistor} from "@/app/store";
import {store} from "@/app/store";
import { useActiveNavLink } from '@/hooks/useActiveNavLink';
import InitialLoading from '@/components/initial-loading';
import PageLoading from '@/components/page-loading';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()
const queryClient = new QueryClient();

function AppContent({Component, pageProps, emotionCache = clientSideEmotionCache}: AppPropsWithLayout) {
    const router = useRouter();
    const [isPageLoading, setIsPageLoading] = useState(true); // Start with true for initial load
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const Layout = Component.Layout ?? EmptyLayout
    useActiveNavLink();

    // Handle initial page load - SIMPLIFIED with safety timeout
    useEffect(() => {
        if (!isInitialLoad) return;

        let timeoutId: NodeJS.Timeout;
        let safetyTimeout: NodeJS.Timeout;

        // SAFETY: Always hide loading after max 3 seconds to prevent infinite loading on mobile
        safetyTimeout = setTimeout(() => {
            console.warn('PageLoading: Safety timeout triggered - forcing hide');
            setIsPageLoading(false);
            setIsInitialLoad(false);
        }, 3000);

        const handleInitialLoad = () => {
            // Clear safety timeout
            if (safetyTimeout) {
                clearTimeout(safetyTimeout);
            }
            // Wait a bit to ensure page is fully rendered
            timeoutId = setTimeout(() => {
                setIsPageLoading(false);
                setIsInitialLoad(false);
            }, 600); // Short delay
        };

        // Simple approach: wait for router ready, then hide
        if (typeof window !== 'undefined') {
            if (router.isReady) {
                // Router ready, hide loading
                handleInitialLoad();
            } else {
                // Wait for router to be ready (max 1.5s)
                const routerCheck = setInterval(() => {
                    if (router.isReady) {
                        clearInterval(routerCheck);
                        handleInitialLoad();
                    }
                }, 100);

                const routerTimeout = setTimeout(() => {
                    clearInterval(routerCheck);
                    // Force hide even if router not ready
                    handleInitialLoad();
                }, 1500);

                return () => {
                    clearInterval(routerCheck);
                    clearTimeout(routerTimeout);
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }
                    if (safetyTimeout) {
                        clearTimeout(safetyTimeout);
                    }
                };
            }
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            if (safetyTimeout) {
                clearTimeout(safetyTimeout);
            }
        };
    }, [router.isReady, isInitialLoad]);

    // Handle route changes
    useEffect(() => {
        if (!isInitialLoad) {
            const handleStart = () => {
                setIsPageLoading(true);
            };

            const handleComplete = () => {
                setTimeout(() => {
                    setIsPageLoading(false);
                }, 300); // Small delay for smooth transition
            };

            router.events.on('routeChangeStart', handleStart);
            router.events.on('routeChangeComplete', handleComplete);
            router.events.on('routeChangeError', handleComplete);

            return () => {
                router.events.off('routeChangeStart', handleStart);
                router.events.off('routeChangeComplete', handleComplete);
                router.events.off('routeChangeError', handleComplete);
            };
        }
    }, [router, isInitialLoad]);

    return (
        <>
            <InitialLoading />
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
                <meta name="generator" content="Nails Or Never"/>
                <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
                <title>{process.env.NEXT_PUBLIC_NAME_PRODUCT} - Professional nails care services in Malta,NY 12118</title>

                <meta name="keywords"
                      content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} &amp; SPA,MALTA,extensions`}/>
                <meta property="og:url" content="https://nailsornever.com/"/>
                <meta property="og:type" content="Website"/>
                <meta property="og:title" content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} - Professional nails care services in Malta,NY 12118`}/>
                <meta name="description" content={`Located conveniently in Malta, NewYork, 12118, 
                    ${process.env.NEXT_PUBLIC_NAME_PRODUCT} is one of the best salons in this area. ${process.env.NEXT_PUBLIC_NAME_PRODUCT} offers premier nails care and spa treatment services to satisfy your needs of enhancing natural beauty and refreshing your day.
                    mynewline Our salon takes pride in providing our valued customers all good services and top-high quality products as well as materials. 
                    You can find all nail-related services. At ${process.env.NEXT_PUBLIC_NAME_PRODUCT}, 
                    we take pride in providing you with all good products and qualified services to help you rejuvenate your beauty. 
                    You always feel friendly and welcome from our passionate staff who understand what you want.`}/>

                <meta property="og:description" content={`Located conveniently in Malta, NewYork, 12118, 
                    ${process.env.NEXT_PUBLIC_NAME_PRODUCT} is one of the best salons in this area. ${process.env.NEXT_PUBLIC_NAME_PRODUCT} offers premier nails care and spa treatment services to satisfy your needs of enhancing natural beauty and refreshing your day.
                    mynewline Our salon takes pride in providing our valued customers all good services and top-high quality products as well as materials. 
                    You can find all nail-related services. At ${process.env.NEXT_PUBLIC_NAME_PRODUCT}, 
                    we take pride in providing you with all good products and qualified services to help you rejuvenate your beauty. 
                    You always feel friendly and welcome from our passionate staff who understand what you want.`}/>
                <meta property="og:image"
                      content="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png"/>
                <meta name="generator"  content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} - Professional nails care services in Malta,NY 12118`}/>
                <link rel="canonical" href="https://nailsornever.com"/>
                <link rel="shortlink" href="https://nailsornever.com"/>
                <meta name="google-site-verification" content="TBcO22xEWNnvWsFFwo9V15xyceUknZVvQmk4Z9O36H0" />
                <link rel="icon"  href="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png" />
                <link rel="icon" href="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png" sizes="32x32"/>
                <link rel="icon" href="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png" sizes="192x192"/>
                <link rel="apple-touch-icon" href="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png"/>
                <meta name="msapplication-TileImage" content="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&amp;family=Manrope:wght@400;500;700;800&amp;display=swap" rel="stylesheet"/>
                <Script src="https://www.google-analytics.com/analytics.js" />
            </Head>
            {/* Load external libraries that are still needed */}
            {/*<Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" type="text/javascript" id="jquery-3.6.0-js" strategy="lazyOnload"/>*/}
            {/*<Script type="text/javascript" src="/external/bootstrap.bundle.min.js" id="bootstrap-js" strategy="lazyOnload"></Script>*/}
            {/*<Script type="text/javascript" src="/external/aos.js" id="aos-js" strategy="lazyOnload"></Script>*/}
            {/*<Script type="text/javascript" src="/external/flickity.pkgd.min.js" id="flickity-js" strategy="lazyOnload"></Script>*/}
            {/*<Script type="text/javascript" src="/external/slick.min.js" id="slick-js" strategy="lazyOnload"></Script>*/}
            {/*<Script type="text/javascript" src="/external/sweetalert2.all.min.js" id="sweetalert2-js" strategy="lazyOnload"></Script>*/}
            {/*<Script type="text/javascript" src="/external/lightbox.min.js" id="lightbox-js" strategy="lazyOnload"></Script>*/}
            <Provider store={store}>
                <PersistGate loading={<LoadingComponent />} persistor={persistor}>
                    <Suspense fallback={<LoadingComponent />}>
                        <QueryClientProvider client={queryClient}>
                            <SWRConfig value={{fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false}}>
                                <Layout>
                                    <NextTopLoader showSpinner={false} />
                                <PageLoading isLoading={isPageLoading} />
                                    <Component {...pageProps} />
                                </Layout>
                            </SWRConfig>
                        </QueryClientProvider>
                    </Suspense>
                </PersistGate>
            </Provider>
        </>
    )
}

export default function App(props: AppPropsWithLayout) {
    return <AppContent {...props} />;
}
