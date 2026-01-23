import MainLayout from "@/components/layout/main";
import {getDetailAboutUs} from "@/api-client/about-us/AboutUs.api";
import {getSubServicePagination} from "@/api-client/service/Services.api";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@mui/material'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {getGalleryPagination} from "@/api-client/gallery/Gallery.api";
import Head from "next/head";
import {mainName} from "@/constants/label";
import AnimatedSection from "@/components/animated-section";
import { motion } from "framer-motion";
import CollectionsIcon from '@mui/icons-material/Collections';


// Mapping descriptions for each service type
const getServiceDescription = (serviceName: string, defaultDescription: string | null) => {
    if (defaultDescription && defaultDescription !== '' && defaultDescription !== 'null') {
        return defaultDescription;
    }
    
    const descriptionMap: { [key: string]: string } = {
        'DIPPING': 'Transform your nails with our premium dipping powder services. Long-lasting, vibrant colors that protect and strengthen your natural nails.',
        'MANI & PEDI': 'Indulge in our luxurious manicure and pedicure treatments. Experience professional care that leaves your hands and feet feeling refreshed and beautiful.',
        'NAIL ART': 'Express your unique style with our creative nail art designs. From elegant patterns to bold statements, we bring your vision to life.',
        'GEL POLISH': 'Get salon-quality gel polish that lasts for weeks. Our professional application ensures a flawless, chip-resistant finish.',
        'ACRYLIC': 'Achieve the perfect length and shape with our acrylic nail services. Durable, customizable, and beautifully crafted to match your style.',
        'EXTENSIONS': 'Add length and volume to your natural nails with our premium extension services. Professional application for stunning, natural-looking results.'
    };
    
    // Try to match service name (case-insensitive)
    const matchedKey = Object.keys(descriptionMap).find(key => 
        serviceName?.toUpperCase().includes(key) || key.includes(serviceName?.toUpperCase() || '')
    );
    
    return matchedKey ? descriptionMap[matchedKey] : 'Experience professional nail care services with our expert team. We provide top-quality treatments to enhance your natural beauty and refresh your day.';
};

function Item(props : any) {
    const {item} = props
    const serviceDescription = getServiceDescription(item?.name || '', item?.description);
    
    return (
        <Paper style={{
            backgroundImage: "url(/images/Nails or Never-01 (1).png)",
            transition: "background .3s,border .3s,border-radius .3s,box-shadow .3s",
            minHeight: 'clamp(500px, 70vh, 700px)',
            display: 'flex',
            alignItems: 'center'
        }}>
            <div className="banner-content" style={{ width: '100%' }}>
                <div className="container-lg" style={{
                    paddingTop: 'clamp(60px, 8vw, 100px)',
                    paddingBottom: 'clamp(60px, 8vw, 100px)'
                }}>
                    <div className="row justify-content-center align-items-center gx-3 gx-md-4 gx-lg-5">
                        <div className="col-lg-6 order-2 order-lg-1 text-center text-lg-start">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    style={{
                                        marginBottom: 'clamp(15px, 2vw, 25px)'
                                    }}
                                >
                                    <motion.span
                                        style={{
                                            fontFamily: "'Jost', sans-serif",
                                            fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                                            fontWeight: 500,
                                            color: '#7fa681',
                                            letterSpacing: '2px',
                                            textTransform: 'uppercase'
                                        }}
                                    >
                                        Premium Nail Services
                                    </motion.span>
                                </motion.div>
                                <motion.h2
                                    className="banner-title"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    style={{
                                        marginBottom: 'clamp(20px, 3vw, 30px)',
                                        fontFamily: "'Mollie Glaston', sans-serif",
                                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                                        fontWeight: 400,
                                        color: '#1a1a1a',
                                        lineHeight: 1.2,
                                        letterSpacing: '1px'
                                    }}
                                >
                                    {item?.name}
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    style={{
                                        fontFamily: "'Jost', sans-serif",
                                        fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                                        fontWeight: 400,
                                        color: '#666',
                                        lineHeight: 1.7,
                                        marginBottom: 'clamp(25px, 4vw, 35px)',
                                        maxWidth: '90%'
                                    }}
                                >
                                    {serviceDescription}
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    <Link className="banner-link" href={process.env.NEXT_PUBLIC_SERVICES_ROUTER as string} replace>
                                        <motion.span
                                            whileHover={{ x: 5 }}
                                            transition={{ duration: 0.2 }}
                                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                                        >
                                            View more
                                            <ArrowForwardIcon sx={{ fontSize: 'clamp(18px, 2vw, 22px)' }} />
                                        </motion.span>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>
                        <div className="col-12 col-sm-8 col-md-6 col-lg-6 order-1 order-lg-2">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                                whileHover={{ scale: 1.03 }}
                                style={{
                                    transition: 'transform 0.3s ease'
                                }}
                            >
                                <div className="ratio ratio-1x1">
                                    <div className="banner-img-wrap">
                                        <div className="banner-img-border">
                                            <div className="banner-img">
                                                <Image
                                                    src={item.image}
                                                    alt={`${item?.name} nail service in Malta, NY - ${mainName} professional nail salon`}
                                                    fill
                                                    priority={true}
                                                    quality={95}
                                                    style={{
                                                        objectFit: 'cover',
                                                        objectPosition: 'center',
                                                        borderRadius: '50rem 50rem 0 0',
                                                        transition: 'transform 0.3s ease'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </Paper>
    )
}


const HomePage = (props : any) => {
    const {aboutUs, services, galleryParent} = props
    return (
        aboutUs != null && services != null && galleryParent != null ?
            <>
                <Head>
                    <meta charSet="utf-8"/>
                    <meta httpEquiv="X-UA-Compatible"content="IE=edge"/>
                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                    <meta name="robots" content="index,follow"/>
                    <link rel="canonical" href="https://nailsornever.com"/>
                    <title>{process.env.NEXT_PUBLIC_NAME_PRODUCT} - Best Nail Salon in Malta, NY | Manicure, Pedicure & Nail Art Services</title>
                    <meta name="description" content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} is the premier nail salon in Malta, NY 12118. We offer professional manicure, pedicure, gel polish, acrylic nails, nail art, and dipping powder services. Open Mon-Fri 9AM-7PM, Sat 9AM-6PM, Sun 10AM-5PM. Book your appointment today at 518-400-1028.`}/>
                    <meta name="keywords"
                          content={`nail salon Malta NY, nail salon near Mechanicville, best nail salon Malta, manicure Malta NY, pedicure Malta NY, gel nails Malta, acrylic nails Malta, nail art Malta, ${process.env.NEXT_PUBLIC_NAME_PRODUCT}, nail salon 12118, ${[...services?.services]?.map(index => `${index?.name} Malta NY`).join(', ')}`}/>
                    <meta property="og:url" content="https://nailsornever.com/"/>
                    <meta property="og:type" content="Website"/>
                    <meta property="og:image"
                          content="/images/Nails or Never-01 (1).png"/>
                    <meta property="og:title" content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} - Best Nail Salon in Malta, NY | Professional Nail Services`}/>
                    <meta property="og:description" content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} offers premium nail care services in Malta, NY. Professional manicures, pedicures, gel polish, acrylic nails, and nail art. Open daily. Call 518-400-1028 to book your appointment.`}/>
                    <meta name="generator"  content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} - Professional nails care services in Malta,NY 12118`}/>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "BeautySalon",
                                "name": process.env.NEXT_PUBLIC_NAME_PRODUCT,
                                "description": `Located conveniently in Malta, NewYork, 12118, ${process.env.NEXT_PUBLIC_NAME_PRODUCT} is one of the best salons in this area. We offer premium nail care services including manicures, pedicures, gel polish, acrylic nails, nail art, and more.`,
                                "address": {
                                    "@type": "PostalAddress",
                                    "streetAddress": "2374 US-9",
                                    "addressLocality": "Malta",
                                    "addressRegion": "NY",
                                    "postalCode": "12118",
                                    "addressCountry": "US"
                                },
                                "url": "https://nailsornever.com",
                                "image": "https://nailsornever.com/images/Nails or Never-01 (1).png",
                                "logo": "https://nailsornever.com/images/Nails or Never-01 (1).png",
                                "priceRange": "$$",
                                "telephone": "+1-518-400-1028",
                                "email": "nailsornever@gmail.com",
                                "openingHoursSpecification": [
                                    {
                                        "@type": "OpeningHoursSpecification",
                                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                                        "opens": "09:00",
                                        "closes": "19:00"
                                    },
                                    {
                                        "@type": "OpeningHoursSpecification",
                                        "dayOfWeek": "Saturday",
                                        "opens": "09:00",
                                        "closes": "18:00"
                                    },
                                    {
                                        "@type": "OpeningHoursSpecification",
                                        "dayOfWeek": "Sunday",
                                        "opens": "10:00",
                                        "closes": "17:00"
                                    }
                                ],
                                "geo": {
                                    "@type": "GeoCoordinates",
                                    "latitude": "42.9703",
                                    "longitude": "-73.7926"
                                },
                                "sameAs": [
                                    "https://www.facebook.com/profile.php?id=61577140933315",
                                    "https://www.instagram.com/nailsorneverny",
                                    "https://www.yelp.com/biz/nails-or-never-malta"
                                ],
                                "aggregateRating": {
                                    "@type": "AggregateRating",
                                    "ratingValue": "4.1",
                                    "reviewCount": "10",
                                    "bestRating": "5",
                                    "worstRating": "1"
                                },
                                "areaServed": {
                                    "@type": "City",
                                    "name": "Malta, NY"
                                },
                                "hasOfferCatalog": {
                                    "@type": "OfferCatalog",
                                    "name": "Nail Care Services",
                                    "itemListElement": services?.services?.map((service: any, index: number) => ({
                                        "@type": "Offer",
                                        "itemOffered": {
                                            "@type": "Service",
                                            "name": service?.name,
                                            "description": service?.description || `Professional ${service?.name} service at ${process.env.NEXT_PUBLIC_NAME_PRODUCT} in Malta, NY`
                                        },
                                        "position": index + 1
                                    })) || []
                                }
                            })
                        }}
                    />
                </Head>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <Carousel
                        fullHeightHover={false}
                        NextIcon={
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <ArrowCircleRightIcon sx={{ fontSize: 'clamp(32px, 4vw, 48px)', color: '#7fa681' }} />
                            </motion.div>
                        }
                        PrevIcon={
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <ArrowCircleLeftIcon sx={{ fontSize: 'clamp(32px, 4vw, 48px)', color: '#7fa681' }} />
                            </motion.div>
                        }
                        interval={4000}
                        animation="slide"
                        duration={600}
                        navButtonsAlwaysVisible={true}
                        navButtonsProps={{
                            style: {
                                backgroundColor: 'transparent',
                                transition: 'all 0.3s ease',
                                margin: '0 clamp(10px, 2vw, 20px)'
                            }
                        }}
                        indicatorContainerProps={{
                            style: {
                                marginTop: 'clamp(20px, 3vw, 40px)',
                                marginBottom: 'clamp(20px, 3vw, 40px)'
                            }
                        }}
                        indicatorIconButtonProps={{
                            style: {
                                color: '#7fa681',
                                padding: '8px',
                                transition: 'all 0.3s ease'
                            }
                        }}
                        activeIndicatorIconButtonProps={{
                            style: {
                                color: '#4a7c59'
                            }
                        }}
                    >
                        {
                            [...services?.services]?.map((index, i) => <Item key={i} item={index}/>)
                        }
                    </Carousel>
                </motion.div>
                <AnimatedSection>
                    <section className="section-wrap section-about" style={{ paddingTop: 'clamp(80px, 10vw, 120px)', paddingBottom: 'clamp(80px, 10vw, 120px)' }}>
                        <div className="container-lg">
                            <div className="row justify-content-center align-items-center gy-5 gx-3 g-lg-5">
                                <div className="col-sm-9 col-md-8 col-lg-6">
                                    <motion.div
                                        initial={{ opacity: 0, x: -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        whileHover={{ scale: 1.02 }}
                                        style={{
                                            borderRadius: '15px',
                                            overflow: 'hidden',
                                            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
                                        }}
                                    >
                                        <Image
                                            className="img-fluid"
                                            src="https://nails.shoedog.vn/public/images/model-1.png"
                                            alt={`Professional nail salon team at ${mainName} in Malta, NY 12118 - Expert nail technicians`}
                                            width={600}
                                            height={800}
                                            quality={90}
                                            loading="lazy"
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                display: 'block'
                                            }}
                                        />
                                    </motion.div>
                                </div>
                                <div className="col-lg-6">
                                    <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                    >
                                        <motion.h3
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: 0.3 }}
                                            className="sub-title fs-80"
                                            style={{
                                                marginBottom: '15px',
                                                color: '#7fa681',
                                                fontFamily: "'Caramello', sans-serif",
                                                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                                                fontWeight: 400,
                                                lineHeight: 1.1
                                            }}
                                        >
                                            About us
                                        </motion.h3>
                                        <motion.h2
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: 0.4 }}
                                            className="title text-uppercase"
                                            style={{
                                                fontFamily: "'Mollie Glaston', sans-serif",
                                                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                                                fontWeight: 400,
                                                color: '#1a1a1a',
                                                marginBottom: 'clamp(20px, 3vw, 30px)',
                                                lineHeight: 1.2,
                                                letterSpacing: '2px'
                                            }}
                                        >
                                            Why Clients Choose Us
                                        </motion.h2>
                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: 0.5 }}
                                            className="mb-3"
                                            style={{
                                                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                                                color: '#666',
                                                lineHeight: 1.8,
                                                marginBottom: 'clamp(20px, 3vw, 30px)',
                                                fontFamily: "'Jost', sans-serif",
                                                fontWeight: 400
                                            }}
                                        >
                                            {aboutUs?.description}
                                        </motion.p>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: 0.6 }}
                                        >
                                            <Link href={process.env.NEXT_PUBLIC_ABOUT_US_ROUTER as string} replace>
                                                <motion.button
                                                    className="button button-lg"
                                                    whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
                                                    whileTap={{ scale: 0.95 }}
                                                    style={{
                                                        marginTop: 'clamp(20px, 3vw, 40px)',
                                                        backgroundColor: '#7fa681',
                                                        color: '#1a1a1a',
                                                        border: 'none',
                                                        padding: 'clamp(12px, 2vw, 16px) clamp(30px, 4vw, 40px)',
                                                        borderRadius: '50px',
                                                        fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
                                                        fontWeight: 500,
                                                        cursor: 'pointer',
                                                        fontFamily: "'Jost', sans-serif",
                                                        transition: 'all 0.3s ease',
                                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                                                    }}
                                                >
                                                    Read more
                                                </motion.button>
                                            </Link>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </section>
                </AnimatedSection>
                <AnimatedSection delay={0.2}>
                    <section className="section-wrap section-services" style={{ paddingTop: 'clamp(80px, 10vw, 120px)', paddingBottom: 'clamp(80px, 10vw, 120px)' }}>
                        <div className="container-lg">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="heading-flex mb-4"
                                style={{ marginBottom: 'clamp(30px, 4vw, 50px)' }}
                            >
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="title text-uppercase"
                                    style={{
                                        fontFamily: "'Mollie Glaston', sans-serif",
                                        fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                                        fontWeight: 400,
                                        color: '#1a1a1a',
                                        lineHeight: 1.2,
                                        letterSpacing: '2px',
                                        marginBottom: '10px'
                                    }}
                                >
                                    Services for<br/>the best clients
                                </motion.h2>
                                <motion.h3
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="sub-title"
                                    style={{
                                        fontFamily: "'Caramello', sans-serif",
                                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                                        fontWeight: 400,
                                        color: '#7fa681',
                                        lineHeight: 1.1
                                    }}
                                >
                                    Our services
                                </motion.h3>
                            </motion.div>
                            <div className="row justify-content-center gy-4 gx-3 gx-sm-4 g-lg-5">
                                {
                                    [...services?.services]?.map((index, idx) =>
                                        <AnimatedSection key={index?.id} delay={idx * 0.08} className="col-6 col-md-4 col-lg-4 col-xl-3">
                                            <motion.div
                                                className="service-item"
                                                whileHover={{ scale: 1.03, y: -5 }}
                                                transition={{ duration: 0.3, ease: "easeOut" }}
                                                style={{
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                <a className="service-img-link">
                                                    <div className="service-img-wrap">
                                                        <div className="service-img">
                                                            <Image
                                                                src={index?.image}
                                                                alt={`${index?.name} nail service in Malta, NY - ${mainName} professional nail salon`}
                                                                fill
                                                                quality={90}
                                                                loading="lazy"
                                                                style={{
                                                                    objectFit: 'cover',
                                                                    objectPosition: 'center',
                                                                    borderRadius: '50rem',
                                                                    transition: 'transform 0.3s ease'
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </a>
                                                <a className="service-link">
                                                    <h4
                                                        className="service-title"
                                                        style={{
                                                            fontFamily: "'Jost', sans-serif",
                                                            fontSize: 'clamp(1.3rem, 2vw, 1.6rem)',
                                                            fontWeight: 500,
                                                            color: '#1a1a1a',
                                                            marginTop: 0,
                                                            marginBottom: 'clamp(10px, 1.5vw, 15px)',
                                                            padding: '0 clamp(10px, 1.5vw, 15px)',
                                                            lineHeight: 1.4,
                                                            textAlign: 'center'
                                                        }}
                                                    >
                                                        {index?.name}
                                                    </h4>
                                                </a>
                                            </motion.div>
                                        </AnimatedSection>
                                    )
                                }
                            </div>
                        </div>
                    </section>
                </AnimatedSection>

                <AnimatedSection delay={0.4}>
                    <section className="section-wrap section-services" style={{ paddingTop: 'clamp(80px, 10vw, 120px)', paddingBottom: 'clamp(80px, 10vw, 120px)' }}>
                        <div className="container-lg">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="heading-flex mb-4"
                                style={{ marginBottom: 'clamp(30px, 4vw, 50px)' }}
                            >
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="title text-uppercase"
                                    style={{
                                        fontFamily: "'Mollie Glaston', sans-serif",
                                        fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                                        fontWeight: 400,
                                        color: '#1a1a1a',
                                        lineHeight: 1.2,
                                        letterSpacing: '2px',
                                        marginBottom: '10px'
                                    }}
                                >
                                    Collection
                                </motion.h2>
                                <motion.h3
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="sub-title"
                                    style={{
                                        fontFamily: "'Caramello', sans-serif",
                                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                                        fontWeight: 400,
                                        color: '#7fa681',
                                        lineHeight: 1.1
                                    }}
                                >
                                    Our gallery
                                </motion.h3>
                            </motion.div>
                            {galleryParent?.galleryParent && galleryParent.galleryParent.length > 0 ? (
                                <div className="row justify-content-center gy-4 gx-3 gx-sm-4 g-lg-5">
                                    {
                                        [...galleryParent?.galleryParent]?.map((index, idx) =>
                                            <AnimatedSection key={index?.id} delay={idx * 0.08} className="col-6 col-md-4 col-lg-4 col-xl-3">
                                                <motion.div
                                                    className="service-item"
                                                    whileHover={{ scale: 1.05, y: -5 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                                    style={{
                                                        borderRadius: '15px',
                                                        overflow: 'hidden',
                                                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                                                        transition: 'all 0.3s ease',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <Link className="service-img-link" href={process.env.NEXT_PUBLIC_GALLERY_ROUTER+`/detail/${index?.theme}` as string} replace>
                                                        <div className="service-img-wrap">
                                                            <div className="service-img">
                                                                <Image
                                                                    src={index?.image}
                                                                    alt={`${index?.theme} nail art design in Malta, NY - ${mainName} nail salon gallery`}
                                                                    fill
                                                                    quality={90}
                                                                    loading="lazy"
                                                                    style={{
                                                                        objectFit: 'cover',
                                                                        objectPosition: 'center',
                                                                        borderRadius: '50rem',
                                                                        transition: 'transform 0.3s ease'
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <a className="service-link">
                                                        <motion.h4
                                                            className="service-title"
                                                            style={{
                                                                fontFamily: "'Jost', sans-serif",
                                                                fontSize: 'clamp(1.3rem, 2vw, 1.6rem)',
                                                                fontWeight: 500,
                                                                color: '#1a1a1a',
                                                                marginTop: 0,
                                                                marginBottom: 'clamp(10px, 1.5vw, 15px)',
                                                                padding: '0 clamp(10px, 1.5vw, 15px)',
                                                                lineHeight: 1.4,
                                                                textAlign: 'center'
                                                            }}
                                                        >
                                                            {index?.theme}
                                                        </motion.h4>
                                                    </a>
                                                </motion.div>
                                            </AnimatedSection>
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
                                            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
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
                                            fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
                                            color: '#666',
                                            maxWidth: '500px',
                                            lineHeight: 1.6,
                                            margin: '0 auto'
                                        }}
                                    >
                                        We're currently updating our gallery. Please check back soon for our latest nail art collections!
                                    </motion.p>
                                </motion.div>
                            )}
                        </div>
                    </section>
                </AnimatedSection>

                {/* FAQ Section */}
                <AnimatedSection delay={0.6}>
                    <section className="section-wrap section-faq" style={{ paddingTop: 'clamp(80px, 10vw, 120px)', paddingBottom: 'clamp(80px, 10vw, 120px)', backgroundColor: '#f8f9fa' }}>
                        <div className="container-lg">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="heading-flex mb-5"
                                style={{ marginBottom: 'clamp(40px, 5vw, 60px)', textAlign: 'center' }}
                            >
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="title text-uppercase"
                                    style={{
                                        fontFamily: "'Mollie Glaston', sans-serif",
                                        fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                                        fontWeight: 400,
                                        color: '#1a1a1a',
                                        lineHeight: 1.2,
                                        letterSpacing: '2px',
                                        marginBottom: '10px'
                                    }}
                                >
                                    Frequently Asked<br/>Questions
                                </motion.h2>
                                <motion.h3
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="sub-title"
                                    style={{
                                        fontFamily: "'Caramello', sans-serif",
                                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                                        fontWeight: 400,
                                        color: '#7fa681',
                                        lineHeight: 1.1
                                    }}
                                >
                                    Common Questions
                                </motion.h3>
                            </motion.div>
                            <div className="row justify-content-center">
                                <div className="col-lg-10">
                                    <div className="faq-list">
                                        {[
                                            {
                                                question: "What are your hours of operation?",
                                                answer: `We're open Monday through Friday from 9:00 AM to 7:00 PM, Saturday from 9:00 AM to 6:00 PM, and Sunday from 10:00 AM to 5:00 PM. We're located at 2374 US-9, Malta, NY 12118.`
                                            },
                                            {
                                                question: "Do I need to make an appointment?",
                                                answer: `While walk-ins are welcome, we highly recommend making an appointment to ensure availability, especially on weekends. You can book online through our website or call us at 518-400-1028.`
                                            },
                                            {
                                                question: "What services do you offer?",
                                                answer: `We offer a full range of nail services including manicures, pedicures, gel polish, acrylic nails, nail art, dipping powder, and nail extensions. Our experienced technicians provide professional, high-quality services using premium products.`
                                            },
                                            {
                                                question: "How long does a manicure or pedicure take?",
                                                answer: `A standard manicure typically takes 30-45 minutes, while a pedicure takes 45-60 minutes. Deluxe services and nail art may take longer. We recommend allowing 1-2 hours for a complete manicure and pedicure combination.`
                                            },
                                            {
                                                question: "Do you offer gift cards?",
                                                answer: `Yes! We offer gift cards that make perfect gifts for birthdays, holidays, or any special occasion. Gift cards can be purchased in-store or online through our website.`
                                            },
                                            {
                                                question: "What is the difference between gel polish and regular polish?",
                                                answer: `Gel polish is cured under a UV or LED lamp and typically lasts 2-3 weeks without chipping, while regular polish air-dries and usually lasts 5-7 days. Gel polish provides a longer-lasting, chip-resistant finish.`
                                            },
                                            {
                                                question: "Is the salon clean and sanitized?",
                                                answer: `Absolutely. We maintain the highest standards of cleanliness and sanitation. All tools are properly sterilized between clients, and we follow strict hygiene protocols to ensure a safe and clean environment for all our customers.`
                                            },
                                            {
                                                question: "Do you offer nail art services?",
                                                answer: `Yes! Our talented nail artists specialize in creating beautiful, custom nail art designs. From simple patterns to intricate designs, we can bring your vision to life. Check out our gallery to see examples of our work.`
                                            }
                                        ].map((faq, idx) => (
                                            <AnimatedSection key={idx} delay={idx * 0.1}>
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                                    className="faq-item"
                                                    style={{
                                                        marginBottom: '20px',
                                                        backgroundColor: '#fff',
                                                        borderRadius: '12px',
                                                        padding: '25px 30px',
                                                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
                                                        border: '1px solid rgba(127, 166, 129, 0.1)'
                                                    }}
                                                >
                                                    <h4
                                                        style={{
                                                            fontFamily: "'Mollie Glaston', sans-serif",
                                                            fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                                                            fontWeight: 500,
                                                            color: '#1a1a1a',
                                                            marginBottom: '15px',
                                                            lineHeight: 1.4
                                                        }}
                                                    >
                                                        {faq.question}
                                                    </h4>
                                                    <p
                                                        style={{
                                                            fontFamily: "'Jost', sans-serif",
                                                            fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
                                                            color: '#666',
                                                            lineHeight: 1.7,
                                                            margin: 0
                                                        }}
                                                    >
                                                        {faq.answer}
                                                    </p>
                                                </motion.div>
                                            </AnimatedSection>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </AnimatedSection>
            </>
            :
            <></>
    )
}

export async function getServerSideProps(context : any) {
    try {
        const detailAboutUs = await getDetailAboutUs()
        const services = await getSubServicePagination( 1,  6);

        const gallery = await getGalleryPagination(  1, 6)
        const dataGallery = await gallery?.data
        const dataAboutUs = await detailAboutUs?.data;
        const dataService = await services?.data
        return {
            props: {
                aboutUs: dataAboutUs?.aboutUs[0],
                services: dataService,
                galleryParent: dataGallery,
            }
        }
    } catch (err) {
        return {
            props: {
                aboutUs: null,
                services: null,
                galleryParent: null,
            }
        }
    }
}

HomePage.Layout = MainLayout

export default HomePage

