import MainLayout from "@/components/layout/main";
import {Pagination} from "@mui/material";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useRouter} from "next/router";
import CardGalleryComponent from "@/components/gallery/card";
import Head from "next/head";
import {getGalleryPagination} from "@/api-client/gallery/Gallery.api";
import {turnOffLoading} from "@/components/loading/index.actions";
import {useDispatch} from "react-redux";

const GalleryPage = (props : any) => {
    const {galleryParent} = props
    const [pagination, setPagination] = useState<number>(1)
    const route = useRouter();
    const dispatch = useDispatch()
    const handleChangePagination = (event: ChangeEvent<unknown>, value: number) => {
        route.push({
            query : {
                page : value
            }
        })
        setPagination(value)
    }
    return (
        galleryParent != null ?
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
                <meta name="generator" content="Nails Or Never"/>
                <title>Gallery Nail-{process.env.NEXT_PUBLIC_NAME_PRODUCT}</title>
                <meta charSet="utf-8"/>
                <meta httpEquiv="X-UA-Compatible"content="IE=edge"/>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
                <meta name="robots" content="max-image-preview:large"/>
                  <link ref="canonical" href="https://nailsornever.com"/>
                <meta name="description" content={`Located conveniently in Malta, NewYork, 12118,
                        ${process.env.NEXT_PUBLIC_NAME_PRODUCT} is one of the best salons in this area. ${process.env.NEXT_PUBLIC_NAME_PRODUCT} offers premier nails care and spa treatment services to satisfy your needs of enhancing natural beauty and refreshing your day.
                        mynewline Our salon takes pride in providing our valued customers all good services and top-high quality products as well as materials.
                        also, we provide some gallery such as ${[...galleryParent?.galleryParent]?.map(index => `${index?.theme}`)}. 
                       Let's come to our nail salon to see how deluxe salon & the unique nail art only at our salon`}/>
                <meta name="keywords"
                      content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} &amp; SPA,MALTA,Gallery extensions`}/>
                <meta property="og:url" content="https://nailsornever.com/"/>
                <meta property="og:type" content="Website"/>
                <meta property="og:title" content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} &amp-Gallery; SPA`}/>
                <meta property="og:description" content={`Located conveniently in Malta, NewYork, 12118,
                        ${process.env.NEXT_PUBLIC_NAME_PRODUCT} is one of the best salons in this area. ${process.env.NEXT_PUBLIC_NAME_PRODUCT} offers premier nails care and spa treatment services to satisfy your needs of enhancing natural beauty and refreshing your day.
                        mynewline Our salon takes pride in providing our valued customers all good services and top-high quality products as well as materials.
                        also, we provide some gallery such as ${[...galleryParent?.galleryParent]?.map(index => `${index?.theme}`)}. 
                       Let's come to our nail salon to see how deluxe salon & the unique nail art only at our salon`}/>
                <meta property="og:image"
                      content="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png"/>
                <meta name="generator"  content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>
            </Head>
            <div className="page-title"
                 style={{backgroundImage: "url(https://w20.wocmarketing.com/wp-content/themes/woctheme/assets/images/page-bg.jpg)"}}>
                <div className="container-lg">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="text-center mb-0">Our Gallery</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section className="section-page-wrap"  style={{paddingTop: "30px", paddingBottom : "30px"}}>
                <div className="container-lg">
                    <div className="row g-2">
                        {
                            [...galleryParent?.galleryParent]?.map((index : any) => <CardGalleryComponent galleryDetail={index as any}/>)
                        }
                    </div>

                    <div className="col-lg-12">
                        <nav className="text-center">
                            <ul className="pagination justify-content-center mt-5 mb-0">
                                <Pagination count={galleryParent?.pages} onChange={handleChangePagination} page={pagination} />
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
        const page = context?.query?.page ?? "1";
        // `getStaticProps` is executed on the server side.
        const gallery = await getGalleryPagination( page as number, 6 as number)
        const data = await gallery?.data
        return {
            props: {
                galleryParent: data,
            }
        }
    }
    catch (err) {
        return {
            props: {
                galleryParent: null,
            }
        }
    }
}

GalleryPage.Layout = MainLayout

export default GalleryPage