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

const GiftCardPage = ({giftCard}) => {
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
                <title>{process.env.NEXT_PUBLIC_NAME_PRODUCT} – Gift card</title>
            </Head>
            <div className="page-title"
                 style={{backgroundImage: "url(https://w20.wocmarketing.com/wp-content/themes/woctheme/assets/images/page-bg.jpg)"}}>
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
                            [...giftCard?.giftCard]?.map(index =>
                                <CardGiftComponent detail={index}/>
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

export async function getServerSideProps(context) {
    try {
        const {params} = context ?? "1"
        const page = context?.query?.page ?? "1";
        // `getStaticProps` is executed on the server side.
        const services = await getGiftCardPagination({page : page, limit: 6})
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

