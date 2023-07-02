import {LayoutProps} from "@/model/common";
import LoadingComponent from "@/components/loading";
import HeaderComponent from "@/components/header";
import FooterComponent from "@/components/footer";
import React from "react";

const EmptyLayout = ({ children }: LayoutProps) => {
    return (
        <div data-rsssl="1" className="home page-template-default page page-id-64">
            <LoadingComponent/>
            {children}
        </div>
    )
}

export default EmptyLayout