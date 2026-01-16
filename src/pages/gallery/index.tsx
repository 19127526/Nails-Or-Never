import MainLayout from "@/components/layout/main";
import {Pagination} from "@mui/material";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useRouter} from "next/router";
import CardGalleryComponent from "@/components/gallery/card";
import Head from "next/head";
import {getGalleryPagination} from "@/api-client/gallery/Gallery.api";
import {turnOffLoading} from "@/components/loading/index.actions";
import {useDispatch} from "react-redux";
import HeaderTitle from "@/components/header-title";
import { motion } from "framer-motion";
import CollectionsIcon from '@mui/icons-material/Collections';

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
                <title>Gallery Nail - {process.env.NEXT_PUBLIC_NAME_PRODUCT} - Malta</title>
                <meta charSet="utf-8"/>
                <meta httpEquiv="X-UA-Compatible"content="IE=edge"/>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
                <meta name="robots" content="index,follow"/>
                <link rel="canonical" href="https://nailsornever.com/gallery"/>
                <meta name="description" content={`Located conveniently in Malta, NewYork, 12118,
                        ${process.env.NEXT_PUBLIC_NAME_PRODUCT} is one of the best salons in this area. ${process.env.NEXT_PUBLIC_NAME_PRODUCT} offers premier nails care and spa treatment services to satisfy your needs of enhancing natural beauty and refreshing your day.
                        mynewline Our salon takes pride in providing our valued customers all good services and top-high quality products as well as materials.
                        also, we provide some gallery such as ${[...galleryParent?.galleryParent]?.map(index => `${index?.theme}`)}. 
                       Let's come to our nail salon to see how deluxe salon & the unique nail art only at our salon`}/>
                <meta name="keywords"
                      content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} &amp; SPA,MALTA,Gallery extensions`}/>
                <meta property="og:url" content="https://nailsornever.com/"/>
                <meta property="og:type" content="Website"/>
                <meta property="og:title" content={`Gallery Nail - ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>
                <meta property="og:description" content={`Located conveniently in Malta, NewYork, 12118,
                        ${process.env.NEXT_PUBLIC_NAME_PRODUCT} is one of the best salons in this area. ${process.env.NEXT_PUBLIC_NAME_PRODUCT} offers premier nails care and spa treatment services to satisfy your needs of enhancing natural beauty and refreshing your day.
                        mynewline Our salon takes pride in providing our valued customers all good services and top-high quality products as well as materials.
                        also, we provide some gallery such as ${[...galleryParent?.galleryParent]?.map(index => `${index?.theme}`)}. 
                       Let's come to our nail salon to see how deluxe salon & the unique nail art only at our salon`}/>
                <meta property="og:image"
                      content="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png"/>
                <meta name="generator"  content={`Gallery Nail - ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ImageGallery",
                            "name": `Gallery - ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`,
                            "description": `View our nail art gallery featuring various themes and designs at ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`,
                            "url": "https://nailsornever.com/gallery",
                            "image": galleryParent?.galleryParent?.map((item: any) => item?.image) || []
                        })
                    }}
                />
            </Head>
            <HeaderTitle title="Our Gallery" />
            <section className="section-page-wrap"  style={{paddingTop: "30px", paddingBottom : "30px"}}>
                <div className="container-lg">
                    {galleryParent?.galleryParent && galleryParent.galleryParent.length > 0 ? (
                        <>
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
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            style={{
                                textAlign: 'center',
                                padding: '80px 20px',
                                minHeight: '400px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <CollectionsIcon 
                                    sx={{ 
                                        fontSize: 80, 
                                        color: '#7fa681',
                                        marginBottom: '20px'
                                    }} 
                                />
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                style={{
                                    fontFamily: "'Mollie Glaston', sans-serif",
                                    fontSize: '2.5rem',
                                    fontWeight: 500,
                                    color: '#1a1a1a',
                                    marginBottom: '15px'
                                }}
                            >
                                No Gallery Available
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                style={{
                                    fontSize: '1.1rem',
                                    color: '#666',
                                    maxWidth: '500px',
                                    lineHeight: 1.6
                                }}
                            >
                                We're currently updating our gallery. Please check back soon for our latest nail art collections!
                            </motion.p>
                        </motion.div>
                    )}
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