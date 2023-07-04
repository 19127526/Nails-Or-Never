import MainLayout from "@/components/layout/main";
import Head from "next/head";
import React from "react";
import {useDispatch} from "react-redux";
import {getDetailAboutUs} from "@/api-client/about-us/AboutUs.api";
import Link from "next/link";
import {mainName} from "@/constants/label";

const AboutUsPage = (props : any) => {
    const {aboutUs} = props
    const dispatch = useDispatch()
    return (
        aboutUs != null ?
            <>
                <Head>
                    <meta charSet="utf-8"/>
                    <meta httpEquiv="X-UA-Compatible"content="IE=edge"/>
                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                    <meta name="robots" content="max-image-preview:large"/>
                      <link ref="canonical" href="https://nailsornever.com"/>
                    <title>About us-{process.env.NEXT_PUBLIC_NAME_PRODUCT}</title>

                    <meta name="description" content={`Located conveniently in Malta, NewYork, 12118, 
                    ${process.env.NEXT_PUBLIC_NAME_PRODUCT} is one of the best salons in this area. ${process.env.NEXT_PUBLIC_NAME_PRODUCT} offers premier nails care and spa treatment services to satisfy your needs of enhancing natural beauty and refreshing your day.
                    mynewline Our salon takes pride in providing our valued customers all good services and top-high quality products as well as materials. 
                    You can find all nail-related services. At ${process.env.NEXT_PUBLIC_NAME_PRODUCT}, 
                    we take pride in providing you with all good products and qualified services to help you rejuvenate your beauty. 
                    You always feel friendly and welcome from our passionate staff who understand what you want.${aboutUs?.description}`}/>
                    <meta name="keywords"
                          content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} &amp; SPA,MALTA,About Us extensions`}/>
                    <meta property="og:url" content="https://nailsornever.com/"/>
                    <meta property="og:type" content="Website"/>
                    <meta property="og:title" content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} &amp-About Us; SPA`}/>
                    <meta property="og:description" content={`Located conveniently in Malta, NewYork, 12118, 
                    ${process.env.NEXT_PUBLIC_NAME_PRODUCT} is one of the best salons in this area. ${process.env.NEXT_PUBLIC_NAME_PRODUCT} offers premier nails care and spa treatment services to satisfy your needs of enhancing natural beauty and refreshing your day.
                    mynewline Our salon takes pride in providing our valued customers all good services and top-high quality products as well as materials. 
                    You can find all nail-related services. At ${process.env.NEXT_PUBLIC_NAME_PRODUCT}, 
                    we take pride in providing you with all good products and qualified services to help you rejuvenate your beauty. 
                    You always feel friendly and welcome from our passionate staff who understand what you want.${aboutUs?.description}`}/>
                    <meta property="og:image"
                          content="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png"/>
                    <meta name="generator"  content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>

                </Head>

                <div className="page-title"
                     style={{backgroundImage: "url(https://w20.wocmarketing.com/wp-content/themes/woctheme/assets/images/page-bg.jpg)"}}>
                    <div className="container-lg">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="text-center mb-0">About us</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="section-page-wrap">
                    <div className="container-lg">
                        <div className="row justify-content-center align-items-center gy-5 gx-3 g-lg-5">
                            <div className="col-sm-9 col-md-8 col-lg-6">
                                <img className="img-fluid"
                                     src="https://w20.wocmarketing.com/wp-content/themes/woctheme/assets/images/model-4.png"
                                     alt={`${mainName}`}
                                     loading="lazy"/>
                            </div>
                            <div className="col-lg-6">
                                <h3 className="sub-title fs-80">Welcome</h3>
                                <h2 className="title text-uppercase">Why We Are The Best</h2>
                                <p>{aboutUs?.description}</p>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-wrap section-parallax"
                         style={{backgroundImage: "url(https://w20.wocmarketing.com/wp-content/themes/woctheme/assets/images/parallax-1.jpg)"}}>
                    <div className="parallax-wrap">
                        <div className="container-lg">
                            <div className="row justify-content-center text-center gy-5 gx-3 g-lg-5">
                                <div className="col-lg-8">
                                    <h3 className="sub-title fs-80">Professional</h3>
                                    <h2 className="title text-uppercase text-white">We Create Beauty<br/>For Awesome
                                        People
                                    </h2>
                                    <p className="text-white mb-5">Our staff is highly trained and courteous
                                        professionals
                                        will tend to your every need. We are confident that you will enjoy our standards
                                        of
                                        excellence, service and cleanliness. If there is anything we can do to improve
                                        upon
                                        your experience, please let us know so we can better care for your needs!</p>
                                    <div className="button-group">
                                        <Link href={process.env.NEXT_PUBLIC_BOOKING_ROUTER as string}>
                                            <button className="button button-lg">Book Appointment</button>
                                        </Link>
                                        <Link href={process.env.NEXT_PUBLIC_GIFTCARDS_ROUTER as string}>
                                            <button className="button button-lg">Buy eGift Online</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
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
        const dataAboutUs = await detailAboutUs?.data;
        return {
            props: {
                aboutUs: dataAboutUs?.aboutUs[0]
            }
        }
    } catch (err) {
        return {
            props: {
                aboutUs: null,
            }
        }
    }
}

AboutUsPage.Layout = MainLayout
export default AboutUsPage