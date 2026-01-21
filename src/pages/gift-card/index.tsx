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
import { motion, useScroll, useTransform } from "framer-motion";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AnimatedSection from "@/components/animated-section";
import image from "@/public/images/Untitled.jpeg";


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
                <link rel="canonical" href="https://nailsornever.com/gift-card"/>

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
                      content="/images/Nails or Never-01 (1).png"/>
                <meta name="generator"  content={`Gift card - ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>
            </Head>
            
            {/* Hero Section */}
            <motion.section
                className="page-title"
                style={{
                    backgroundImage: `url(${image.src})`,
                    position: 'relative',
                    overflow: 'hidden',
                    padding: '200px 0 140px 0',
                    marginTop: '80px',
                    minHeight: '650px',
                    display: 'flex',
                    alignItems: 'center'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="container-lg" style={{ position: 'relative', zIndex: 2 }}>
                    <div className="row" style={{ position: 'relative' }}>
                        {/* Main Content */}
                        <div className="col-12">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                style={{ 
                                    paddingRight: '60px',
                                    paddingBottom: '60px'
                                }}
                            >
                                <motion.h3
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    style={{ 
                                        marginBottom: '10px', 
                                        color: '#7fa681',
                                        lineHeight: 1,
                                        textAlign: 'left',
                                        fontFamily: "'Caramello', sans-serif",
                                        fontSize: 'clamp(3.5rem, 9vw, 6.5rem)',
                                        fontWeight: 400,
                                        letterSpacing: '1px',
                                        padding: 0,
                                        margin: '0 0 10px 0'
                                    }}
                                >
                                    Gift Cards
                                </motion.h3>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    style={{
                                        fontFamily: "'Mollie Glaston', sans-serif",
                                        fontSize: 'clamp(1.75rem, 3.8vw, 2.8rem)',
                                        fontWeight: 400,
                                        color: '#1a1a1a',
                                        marginBottom: '20px',
                                        lineHeight: 1.2,
                                        letterSpacing: '3px',
                                        textAlign: 'left',
                                        textTransform: 'uppercase',
                                        padding: 0,
                                        margin: '0 0 20px 0'
                                    }}
                                >
                                    NAILS OR NEVER
                                </motion.h1>
                                
                                {/* Paragraph and Physical Gift Card Text - Same Row */}
                                <div className="row align-items-center" style={{ marginTop: '15px' }}>
                                    <div className="col-12 col-lg-7 col-xl-7">
                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: 0.5 }}
                                            style={{
                                                fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)',
                                                color: '#777',
                                                lineHeight: 1.75,
                                                marginBottom: 0,
                                                textAlign: 'left',
                                                fontFamily: "'Jost', sans-serif",
                                                fontWeight: 400,
                                                padding: 0,
                                                margin: 0,
                                                paddingRight: '40px'
                                            }}
                                        >
                                            Let your sweetheart know how much you love and care for him/her by sending our love cards! Buy our gift card for your loved one.
                                        </motion.p>
                                    </div>
                                    <div className="col-12 col-lg-5 col-xl-5">
                                        <motion.div
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.8, delay: 0.6 }}
                                            className="text-lg-end text-start"
                                            style={{
                                                paddingTop: '20px',
                                                paddingLeft: '0'
                                            }}
                                        >
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.6, delay: 0.7 }}
                                                style={{
                                                    fontFamily: "'Mollie Glaston', sans-serif",
                                                    fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                                                    fontWeight: 400,
                                                    color: '#1a1a1a',
                                                    letterSpacing: '3px',
                                                    lineHeight: 1.5
                                                }}
                                            >
                                                <div style={{ 
                                                    marginBottom: '8px',
                                                    fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                                                    letterSpacing: '3px'
                                                }}>
                                                    PHYSICAL GIFT CARD
                                                </div>
                                                <div style={{ 
                                                    fontSize: 'clamp(1rem, 2.2vw, 1.25rem)', 
                                                    letterSpacing: '2.5px',
                                                    color: '#555',
                                                    fontWeight: 300
                                                }}>
                                                    PICK UP ONLY
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Gift Cards Section */}
            <section className="section-page-wrap" style={{paddingTop: "80px", paddingBottom: "80px"}}>
                <div className="container-lg">
                    {giftCard?.giftCard && giftCard.giftCard.length > 0 ? (
                        <>
                            {/* Section Header */}
                            <AnimatedSection>
                                <div className="row mb-5 mb-md-4">
                                    <div className="col-lg-12 text-center" style={{ marginBottom: '50px' }}>
                                        <motion.h2
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6 }}
                                            className="title"
                                            style={{
                                                fontFamily: "'Mollie Glaston', sans-serif",
                                                fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                                                fontWeight: 500,
                                                color: '#1a1a1a',
                                                marginBottom: '15px',
                                                letterSpacing: '1px'
                                            }}
                                        >
                                            Choose Your Gift Card
                                        </motion.h2>
                                        <motion.div
                                            initial={{ opacity: 0, scaleX: 0 }}
                                            animate={{ opacity: 1, scaleX: 1 }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                            style={{
                                                width: '100px',
                                                height: '4px',
                                                backgroundColor: '#7fa681',
                                                margin: '0 auto',
                                                borderRadius: '2px'
                                            }}
                                        />
                                    </div>
                                </div>
                            </AnimatedSection>

                            {/* Gift Cards Grid */}
                            <div className="row g-4 g-md-4 g-lg-4" style={{ marginTop: '30px' }}>
                                {
                                    [...giftCard?.giftCard]?.map((index : any, idx: number) =>
                                        <div key={index?.id} className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                                            <AnimatedSection delay={idx * 0.1}>
                                                <CardGiftComponent detail={index as any}/>
                                            </AnimatedSection>
                                        </div>
                                    )
                                }
                            </div>

                            {/* Pagination */}
                            {giftCard?.pages > 1 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="col-lg-12"
                                    style={{ marginTop: '60px', paddingTop: '40px' }}
                                >
                                    <nav className="text-center">
                                        <ul className="pagination justify-content-center mb-0">
                                            <Pagination 
                                                count={giftCard?.pages} 
                                                onChange={handleChangePagination} 
                                                page={pagination}
                                                color="primary"
                                                sx={{
                                                    '& .MuiPaginationItem-root': {
                                                        color: '#1a1a1a',
                                                        fontSize: '1rem',
                                                        minWidth: '40px',
                                                        height: '40px',
                                                        '&.Mui-selected': {
                                                            backgroundColor: '#7fa681',
                                                            color: '#fff',
                                                            '&:hover': {
                                                                backgroundColor: '#6a8a6c'
                                                            }
                                                        },
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(127, 166, 129, 0.1)'
                                                        }
                                                    }
                                                }}
                                            />
                                        </ul>
                                    </nav>
                                </motion.div>
                            )}
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            style={{
                                textAlign: 'center',
                                padding: '100px 20px',
                                minHeight: '500px',
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
                                <CardGiftcardIcon
                                    sx={{
                                        fontSize: 100,
                                        color: '#7fa681',
                                        marginBottom: '30px'
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
                                    marginBottom: '20px'
                                }}
                            >
                                No Gift Cards Available
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                style={{
                                    fontSize: '1.1rem',
                                    color: '#666',
                                    maxWidth: '500px',
                                    lineHeight: 1.8
                                }}
                            >
                                We're currently updating our gift card collection. Please check back soon for our latest gift card options!
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

