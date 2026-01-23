import React, {useEffect, useState} from "react";
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from "next/image";
import Logo from '../../images/Logo.png'
import {labelHeaderInterFace} from "@/model/header";
import {labelHeader, mainName} from "@/constants/label";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from "next/link";
import {Badge} from "@mui/material";

const HeaderComponent = () => {
    const [activeLabel, setActiveLabel] = useState<labelHeaderInterFace>();
    const [isSticky, setIsSticky] = useState(false);
    const router = useRouter()
    const dispatch = useDispatch();
    const giftCardPage = useSelector((state : any) => state.GiftCardPage)
    const { scrollY } = useScroll();
    const headerBackground = useTransform(
      scrollY,
      [0, 100],
      ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.98)']
    );
    
    // Logo scale animation based on scroll
    const logoScale = useTransform(scrollY, [0, 100], [1, 0.67]); // 150px -> 100px (150 * 0.67 ≈ 100)
    const logoWidth = useTransform(scrollY, [0, 100], [150, 100]);

    useEffect(() => {
        if (labelHeader?.filter(index => router?.pathname == index?.url)[0] == undefined) {
            setActiveLabel({label: '', url: ''})
        } else {
            setActiveLabel(labelHeader?.filter(index => router?.pathname == index?.url)[0])
        }
    }, [router.pathname])

    useEffect(() => {
        const unsubscribe = scrollY.on('change', (latest) => {
            setIsSticky(latest > 0);
            // Add/remove sticky class for CSS compatibility
            const header = document.getElementById('header');
            if (header) {
                if (latest > 0) {
                    header.classList.add('sticky');
                } else {
                    header.classList.remove('sticky');
                }
            }
        });

        return () => unsubscribe();
    }, [scrollY]);
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
        <motion.header 
            id="header" 
            className={`header ${isSticky ? 'sticky' : ''}`}
            style={{ 
                backgroundColor: headerBackground,
            }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
            <div className="header-main">
                <div className="container-lg">
                    <nav className="navbar navbar-expand-xxl" aria-label="Eighth navbar example">
                        <a className="navbar-brand">
                            <Link href={process.env.NEXT_PUBLIC_HOME_ROUTER as string} replace>
                                <motion.div
                                    style={{
                                        width: logoWidth,
                                        height: 'auto',
                                        display: 'inline-block'
                                    }}
                                >
                                    <Image
                                        width={150}
                                        height={60}
                                        src="/images/Nails or Never-01 (1).png"
                                        alt={`${mainName} - Professional Nail Salon Logo in Malta, NY`}
                                        className="img-fluid"
                                        priority={true}
                                        quality={90}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            transition: 'width 0.3s ease'
                                        }}
                                    />
                                </motion.div>
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
                                    <Image
                                        width={150}
                                        height={60}
                                        src="/images/Nails or Never-01 (1).png"
                                        alt={`${mainName} - Professional Nail Salon Logo in Malta, NY`}
                                        className="img-fluid"
                                        priority={true}
                                        quality={90}
                                        style={{
                                            width: '150px',
                                            height: 'auto'
                                        }}
                                    />
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
                                                    style={{
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => handleClickLabel(index, false)}>
                                                    <a className="nav-link active">
                                                        {index?.label}
                                                    </a>
                                                </li>
                                                :
                                                <li key={number} className="nav-item"
                                                    style={{
                                                        cursor: 'pointer'
                                                    }}
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
                            <Link href={process.env.NEXT_PUBLIC_BOOKING_URL as string}
                                  target="_blank"
                                  replace
                                  onClick={() => handleClickLabel({label: "", url: ""} as labelHeaderInterFace, true)}>
                                <button className="button icon-button ms-xl-4">
                                    <CalendarMonthIcon className="fa-solid fa-calendar-days" sx={{fontSize: 18}}
                                                       style={{paddingBottom: "3px", paddingRight: "2px"}}/>
                                    <span>Book Now</span>
                                    <span className="sticky">Book Now</span>
                                </button>
                            </Link>

                            <Link href={process.env.NEXT_PUBLIC_GIFTCARDS_ROUTER as string}
                                  replace
                                  onClick={() => handleClickLabel({label: "", url: ""} as labelHeaderInterFace, true)}>
                                <button className="button icon-button ms-xl-4">
                                    <CardGiftcardIcon className="fa-solid fa-calendar-days" sx={{fontSize: 18}}
                                                       style={{paddingBottom: "3px", paddingRight: "2px"}}/>
                                    <span>Gift Cards</span>
                                    <span className="sticky">Gift Cards</span>
                                </button>
                            </Link>
                            {/*Check out*/}
                            {/*<Badge badgeContent={giftCardPage?.cartItem?.length} color="error">*/}
                            {/*    <Link href={process.env.NEXT_PUBLIC_CART_ROUTER as string} replace onClick={() => handleClickLabel({*/}
                            {/*        label: "",*/}
                            {/*        url: ""*/}
                            {/*    } as labelHeaderInterFace, true)}>*/}
                            {/*        <button className="button icon-button">*/}

                            {/*            <ShoppingCartIcon className="fa-solid fa-calendar-days" sx={{fontSize: 18}}*/}
                            {/*                              style={{paddingBottom: "3px", paddingRight: "2px"}}/>*/}
                            {/*            <span>Checkout</span>*/}
                            {/*            <span className="sticky">Checkout</span>*/}
                            {/*        </button>*/}
                            {/*    </Link>*/}
                            {/*</Badge>*/}
                        </div>
                    </nav>
                </div>
            </div>
        </motion.header>
    )
}


export default HeaderComponent