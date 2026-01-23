import MainLayout from "@/components/layout/main";
import CardServiceComponent from "@/components/services/card";
import {Pagination} from "@mui/material";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import {getSubServicePagination} from "@/api-client/service/Services.api";
import {useDispatch, useSelector} from "react-redux";
import {turnOffLoading, turnOnLoading} from "@/components/loading/index.actions";
import HeaderTitle from "@/components/header-title";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/animated-section";
import SpaIcon from '@mui/icons-material/Spa';

const ServicesPage = (props: any) => {
    const {services} = props
    const [pagination, setPagination] = useState<number>(1)
    const route = useRouter()
    const dispatch = useDispatch()

    const handleChangePagination = (event: ChangeEvent<unknown>, value: number) => {
        route.push({
            query : {
                page : value
            },
        })
        setPagination(value)
    }
    return (
            services != null ?
            <>
                <Head>

                    <meta charSet="utf-8"/>
                    <meta httpEquiv="X-UA-Compatible"content="IE=edge"/>
                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                    <meta name="robots" content="index,follow"/>
                    <link rel="canonical" href="https://nailsornever.com/services"/>
                    <title>Nail Services in Malta, NY - {process.env.NEXT_PUBLIC_NAME_PRODUCT} | Manicure, Pedicure & More</title>
                    <meta name="description" content={`Professional nail services in Malta, NY at ${process.env.NEXT_PUBLIC_NAME_PRODUCT}. We offer ${[...services?.services]?.map(index => `${index?.name}`).join(', ')}. Book your appointment online or call 518-400-1028. Open Mon-Fri 9AM-7PM, Sat 9AM-6PM, Sun 10AM-5PM.`}/>
                    <meta name="keywords"
                          content={`nail services Malta NY, manicure Malta, pedicure Malta, gel nails Malta, acrylic nails Malta, nail art Malta, ${process.env.NEXT_PUBLIC_NAME_PRODUCT}, ${[...services?.services]?.map(index => `${index?.name} Malta NY`).join(', ')}`}/>
                    <meta property="og:url" content="https://nailsornever.com/service"/>
                    <meta property="og:type" content="website"/>
                    <meta property="og:title" content={`Nail Services in Malta, NY - ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>
                    <meta property="og:description" content={`Professional nail services at ${process.env.NEXT_PUBLIC_NAME_PRODUCT} in Malta, NY. Book your manicure, pedicure, gel polish, or nail art appointment today.`}/>
                    <meta property="og:image"
                          content="/images/Nails or Never-01 (1).png"/>
                    <meta name="generator"  content={`Services Nail - ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "Service",
                                "serviceType": "Nail Care Services",
                                "provider": {
                                    "@type": "BeautySalon",
                                    "name": process.env.NEXT_PUBLIC_NAME_PRODUCT,
                                    "address": {
                                        "@type": "PostalAddress",
                                        "addressLocality": "Malta",
                                        "addressRegion": "NY",
                                        "postalCode": "12118",
                                        "addressCountry": "US"
                                    }
                                },
                                "areaServed": {
                                    "@type": "City",
                                    "name": "Malta, NY"
                                },
                                "hasOfferCatalog": {
                                    "@type": "OfferCatalog",
                                    "name": "Nail Services",
                                    "itemListElement": services?.services?.map((service: any, index: number) => ({
                                        "@type": "Offer",
                                        "itemOffered": {
                                            "@type": "Service",
                                            "name": service?.name,
                                            "description": service?.description
                                        },
                                        "position": index + 1
                                    })) || []
                                }
                            })
                        }}
                    />
                </Head>

                <HeaderTitle title="Our Services" />
                <section className="section-page-wrap" style={{ paddingTop: 'clamp(80px, 10vw, 120px)', paddingBottom: 'clamp(80px, 10vw, 120px)' }}>
                    <div className="container-lg">
                        {/* SEO Content Section */}
                        <AnimatedSection>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="row justify-content-center mb-5"
                                style={{ marginBottom: 'clamp(40px, 5vw, 60px)' }}
                            >
                                <div className="col-lg-10">
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        style={{
                                            fontFamily: "'Mollie Glaston', sans-serif",
                                            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                                            fontWeight: 400,
                                            color: '#1a1a1a',
                                            marginBottom: '20px',
                                            lineHeight: 1.3,
                                            textAlign: 'center'
                                        }}
                                    >
                                        Professional Nail Services in Malta, NY
                                    </motion.h2>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                        style={{
                                            fontFamily: "'Jost', sans-serif",
                                            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                                            color: '#666',
                                            lineHeight: 1.8,
                                            textAlign: 'center',
                                            marginBottom: '20px'
                                        }}
                                    >
                                        At {process.env.NEXT_PUBLIC_NAME_PRODUCT}, we pride ourselves on offering the finest nail care services in Malta, NY and the surrounding areas including Mechanicville, Saratoga Springs, and Clifton Park. Our experienced nail technicians use only premium products and the latest techniques to ensure your nails look beautiful and last longer.
                                    </motion.p>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.4 }}
                                        style={{
                                            fontFamily: "'Jost', sans-serif",
                                            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                                            color: '#666',
                                            lineHeight: 1.8,
                                            textAlign: 'center'
                                        }}
                                    >
                                        Whether you're looking for a classic manicure, relaxing pedicure, long-lasting gel polish, or intricate nail art designs, we have the perfect service for you. Visit us at 2374 US-9, Malta, NY 12118, or call 518-400-1028 to book your appointment today.
                                    </motion.p>
                                </div>
                            </motion.div>
                        </AnimatedSection>
                        {services?.services && services.services.length > 0 ? (
                            <>
                                <div className="row justify-content-center gy-4 gy-md-5 gx-3 gx-md-4 g-lg-5">
                                    {
                                        [...services?.services]?.map((index: any, idx: number) => (
                                            <AnimatedSection key={index?.id} delay={idx * 0.1}>
                                                <CardServiceComponent parentService={index as any} subService={index?.service as any} />
                                            </AnimatedSection>
                                        ))
                                    }
                                </div>
                                {services?.pages > 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        className="col-lg-12"
                                    >
                                        <nav className="text-center">
                                            <ul className="pagination justify-content-center mt-5 pt-3 mb-0">
                                                <Pagination
                                                    count={services?.pages}
                                                    onChange={handleChangePagination}
                                                    page={pagination}
                                                    sx={{
                                                        '& .MuiPaginationItem-root': {
                                                            color: '#1a1a1a',
                                                            '&.Mui-selected': {
                                                                backgroundColor: '#7fa681',
                                                                color: '#fff',
                                                                '&:hover': {
                                                                    backgroundColor: '#6a926c',
                                                                },
                                                            },
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(127, 166, 129, 0.1)',
                                                            },
                                                        },
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
                                    padding: 'clamp(80px, 10vw, 120px) 20px',
                                    minHeight: '450px',
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
                                    <SpaIcon
                                        sx={{
                                            fontSize: 90,
                                            color: '#7fa681',
                                            marginBottom: '25px'
                                        }}
                                    />
                                </motion.div>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    style={{
                                        fontFamily: "'Mollie Glaston', sans-serif",
                                        fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                                        fontWeight: 500,
                                        color: '#1a1a1a',
                                        marginBottom: '20px'
                                    }}
                                >
                                    No Services Available
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    style={{
                                        fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                                        color: '#666',
                                        maxWidth: '600px',
                                        lineHeight: 1.7,
                                        padding: '0 15px'
                                    }}
                                >
                                    We're currently updating our service offerings. Please check back soon for our latest nail care services!
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
        const services = await getSubServicePagination(page as number,  5)
        const data = await services?.data
        return {
            props: {
                services: data,

            }
        }
    }
    catch (err) {
        return {
            props: {
                services: null,
            }
        }
    }
}





ServicesPage.Layout = MainLayout
export default ServicesPage