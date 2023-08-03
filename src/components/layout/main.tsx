import { Inter } from 'next/font/google'
import React, {ReactNode, useEffect} from "react";
import LoadingComponent from "@/components/loading";
import HeaderComponent from "@/components/header";
import FooterComponent from "@/components/footer";
;

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

const MainLayout = ({children}: { children: ReactNode }) => {
    return (
        <div data-rsssl="1" className="home page-template-default page page-id-64">
            <LoadingComponent/>
            <HeaderComponent/>
                {children}
            <FooterComponent/>
        </div>
    )
}


export default MainLayout