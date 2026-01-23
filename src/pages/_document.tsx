import * as React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from "next/script";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* PWA primary color */}
                    <meta name="theme-color" content="#7fa681" />
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <meta name="emotion-insertion-point" content="" />
                    <meta name="format-detection" content="telephone=no" />
                    {/* DNS prefetch for external resources */}
                    <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                    <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
                    <link rel="dns-prefetch" href="https://ajax.googleapis.com" />
                    <link rel="dns-prefetch" href="https://www.google-analytics.com" />
                    {/* Font stylesheets - moved from _app.tsx to _document.tsx */}
                    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Manrope:wght@400;500;700;800&display=swap" as="style" />
                    <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Manrope:wght@400;500;700;800&display=swap" rel="stylesheet" />
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}