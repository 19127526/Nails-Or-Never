import MainLayout from "@/components/layout/main";
import Script from "next/script";
import Head from "next/head";
import React, {ChangeEvent, useEffect, useState} from "react";
import CardGalleryComponent from "@/components/gallery/card";
import {Avatar, List, Pagination} from "@mui/material";
import CardGiftComponent from "@/components/giftcard/card";
import {useRouter} from "next/router";
import {getGiftCardPagination} from "@/api-client/gift-card/GiftCard.api";
import VirtualList from "rc-virtual-list";
import {useDispatch, useSelector} from "react-redux";
import {turnOffLoading} from "@/components/loading/index.actions";
import image from "../../public/images/Untitled.jpeg"
const GiftCardPage = (props : any) => {
    const {giftCard} = props
    const [pagination, setPagination] = useState<number>(1);
    const route = useRouter()

    const dispatch = useDispatch()

    useEffect(() => {
    }, [route?.query?.page])
    const handleChangePagination = (event: ChangeEvent<unknown>, value: number) => {
        route.push({
            query : {
                page : value
            }
        })
        setPagination(value)
    }
    return (
        giftCard != null ?
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
                <meta name="generator" content="Nails Or Never"/>
                <title>Gift card - {process.env.NEXT_PUBLIC_NAME_PRODUCT} - Malta</title>
                <meta charSet="utf-8"/>
                <meta httpEquiv="X-UA-Compatible"content="IE=edge"/>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
                <meta name="robots" content="index,follow"/>
                  <link ref="canonical" href="https://nailsornever.com"/>

                <meta name="description" content={`Located conveniently in Malta, NewYork, 12118,
                        ${process.env.NEXT_PUBLIC_NAME_PRODUCT} is one of the best salons in this area. ${process.env.NEXT_PUBLIC_NAME_PRODUCT} offers premier nails care and spa treatment services to satisfy your needs of enhancing natural beauty and refreshing your day.
                        mynewline Our salon takes pride in providing our valued customers all good services and top-high quality products as well as materials.
                        also, we provide some gift card such as  ${[...giftCard?.giftCard]?.map(index => `${index?.theme}`)}. 
                        Let your sweetheart know how much you love and care for him/her by sending our love cards! Buy our gift card for your loved one.`}/>
                <meta name="keywords"
                      content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} &amp; SPA,MALTA,GiftCard extensions`}/>
                <meta property="og:url" content="https://nailsornever.com/"/>
                <meta property="og:type" content="Website"/>
                <meta property="og:title" content={`Gift card - ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>
                <meta property="og:description" content={`Located conveniently in Malta, NewYork, 12118,
                        ${process.env.NEXT_PUBLIC_NAME_PRODUCT} is one of the best salons in this area. ${process.env.NEXT_PUBLIC_NAME_PRODUCT} offers premier nails care and spa treatment services to satisfy your needs of enhancing natural beauty and refreshing your day.
                        mynewline Our salon takes pride in providing our valued customers all good services and top-high quality products as well as materials.
                        also, we provide some gift card such as  ${[...giftCard?.giftCard]?.map(index => `${index?.theme}`)}. 
                        Let your sweetheart know how much you love and care for him/her by sending our love cards! Buy our gift card for your loved one.`}/>
                <meta property="og:image"
                      content="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png"/>
                <meta name="generator"  content={`Gift card - ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>
            </Head>
            <div className="page-title"
                 style={{backgroundImage: `url(${image.src})`}}>
                <div className="container-lg">
                    <div className="row">
                        <div className="container-lg">
                            <div className="col-lg-8">
                                <h3 className="sub-title fs-80">GiftCards</h3>
                                <h2 className="title text-uppercase text-black">NAILS OR NEVER</h2>
                                <p className="text-black mb-5">Let your sweetheart know how much you love and care for him/her by sending our love cards! Buy our gift card for your loved one.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="section-page-wrap" style={{paddingTop: "30px", paddingBottom : "30px"}}>
                <div className="container-lg">
                    <div className="row g-2">
                        {
                            [...giftCard?.giftCard]?.map((index : any) =>
                                <CardGiftComponent detail={index as any}/>
                            )
                        }

                    </div>

                    <div className="col-lg-12">
                        <nav className="text-center">
                            <ul className="pagination justify-content-center mt-5 mb-0">
                                <Pagination count={giftCard?.pages} onChange={handleChangePagination} page={pagination} />
                            </ul>
                        </nav>
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
        const {params} = context ?? "1"
        const page = context?.query?.page ?? "1";
        // `getStaticProps` is executed on the server side.
        const services = await getGiftCardPagination( page as number,  6)
        const data = await services?.data
        return {
            props: {
                giftCard: data,
            }
        }
    }
    catch (err) {
        return {
            props: {
                giftCard: null,
            }
        }
    }
}

GiftCardPage.Layout = MainLayout
export default GiftCardPage

