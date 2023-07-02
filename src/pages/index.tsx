import MainLayout from "@/components/layout/main";
import {useDispatch} from "react-redux";
import {getDetailAboutUs} from "@/api-client/about-us/AboutUs.api";
import {getSubServicePagination} from "@/api-client/service/Services.api";
import React from "react";
import Link from "next/link";
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@mui/material'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Logo from '../images/Logo.png';
import { Image } from 'antd';
import {getGalleryPagination} from "@/api-client/gallery/Gallery.api";
import Head from "next/head";
import {mainName} from "@/constants/label";

function Item({item}) {
    return (
        <Paper style={{
            backgroundImage: "url(https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png)",
            transition: "background .3s,border .3s,border-radius .3s,box-shadow .3s"}}>
            <div className="banner-content">
                <div className="container-lg" style={{paddingTop :"20px"}}>
                    <div className="row justify-content-center align-items-center gx-5">
                        <div className="col-lg-6 order-2 order-lg-1 text-center text-lg-start">
                            <div className="banner-img-group mb-4 mb-sm-5">
                                <div className="row justify-content-center g-3">
                                    {/*<div className="col-8 col-lg-8">*/}
                                    {/*    <div className="ratio ratio-16x9">*/}
                                    {/*        <div>*/}
                                    {/*            <img*/}
                                    {/*                src='https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png'*/}
                                    {/*                alt={`${mainName}-${item?.name}`}*/}
                                    {/*                loading="lazy"/>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                            <h2 className="banner-title">{item?.name}</h2>

                            <Link className="banner-link"
                               href={process.env.NEXT_PUBLIC_SERVICES_ROUTER} replace>View
                                more<ArrowForwardIcon/></Link>
                        </div>
                        <div className="col-12 col-sm-8 col-md-6 col-lg-6 order-1 order-lg-2">
                            <div className="ratio ratio-1x1">
                                <div className="banner-img-wrap">
                                    <div className="banner-img-border">
                                        <div className="banner-img">
                                            <img
                                                src={item.image} alt={`${mainName}-${item?.name}`}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Paper>
    )
}


const HomePage = ({aboutUs, services, galleryParent}) => {
    const dispatch = useDispatch()


    return (
        aboutUs != null && services != null && galleryParent != null ?
            <>
                <Head>
                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                    <meta name="generator" content="Nails Or Never"/>
                    <title>{process.env.NEXT_PUBLIC_NAME_PRODUCT} – Nail Care & Nail Arts</title>
                </Head>
                <Carousel
                    fullHeightHover={false}     // We want the nav buttons wrapper to only be as big as the button element is
                    NextIcon={<ArrowCircleRightIcon/>}
                    PrevIcon={<ArrowCircleLeftIcon/>}
                    interval={2000}
                >
                    {
                        [...services?.services]?.map((index, i) => <Item key={i} item={index}/>)
                    }
                </Carousel>
                <section className="section-wrap section-about">
                    <div className="container-lg">
                        <div className="row justify-content-center align-items-center gy-5 gx-3 g-lg-5">
                            <div className="col-sm-9 col-md-8 col-lg-6">
                                <img className="img-fluid"
                                     src="https://nails.shoedog.vn/public/images/model-1.png"
                                     alt={mainName}
                                     loading="lazy"/>
                            </div>
                            <div className="col-lg-6">
                                <h3 className="sub-title fs-80">About us</h3>
                                <h2 className="title text-uppercase">Why Clients Choose Us</h2>
                                <p className="mb-3">{aboutUs?.description}</p>
                                <Link href={process.env.NEXT_PUBLIC_ABOUT_US_ROUTER} replace>
                                    <button className="button button-lg mt-5">Read more</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-wrap section-services">
                    <div className="container-lg">
                        <div className="heading-flex mb-4">
                            <h2 className="title text-uppercase">Services for<br/>the best clients</h2>
                            <h3 className="sub-title">Our services</h3>
                        </div>
                        <div className="row justify-content-center gy-4 gx-3 gx-sm-4 g-lg-5">
                            {
                                [...services?.services]?.map(index =>
                                    <div className="col-6 col-md-4 col-lg-4 col-xl-3" key={index?.id}>
                                        <div className="service-item">
                                            <a className="service-img-link">
                                                <div className="service-img-wrap">
                                                    <div className="service-img">
                                                        <img
                                                            src={index?.image}
                                                            alt={`${mainName}-${index?.name}`}/>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="service-link">
                                                <h4 className="service-title">{index?.name}</h4>
                                            </a>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </section>

                <section className="section-wrap section-services">
                    <div className="container-lg">
                        <div className="heading-flex mb-4">
                            <h2 className="title text-uppercase">Collection</h2>
                            <h3 className="sub-title">Our gallery</h3>
                        </div>
                        <div className="row justify-content-center gy-4 gx-3 gx-sm-4 g-lg-5">
                            {
                                [...galleryParent?.galleryParent]?.map(index =>
                                    <div className="col-6 col-md-4 col-lg-4 col-xl-3" key={index?.id}>
                                        <div className="service-item">
                                            <Link className="service-img-link" href={process.env.NEXT_PUBLIC_GALLERY_ROUTER+`/detail/${index?.theme}`} replace>
                                                <div className="service-img-wrap">
                                                    <div className="service-img">
                                                        <img
                                                            src={index?.image}
                                                            alt={`${mainName}-${index?.theme}`}/>
                                                    </div>
                                                </div>
                                            </Link>
                                            <a className="service-link">
                                                <h4 className="service-title">{index?.theme}</h4>
                                            </a>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </section>
            </>
            :
            <></>
    )
}

export async function getServerSideProps(context) {
    try {
        const detailAboutUs = await getDetailAboutUs()
        const services = await getSubServicePagination({page: 1, limit: 6});

        const gallery = await getGalleryPagination({page : 1, limit : 6})
        const dataGallery = await gallery?.data
        const dataAboutUs = await detailAboutUs?.data;
        const dataService = await services?.data
        return {
            props: {
                aboutUs: dataAboutUs?.aboutUs[0],
                services: dataService,
                galleryParent: dataGallery,
            }
        }
    } catch (err) {
        return {
            props: {
                aboutUs: null,
                services: null,
                galleryParent: null,
            }
        }
    }
}

HomePage.Layout = MainLayout

export default HomePage

