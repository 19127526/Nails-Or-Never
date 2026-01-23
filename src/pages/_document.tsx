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
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}