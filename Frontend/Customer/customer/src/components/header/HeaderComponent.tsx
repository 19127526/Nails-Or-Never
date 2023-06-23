import React, {useEffect, useState} from "react";
import Logo from '../../images/Logo.png'
import {labelHeaderInterFace} from "@/model/header";
import {labelHeader} from "@/constains/label";
import {useRouter} from "next/router";

const HeaderComponent = () => {
    const [activeLabel, setActiveLabel] = useState<labelHeaderInterFace>()
    const router = useRouter()
    useEffect(() => {
        setActiveLabel(labelHeader?.filter(index => router?.pathname == index?.url)[0])
    }, [])
    const handleClickLabel = (currentLabel : labelHeaderInterFace) : void => {
        setActiveLabel(currentLabel)
        router.push(currentLabel?.url as string)
    }
    console.log(activeLabel)
    return (
        <header id="header" className="header">
            <div className="header-main">
                <div className="container-lg">
                    <nav className="navbar navbar-expand-xxl" aria-label="Eighth navbar example">
                        <a className="navbar-brand" href="https://w20.wocmarketing.com">
                            <img width="150px"
                                 src={Logo?.src}
                                 className="img-fluid"/>
                        </a>
                        <button className="navbar-toggler collapsed pe-0" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#navbarsMenu" aria-controls="navbarsMenu" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="toggler-icon top-bar"></span>
                            <span className="toggler-icon middle-bar"></span>
                            <span className="toggler-icon bottom-bar"></span>
                        </button>

                        <div className="offcanvas offcanvas-end " id="navbarsMenu"
                             aria-modal="true" role="dialog">
                            <div className="offcanvas-header">
                                <a className="navbar-brand" href="https://w20.wocmarketing.com">
                                    <img width="150px"
                                         src="https://w20.wocmarketing.com/wp-content/themes/woctheme/gos-cms/uploads/alice-esthetic-logo-2.png"
                                         className="img-fluid"/>
                                </a>
                                <button type="button" className="navbar-toggler px-0" data-bs-dismiss="offcanvas"
                                        aria-label="Close">
                                    <span className="toggler-icon top-bar"></span>
                                    <span className="toggler-icon middle-bar"></span>
                                    <span className="toggler-icon bottom-bar"></span>
                                </button>
                            </div>
                            <div className="offcanvas-body">
                                <ul className="navbar-nav ms-auto">
                                    {
                                        labelHeader?.map((index, number) =>
                                            activeLabel?.label == index?.label ?
                                                <li key={number} className="nav-item" onClick={() => handleClickLabel(index)}>
                                                    <a className="nav-link active">
                                                        {index?.label}
                                                    </a>
                                                </li>
                                                :
                                                <li key={number} className="nav-item" onClick={() => handleClickLabel(index)}>
                                                    <a className="nav-link ">
                                                        {index?.label}
                                                    </a>
                                                </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>

                        <div className="button-group justify-content-center">
                            <a href="#">
                                <button className="button icon-button ms-xl-4">
                                    <i className="fa-solid fa-calendar-days"></i>
                                    <span>Book Online</span>
                                    <span className="sticky">Book Appt</span>
                                </button>
                            </a>
                            <a href="#">
                                <button className="button icon-button">
                                    <i className="fa-solid fa-gift"></i>
                                    <span>Buy eGift</span>
                                    <span className="sticky">Buy eGift</span>
                                </button>
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}


export default HeaderComponent