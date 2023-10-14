import React, {useEffect, useLayoutEffect, useState} from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {getDetailAboutUs} from "@/api-client/about-us/AboutUs.api";
import {convertWorkingHourToArray, getTimeAndUnit} from "@/utils/format-working-hour";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import Link from "next/link";


const FooterComponent = () => {
    const [detailAboutUs, setDetailAboutUs] = useState({
        id : undefined,
        name : undefined,
        description : undefined,
        working_hour : undefined,
        tel : undefined,
        email : undefined,
        address : undefined,
        footage : undefined
    })
    useLayoutEffect(() => {
        const getDetailAboutUsApi = async () => {
            await getDetailAboutUs()
                .then(res => {
                    setDetailAboutUs(res?.data?.aboutUs[0])
                })
                .catch(err => {
                    console.log(err)
                })
        }
        getDetailAboutUsApi()
    }, [])
    return (
        <>
            <button id="btnScrollTop" title="Go to top" style={{display: "inline-block;"}}>
                <KeyboardArrowUpIcon className="fas fa-chevron-up" sx={{ fontSize: 30 }} />
                </button>
            <a className="btn-phone" href={`tel:${detailAboutUs?.tel}`} rel="nofollow">
                <div className="phone-group phone-green phone-show">
                    <div className="phone-ph-circle"></div>
                    <div className="phone-ph-circle-fill"></div>
                    <div className="phone-ph-img-circle"></div>
                </div>
            </a>
        <footer id="footer" className="footer">
            <div className="footer-main">
                <div className="container-lg">
                    <div className="row gy-5 gx-3 g-lg-4">
                        <div className="col-md-4 col-xl-2">
                            <h3 className="footer-col-title">Links</h3>
                            <div className="footer-col-content">
                                <Link href={`${process.env.NEXT_PUBLIC_SERVICES_ROUTER}`} replace>
                                    <p>Our Services</p>
                                </Link>
                                <Link href={`${process.env.NEXT_PUBLIC_GALLERY_ROUTER}`} replace>
                                    <p>Gallery</p>
                                </Link>
                                <Link href={`${process.env.NEXT_PUBLIC_ABOUT_US_ROUTER}`} replace>
                                    <p>About Us</p>
                                </Link>
                                <Link href={`${process.env.NEXT_PUBLIC_CONTACT_ROUTER}`} replace>
                                    <p>Contact</p>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-4 col-xl-3">
                            <h3 className="footer-col-title">Operation hours</h3>
                            <div className="footer-col-content">
                                {
                                    detailAboutUs?.id != undefined ?
                                        convertWorkingHourToArray(detailAboutUs?.working_hour)?.map((index, number) =>(
                                            <p key={number}>{index?.date}: {getTimeAndUnit(index?.time?.start)} - {getTimeAndUnit(index?.time?.end)} </p>
                                        ))
                                    :
                                    <></>
                                }
                            </div>
                        </div>
                        <div className="col-md-4 col-xl-4">
                            <h3 className="footer-col-title">Contact</h3>
                            <div className="footer-col-content">
                                <p>
                                    <LocationOnIcon className="fa-solid fa-location-dot me-2"/>
                                    <a target="_blank" href={`https://goo.gl/maps/2Wa838Gd6xxbD75h7`}>
                                    {detailAboutUs?.address} </a>
                                </p>
                                <p>
                                    <LocalPhoneIcon className="fa-solid fa-phone me-2"/>
                                    <a href={`tel:${detailAboutUs?.tel}`}>
                                        {detailAboutUs?.tel} </a>
                                </p>
                                <p>
                                    <EmailIcon className="fa-solid fa-envelope me-2"/>
                                    <a href={`mailto:${detailAboutUs?.email}`}>
                                        {detailAboutUs?.email} </a>
                                </p>
                                <ul className="list-social">
                                    <li><a target="_blank" href="#">
                                        <FacebookIcon className="fa-solid fa-calendar-days" sx={{fontSize: 20}}/>
                                    </a></li>

                                    <li><a target="_blank" href="#">
                                        <InstagramIcon className="fa-solid fa-calendar-days" sx={{fontSize: 20}}/>
                                    </a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 order-md-1">
                            <iframe
                                src="https://www.google.com/maps/embed/v1/place?q=2374+US-9,+Mechanicville,+NY+12118,+Hoa+Kỳ&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                                width="100%" height="300" style={{border:"0"}} loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-absolute">
                <div className="container-lg">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center py-2 fs-6 text-white">
                                <span className="d-block">© 2023 <strong>Nails or Never</strong></span>
                                <span className="small d-block ">Designed by
                                    <a target="_blank"
                                       href='mailto:phamtienquan2001@gmail.com'>
                                        <strong className={"text-white"}> NAILS OR NEVER &amp; WEB DESIGN</strong>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}






export default FooterComponent