import MainLayout from "@/components/layout/main";
import Head from "next/head";
import React from "react";
import {useDispatch} from "react-redux";
import {getDetailAboutUs} from "@/api-client/about-us/AboutUs.api";
import Link from "next/link";
import {mainName} from "@/constants/label";

const AboutUsPage = ({aboutUs}) => {
    const dispatch = useDispatch()
    return (
        aboutUs != null ?
            <>
                <Head>
                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                    <meta name="generator" content="Nails Or Never"/>
                    <title>{process.env.NEXT_PUBLIC_NAME_PRODUCT} – About us</title>
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
                                        <Link href={process.env.NEXT_PUBLIC_BOOKING_ROUTER}>
                                            <button className="button button-lg">Book Appointment</button>
                                        </Link>
                                        <Link href={process.env.NEXT_PUBLIC_GIFTCARDS_ROUTER}>
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


export async function getServerSideProps(context) {
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