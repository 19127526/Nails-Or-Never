import React, {ReactNode} from "react";
import { motion } from 'framer-motion';
import HeaderComponent from "@/components/header";
import FooterComponent from "@/components/footer";

const MainLayout = ({children}: { children: ReactNode }) => {
    return (
        <div data-rsssl="1" className="home page-template-default page page-id-64">
            <HeaderComponent/>
            <main>
                {children}
            </main>
            <FooterComponent/>
        </div>
    )
}


export default MainLayout
