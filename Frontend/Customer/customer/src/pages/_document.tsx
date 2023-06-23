import * as React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from "next/script";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* PWA primary color */}
                    <meta name="theme-color" content="Nail" />
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <meta name="emotion-insertion-point" content="" />
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}