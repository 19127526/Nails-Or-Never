import React, {useEffect, useState} from "react";
import Logo from '../../images/Logo.png'
import {labelHeaderInterFace} from "@/model/header";
import {labelHeader, mainName} from "@/constants/label";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from "next/link";
import {Badge} from "@mui/material";

const HeaderComponent = () => {
    const [activeLabel, setActiveLabel] = useState<labelHeaderInterFace>();
    const router = useRouter()
    const dispatch = useDispatch();
    const giftCardPage = useSelector((state : any) => state.GiftCardPage)

    useEffect(() => {
        if (labelHeader?.filter(index => router?.pathname == index?.url)[0] == undefined) {
            setActiveLabel({label: '', url: ''})
        } else {
            setActiveLabel(labelHeader?.filter(index => router?.pathname == index?.url)[0])
        }
    }, [])
    const handleClickLabel = (currentLabel: labelHeaderInterFace, status: boolean): void => {
        setActiveLabel(currentLabel);
        if (status == false) {
            router?.push(currentLabel?.url as string);
            if (document.getElementById('close') != null && document.getElementById('close') != undefined) {
                document.getElementById('close')!.click();
            }

        }
    }
    return (
        <header id="header" className="header">
            <div className="header-main">
                <div className="container-lg">
                    <nav className="navbar navbar-expand-xxl" aria-label="Eighth navbar example">
                        <a className="navbar-brand">
                            <Link href={process.env.NEXT_PUBLIC_HOME_ROUTER as string} replace>
                                <img width="150px"
                                     src="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png"
                                     alt={mainName}
                                     className="img-fluid"/>
                            </Link>
                        </a>
                        <button className="navbar-toggler collapsed pe-0" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#navbarsMenu" aria-controls="navbarsMenu" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="toggler-icon top-bar"></span>
                            <span className="toggler-icon middle-bar"></span>
                            <span className="toggler-icon bottom-bar"></span>
                        </button>

                        <div className="offcanvas offcanvas-end" id="navbarsMenu"
                             aria-modal="true" role="dialog">
                            <div className="offcanvas-header">
                                <Link className="navbar-brand" href={process.env.NEXT_PUBLIC_HOME_ROUTER as string}>
                                    <img width="150px"
                                         src="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png"
                                         alt={mainName}
                                         className="img-fluid"/>
                                </Link>
                                <button type="button" className="navbar-toggler px-0" data-bs-dismiss="offcanvas" id={"close"}
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
                                                <li key={number} className="nav-item"
                                                    onClick={() => handleClickLabel(index, false)}>
                                                    <a className="nav-link active">
                                                        {index?.label}
                                                    </a>
                                                </li>
                                                :
                                                <li key={number} className="nav-item"
                                                    onClick={() => handleClickLabel(index, false)}>
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
                            <Link href={process.env.NEXT_PUBLIC_BOOKING_ROUTER as string}
                                  replace
                                  onClick={() => handleClickLabel({label: "", url: ""} as labelHeaderInterFace, true)}>
                                <button className="button icon-button ms-xl-4">
                                    <CalendarMonthIcon className="fa-solid fa-calendar-days" sx={{fontSize: 18}}
                                                       style={{paddingBottom: "3px", paddingRight: "2px"}}/>
                                    <span>Book Online</span>
                                    <span className="sticky">Book App</span>
                                </button>
                            </Link>
                            <Badge badgeContent={giftCardPage?.cartItem?.length} color="error">
                                <Link href={process.env.NEXT_PUBLIC_CART_ROUTER as string} replace onClick={() => handleClickLabel({
                                    label: "",
                                    url: ""
                                } as labelHeaderInterFace, true)}>
                                    <button className="button icon-button">

                                        <ShoppingCartIcon className="fa-solid fa-calendar-days" sx={{fontSize: 18}}
                                                          style={{paddingBottom: "3px", paddingRight: "2px"}}/>
                                        <span>Checkout</span>
                                        <span className="sticky">Checkout</span>
                                    </button>
                                </Link>
                            </Badge>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}


export default HeaderComponent