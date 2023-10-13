import MainLayout from "@/components/layout/main";
import {getDetailAboutUs} from "@/api-client/about-us/AboutUs.api";
import {getSubServicePagination} from "@/api-client/service/Services.api";
import React from "react";
import Link from "next/link";
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@mui/material'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {getGalleryPagination} from "@/api-client/gallery/Gallery.api";
import Head from "next/head";
import {mainName} from "@/constants/label";


function Item(props : any) {
    const {item} = props
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
                            <h2 className="banner-title "  style={{marginBottom : "0px"}}>{item?.name}</h2>

                            <Link className="banner-link"
                               href={process.env.NEXT_PUBLIC_SERVICES_ROUTER as string} replace>View
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


const HomePage = (props : any) => {
    const {aboutUs, services, galleryParent} = props
    return (
        aboutUs != null && services != null && galleryParent != null ?
            <>
                <Head>
                    <meta charSet="utf-8"/>
                    <meta httpEquiv="X-UA-Compatible"content="IE=edge"/>
                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                    <meta name="robots" content="index,follow"/>
                      <link ref="canonical" href="https://nailsornever.com"/>
                    <title>{process.env.NEXT_PUBLIC_NAME_PRODUCT} - Professional nails care services in Malta,NY</title>
                    <meta name="description" content={`Located conveniently in Malta, NewYork, 12118, 
                    ${process.env.NEXT_PUBLIC_NAME_PRODUCT} is one of the best salons in this area. ${process.env.NEXT_PUBLIC_NAME_PRODUCT} offers premier nails care and spa treatment services to satisfy your needs of enhancing natural beauty and refreshing your day.
                    mynewline Our salon takes pride in providing our valued customers all good services and top-high quality products as well as materials. 
                    You can find all nail-related services, from ${[...services?.services]?.map(index => `${index?.name}`)}. At ${process.env.NEXT_PUBLIC_NAME_PRODUCT}, 
                    we take pride in providing you with all good products and qualified services to help you rejuvenate your beauty. 
                    You always feel friendly and welcome from our passionate staff who understand what you want.`}/>
                    <meta name="keywords"
                          content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} &amp; SPA,MALTA,${[...services?.services]?.map(index => `${index?.name}`)} extensions`}/>
                    <meta property="og:url" content="https://nailsornever.com/"/>
                    <meta property="og:type" content="Website"/>
                    <meta property="og:image"
                          content="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png"/>
                    <meta property="og:title" content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} - Professional nails care services in Malta,NY 12118`}/>
                    <meta property="og:description" content={`Located conveniently in Malta, NewYork, 12118, 
                    ${process.env.NEXT_PUBLIC_NAME_PRODUCT} is one of the best salons in this area. ${process.env.NEXT_PUBLIC_NAME_PRODUCT} offers premier nails care and spa treatment services to satisfy your needs of enhancing natural beauty and refreshing your day.
                    mynewline Our salon takes pride in providing our valued customers all good services and top-high quality products as well as materials. 
                    You can find all nail-related services, from ${[...services?.services]?.map(index => `${index?.name}`)}. At ${process.env.NEXT_PUBLIC_NAME_PRODUCT}, 
                    we take pride in providing you with all good products and qualified services to help you rejuvenate your beauty. 
                    You always feel friendly and welcome from our passionate staff who understand what you want.`}/>
                    <meta name="generator"  content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} - Professional nails care services in Malta,NY 12118`}/>

                </Head>
                <Carousel
                    fullHeightHover={false}
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
                                <Link href={process.env.NEXT_PUBLIC_ABOUT_US_ROUTER as string} replace>
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
                                            <Link className="service-img-link" href={process.env.NEXT_PUBLIC_GALLERY_ROUTER+`/detail/${index?.theme}` as string} replace>
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

export async function getServerSideProps(context : any) {
    try {
        const detailAboutUs = await getDetailAboutUs()
        const services = await getSubServicePagination( 1,  6);

        const gallery = await getGalleryPagination(  1, 6)
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

