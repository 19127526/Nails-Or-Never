import MainLayout from "@/components/layout/main";
import Head from "next/head";
import React, {useEffect} from "react";
import CardGalleryDetailComponent from "@/components/gallery/carddetail";
import {useRouter} from "next/router";
import {getAllSubGalleryByParentTheme} from "@/api-client/gallery/Gallery.api";
import {useDispatch} from "react-redux";
import {turnOffLoading} from "@/components/loading/index.actions";
import HeaderTitle from "@/components/header-title";
import { motion } from "framer-motion";
import ImageIcon from '@mui/icons-material/Image';
const DetailGalleryPage = (props : any) => {
    const {gallerySub} = props
    const router = useRouter();
    const { gallery } = router.query
    const dispatch = useDispatch()
    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
                <meta name="generator" content="Nails Or Never"/>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
                <meta name="generator" content="Nails Or Never"/>
                <title>List Theme Gallery {gallery} - {process.env.NEXT_PUBLIC_NAME_PRODUCT} - Malta</title>
                <meta charSet="utf-8"/>
                <meta httpEquiv="X-UA-Compatible"content="IE=edge"/>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
                <meta name="robots" content="index,follow"/>
                <link rel="canonical" href={`https://nailsornever.com/gallery/detail/${gallery}`}/>
                <meta name="description" content={`Located conveniently in Malta, NewYork, 12118,
                        ${process.env.NEXT_PUBLIC_NAME_PRODUCT} is one of the best salons in this area. ${process.env.NEXT_PUBLIC_NAME_PRODUCT} offers premier nails care and spa treatment services to satisfy your needs of enhancing natural beauty and refreshing your day.
                        mynewline Our salon takes pride in providing our valued customers all good services and top-high quality products as well as materials.
                        also, in ${gallery}, we have ${[...gallerySub?.gallery]?.length} theme gallery collection. 
                       Let's come to our nail salon to see how deluxe salon & the unique nail art only at our salon`}/>
                <meta name="keywords"
                      content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} &amp; SPA,MALTA,List Theme Gallery,${gallery} extensions`}/>
                <meta property="og:url" content="https://nailsornever.com/"/>
                <meta property="og:type" content="Website"/>
                <meta property="og:title" content={`List Theme Gallery ${gallery} - ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>
                <meta property="og:description" content={`Located conveniently in Malta, NewYork, 12118,
                        ${process.env.NEXT_PUBLIC_NAME_PRODUCT} is one of the best salons in this area. ${process.env.NEXT_PUBLIC_NAME_PRODUCT} offers premier nails care and spa treatment services to satisfy your needs of enhancing natural beauty and refreshing your day.
                        mynewline Our salon takes pride in providing our valued customers all good services and top-high quality products as well as materials.
                        also, in ${gallery}, we have ${[...gallerySub?.gallery]?.length} theme gallery collection. 
                       Let's come to our nail salon to see how deluxe salon & the unique nail art only at our salon`}/>
                <meta property="og:image"
                      content="/images/Nails or Never-01 (1).png"/>
                <meta name="generator"  content={`List Theme Gallery ${gallery} - ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ImageGallery",
                            "name": `${gallery} Gallery - ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`,
                            "description": `View ${gallery} nail art gallery collection at ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`,
                            "url": `https://nailsornever.com/gallery/detail/${gallery}`,
                            "image": gallerySub?.gallery?.map((item: any) => item?.image) || []
                        })
                    }}
                />
            </Head>
            <HeaderTitle title={`Detail ${gallery} Gallery`} />
            <section id="gallery" className="section-page-wrap section-gallery" style={{paddingTop: "30px", paddingBottom : "30px"}}  >
                <div className="container-lg">
                    {gallerySub?.gallery && gallerySub.gallery.length > 0 ? (
                        <div className="row g-2">
                            {
                                [...gallerySub?.gallery]?.map((index : any) =>
                                    <CardGalleryDetailComponent detailGallery={index as any}/>
                                )
                            }
                        </div>
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
                                <ImageIcon 
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
                                No Images Available
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
                                {gallery ? `The "${gallery}" gallery collection is currently empty. Please check back soon for updates!` : 'This gallery collection is currently empty. Please check back soon for updates!'}
                            </motion.p>
                        </motion.div>
                    )}
                </div>
            </section>
        </>
    )
}


export async function getServerSideProps(context : any) {
    try {
        const {params} = context ?? "1"
        const listSubGallery = await getAllSubGalleryByParentTheme( params?.gallery as string);
        const data = await listSubGallery?.data
        return {
            props: {
                gallerySub: data,
            }
        }
    }
    catch (err) {
        return {
            props: {
                gallerySub: null,
            }
        }
    }

}


DetailGalleryPage.Layout = MainLayout
export default DetailGalleryPage