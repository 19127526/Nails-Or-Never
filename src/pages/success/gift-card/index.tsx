import MainLayout from "@/components/layout/main";
import Head from "next/head";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {turnOffLoading} from "@/components/loading/index.actions";
import {useRouter} from "next/router";
import Link from "next/link";
import {mainName} from "@/constants/label";
// import image from "../../../public/images/Untitled.jpeg"
import image from "../../public/images/banner-helloween.jpg"

const GiftCardSuccessPage = () => {
    const dispatch = useDispatch()
    const router = useRouter();
    const name = router.query?.name == undefined ? '' : router.query?.name
    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <meta httpEquiv="X-UA-Compatible"content="IE=edge"/>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
                <meta name="robots" content="index,follow"/>
                  <link ref="canonical" href="https://nailsornever.com"/>
                <title>Checkout Success - {process.env.NEXT_PUBLIC_NAME_PRODUCT} - Malta</title>
                <meta name="description" content={`We have many years of experience in the
                                nail industry. Renowned for its friendly, unpretentious staff, esthetically pleasing and
                                soothing atmosphere and more notable for its qualified and certified professionals. You
                                will feel the difference the minute you walk through our door.`}/>
                <meta name="keywords"
                      content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} &amp; SPA,MALTA,Checkout Success extensions`}/>
                <meta property="og:url" content="https://nailsornever.com/"/>
                <meta property="og:type" content="Website"/>
                <meta property="og:title" content={`Checkout Success - ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>
                <meta property="og:description" content={`We have many years of experience in the
                                nail industry. Renowned for its friendly, unpretentious staff, esthetically pleasing and
                                soothing atmosphere and more notable for its qualified and certified professionals. You
                                will feel the difference the minute you walk through our door.`}/>
                <meta property="og:image"
                      content="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png"/>
                <meta name="generator"   content={`Checkout Success - ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>
            </Head>

            <div className="page-title"
                 style={{backgroundImage: `url(${image.src})`}}>
                <div className="container-lg">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="text-center mb-0">Checkout Success</h1>
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
                                 loading="lazy"  alt={`${mainName}`}/>
                        </div>
                        <div className="col-lg-6">
                            <h3 className="sub-title fs-80">Thank you for your checkout gift card, {name}!</h3>
                            <h2 className="title text-uppercase">We hope to see you again soon!</h2>
                            <p className="mb-3">At <strong>Nails Or Never</strong>, we have many years of experience in the
                                nail industry. Renowned for its friendly, unpretentious staff, esthetically pleasing and
                                soothing atmosphere and more notable for its qualified and certified professionals. You
                                will feel the difference the minute you walk through our door. </p>
                            <p></p>
                            <div className="button-group" style={{display :"flex", justifyContent:"center"}}>
                                <Link href={process.env.NEXT_PUBLIC_HOME_ROUTER as string} replace>
                                    <button className="button button-lg">Return Home Page</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/*<section className="section-page-wrap section-testimonial">*/}
            {/*    <div className="container-lg">*/}
            {/*        <div className="row justify-content-center align-items-center gy-5 gx-3 g-lg-5">*/}
            {/*            <div className="col-xl-5">*/}
            {/*                <img className="img-fluid"*/}
            {/*                     src="https://w20.wocmarketing.com/wp-content/themes/woctheme/assets/images/model-2.png"*/}
            {/*                     loading="lazy"/>*/}
            {/*            </div>*/}
            {/*            <div className="col-xl-7">*/}
            {/*                <div className="heading-flex mb-4">*/}
            {/*                    <h2 className="title text-uppercase">What clients<br/>say about us</h2>*/}
            {/*                    <h3 className="sub-title">Reviews</h3>*/}
            {/*                </div>*/}
            {/*                <div className="testimonial-wrap">*/}
            {/*                    <div className="testimonial-slider flickity-enabled is-draggable" tabIndex="0">*/}
            {/*                        <div className="flickity-viewport" style={{height: "396.8px", touchAction: "pan-y"}}>*/}
            {/*                            <div className="flickity-slider"*/}
            {/*                                 style={{left: "0px", transform: "translateX(-100%)"}}>*/}
            {/*                                <div className="testimonial-item"*/}
            {/*                                     style={{position: "absolute", left: "0px", transform: "translateX(0 %)"}}*/}
            {/*                                     aria-hidden="true">*/}
            {/*                                    <p>The staff at WOC Print are truly wonderful. They are kind, and are*/}
            {/*                                        willing to answer any questions that you may have. I've been to them*/}
            {/*                                        twice already: Once for waxing (eyebrows) and just today I went in*/}
            {/*                                        for nails enhancement. Honestly, it was the best service that I have*/}
            {/*                                        ever received! Not too bad on the prices either. Definitely worth*/}
            {/*                                        every penny that I paid today.</p>*/}
            {/*                                    <h5>Josie Healy</h5>*/}
            {/*                                </div>*/}
            {/*                                <div className="testimonial-item is-selected"*/}
            {/*                                     style={{position: "absolute", left: "0px", transform: "translateX(100%)"}}>*/}
            {/*                                    <p>Great place for a nice and quick beauty or you can get the works and*/}
            {/*                                        be pampered. My patience for nail salons can be low so quick and*/}
            {/*                                        well done is super up my alley! I live no where near here but still*/}
            {/*                                        drive up and am always greeted with a smile.</p>*/}
            {/*                                    <h5>Elin Watt</h5>*/}
            {/*                                </div>*/}
            {/*                                <div className="testimonial-item"*/}
            {/*                                     style={{position: "absolute", left: "0px", transform: "translateX(200%)"}}*/}
            {/*                                     aria-hidden="true">*/}
            {/*                                    <p>I love going here. Every one who works here are so great, they are*/}
            {/*                                        always friendly and couteous and so patient with me! Plus the*/}
            {/*                                        eyebrows waxing is amazing! I definatly recommend going to WOC Print*/}
            {/*                                        for a beauty! The prices are reasonable &amp; the service is usually*/}
            {/*                                        quite quick. The location is convenient &amp; the salon is always*/}
            {/*                                        very clean. I highly recommend WOC Print!!!</p>*/}
            {/*                                    <h5>Samanta P.</h5>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <ol className="flickity-page-dots">*/}
            {/*                            <li className="dot" aria-label="Page dot 1"></li>*/}
            {/*                            <li className="dot is-selected" aria-label="Page dot 2"*/}
            {/*                                aria-current="step"></li>*/}
            {/*                            <li className="dot" aria-label="Page dot 3"></li>*/}
            {/*                        </ol>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
        </>
    )
}

GiftCardSuccessPage.Layout = MainLayout
export default GiftCardSuccessPage