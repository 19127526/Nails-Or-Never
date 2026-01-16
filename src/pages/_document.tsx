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
                    {/* iOS Safari fixes */}
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                    <style dangerouslySetInnerHTML={{__html: `
                        /* iOS Safari viewport fix */
                        html, body {
                            height: 100%;
                            width: 100%;
                            overflow-x: hidden;
                            -webkit-overflow-scrolling: touch;
                        }
                        /* Prevent iOS bounce scroll */
                        body {
                            position: relative;
                            -webkit-overflow-scrolling: touch;
                        }
                        /* Fix for iOS Safari 100vh issue */
                        @supports (-webkit-touch-callout: none) {
                            .page-loading-container {
                                height: -webkit-fill-available;
                            }
                        }
                    `}} />
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}