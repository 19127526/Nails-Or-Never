import { Inter } from 'next/font/google'
import React, {ReactNode} from "react";
import Script from 'next/script'
import {Head} from "next/document";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {Button} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HeaderComponent from "@/components/header/HeaderComponent";
import FooterComponent from "@/components/footer/FooterComponent";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

const MainLayout = ({children}: { children: ReactNode }) => {
    const router = useRouter()
    return (
        <div data-rsssl="1" className="home page-template-default page page-id-64">
            <div id="loading" style={{display: "none"}}>
                <div className="loading-img">
                    <img
                        src="../../images/alice-esthetic-logo-2.png"
                        alt="loading"/>
                </div>
            </div>
            <HeaderComponent/>
            {children}
            <FooterComponent/>
        </div>
    )
}

export default MainLayout
