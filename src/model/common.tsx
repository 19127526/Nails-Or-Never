import {ReactElement, ReactNode} from "react";
import {AppProps} from "next/app";
import {NextPage} from "next";
import { EmotionCache } from '@emotion/react'

export interface LayoutProps {
    children: ReactNode
}

export type NextPageWithLayout = NextPage & {
    Layout?: (props: LayoutProps) => ReactElement
}

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
    emotionCache?: EmotionCache
}