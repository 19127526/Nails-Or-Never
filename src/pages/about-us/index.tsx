import MainLayout from "@/components/layout/main";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {useDispatch} from "react-redux";
import {getDetailAboutUs} from "@/api-client/about-us/AboutUs.api";
import Link from "next/link";
import {mainName} from "@/constants/label";
import HeaderTitle from "@/components/header-title";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedSection from "@/components/animated-section";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { useRef } from "react";
import PageLoading from "@/components/page-loading";

// Parallax Background Component
const ParallaxBackground: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

    return (
        <motion.div
            ref={ref}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '120%',
                backgroundImage: "url(https://nailsbar.ancorathemes.com/wp-content/uploads/2016/03/bg1-1.jpg)",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                zIndex: 0,
                y: backgroundY,
                scale: scale
            }}
        />
    );
};

// Parallax Section Component
const ParallaxSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <>{children}</>;
};

const AboutUsPage = (props : any) => {
    const {aboutUs} = props
    const dispatch = useDispatch()
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    useEffect(() => {
        // Simulate initial page load
        const timer = setTimeout(() => {
            setIsInitialLoading(false);
        }, 500); // Small delay to ensure smooth transition

        return () => clearTimeout(timer);
    }, []);

    if (isInitialLoading) {
        return <PageLoading isLoading={true} />;
    }

    return (
        aboutUs != null ?
            <>
                <Head>
                    <meta charSet="utf-8"/>
                    <meta httpEquiv="X-UA-Compatible"content="IE=edge"/>
                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                    <meta name="robots" content="index,follow"/>
                    <link rel="canonical" href="https://nailsornever.com/about-us"/>
                    <title>About Us - {process.env.NEXT_PUBLIC_NAME_PRODUCT} | Best Nail Salon in Malta, NY</title>

                    <meta name="description" content={`Learn about ${process.env.NEXT_PUBLIC_NAME_PRODUCT}, the premier nail salon in Malta, NY 12118. We offer professional nail care services with expert technicians, premium products, and a welcoming atmosphere. Visit us at 2374 US-9 or call 518-400-1028.`}/>
                    <meta name="keywords"
                          content={`about ${process.env.NEXT_PUBLIC_NAME_PRODUCT}, nail salon Malta NY about, best nail salon Malta, professional nail salon Malta, nail salon near Mechanicville`}/>
                    <meta property="og:url" content="https://nailsornever.com/about-us"/>
                    <meta property="og:type" content="website"/>
                    <meta property="og:title" content={`About Us - ${process.env.NEXT_PUBLIC_NAME_PRODUCT} | Nail Salon Malta, NY`}/>
                    <meta property="og:description" content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} is a premier nail salon in Malta, NY offering professional nail care services with expert staff and premium products.`}/>
                    <meta property="og:image"
                          content="/images/Nails or Never-01 (1).png"/>
                    <meta name="generator"  content={`About us - ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "AboutPage",
                                "name": `About Us - ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`,
                                "description": aboutUs?.description || `Learn more about ${process.env.NEXT_PUBLIC_NAME_PRODUCT}, a premier nail salon in Malta, NY.`,
                                "url": "https://nailsornever.com/about-us",
                                "mainEntity": {
                                    "@type": "BeautySalon",
                                    "name": process.env.NEXT_PUBLIC_NAME_PRODUCT,
                                    "address": {
                                        "@type": "PostalAddress",
                                        "addressLocality": "Malta",
                                        "addressRegion": "NY",
                                        "postalCode": "12118",
                                        "addressCountry": "US"
                                    }
                                }
                            })
                        }}
                    />
                </Head>

                <HeaderTitle title="About us" />
                
                {/* Main About Section */}
                <AnimatedSection>
                    <section className="section-page-wrap" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
                        <div className="container-lg">
                            <div className="row justify-content-center align-items-center gy-5 gx-3 g-lg-5">
                                <div className="col-sm-9 col-md-8 col-lg-6">
                                    <motion.div
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
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
                                            src="https://houseofpolishnailsandspa.com/wp-content/themes/woctheme/assets/images/model-4.png"
                                            alt={`Professional nail salon team at ${mainName} in Malta, NY 12118 - Expert nail technicians and staff`}
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
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                    >
                                        <motion.h3
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
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
                                            Welcome
                                        </motion.h3>
                                        <motion.h2
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.4 }}
                                            className="title text-uppercase"
                                            style={{
                                                fontFamily: "'Mollie Glaston', sans-serif",
                                                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                                                fontWeight: 400,
                                                color: '#1a1a1a',
                                                marginBottom: '30px',
                                                lineHeight: 1.2,
                                                letterSpacing: '2px'
                                            }}
                                        >
                                            Why We Are The Best
                                        </motion.h2>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.5 }}
                                        >
                                            <p
                                                style={{
                                                    fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                                                    color: '#666',
                                                    lineHeight: 1.8,
                                                    marginBottom: '20px',
                                                    fontFamily: "'Jost', sans-serif",
                                                    fontWeight: 400
                                                }}
                                            >
                                                {aboutUs?.description}
                                            </p>
                                            <p
                                                style={{
                                                    fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                                                    color: '#666',
                                                    lineHeight: 1.8,
                                                    marginBottom: '20px',
                                                    fontFamily: "'Jost', sans-serif",
                                                    fontWeight: 400
                                                }}
                                            >
                                                Located at 2374 US-9 in Malta, NY 12118, {process.env.NEXT_PUBLIC_NAME_PRODUCT} serves customers throughout the Capital Region, including nearby communities in Mechanicville, Saratoga Springs, Ballston Spa, and Clifton Park. Our convenient location makes us easily accessible for residents and visitors alike.
                                            </p>
                                            <p
                                                style={{
                                                    fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                                                    color: '#666',
                                                    lineHeight: 1.8,
                                                    marginBottom: '20px',
                                                    fontFamily: "'Jost', sans-serif",
                                                    fontWeight: 400
                                                }}
                                            >
                                                We're open Monday through Friday from 9:00 AM to 7:00 PM, Saturday from 9:00 AM to 6:00 PM, and Sunday from 10:00 AM to 5:00 PM. Stop by our salon or call us at 518-400-1028 to schedule your appointment. We look forward to serving you!
                                            </p>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </section>
                </AnimatedSection>

                {/* Parallax CTA Section */}
                <section 
                    className="section-wrap section-parallax"
                    style={{
                        position: 'relative',
                        margin: "120px 0px",
                        padding: "120px 0",
                        overflow: 'hidden'
                    }}
                >
                    {/* Background Image with Parallax */}
                    <ParallaxBackground />
                        
                        {/* Overlay */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                zIndex: 1
                            }}
                        />

                        <div className="parallax-wrap" style={{ position: 'relative', zIndex: 2 }}>
                            <div className="container-lg">
                                <div className="row justify-content-center text-center gy-5 gx-3 g-lg-5">
                                    <div className="col-lg-10 col-xl-8">
                                        <motion.div
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                        >
                                            <motion.h3
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.6, delay: 0.2 }}
                                                className="sub-title fs-80"
                                                style={{
                                                    marginBottom: '20px',
                                                    color: '#7fa681',
                                                    fontFamily: "'Caramello', sans-serif",
                                                    fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                                                    fontWeight: 400,
                                                    lineHeight: 1.1
                                                }}
                                            >
                                                Professional
                                            </motion.h3>
                                            <motion.h2
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8, delay: 0.3 }}
                                                className="title text-uppercase text-white"
                                                style={{
                                                    fontFamily: "'Mollie Glaston', sans-serif",
                                                    fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                                                    fontWeight: 400,
                                                    color: '#fff',
                                                    marginBottom: '30px',
                                                    lineHeight: 1.3,
                                                    letterSpacing: '2px',
                                                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                                                }}
                                            >
                                                We Create Beauty<br/>For Awesome People
                                            </motion.h2>
                                            <motion.p
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8, delay: 0.4 }}
                                                className="text-white mb-5"
                                                style={{
                                                    fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                                                    color: 'rgba(255, 255, 255, 0.95)',
                                                    lineHeight: 1.8,
                                                    marginBottom: '50px',
                                                    fontFamily: "'Jost', sans-serif",
                                                    fontWeight: 400,
                                                    textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)'
                                                }}
                                            >
                                                Our staff is highly trained and courteous professionals will tend to your every need. We are confident that you will enjoy our standards of excellence, service and cleanliness. If there is anything we can do to improve upon your experience, please let us know so we can better care for your needs!
                                            </motion.p>
                                            
                                            <motion.div
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8, delay: 0.5 }}
                                                className="button-group"
                                                style={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: '20px',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Link target="_blank" href={process.env.NEXT_PUBLIC_BOOKING_URL as string}>
                                                    <motion.button
                                                        className="button button-lg"
                                                        whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(127, 166, 129, 0.4)' }}
                                                        whileTap={{ scale: 0.95 }}
                                                        style={{
                                                            backgroundColor: '#7fa681',
                                                            color: '#fff',
                                                            border: 'none',
                                                            padding: '15px 35px',
                                                            borderRadius: '5px',
                                                            fontSize: '1rem',
                                                            fontWeight: 500,
                                                            cursor: 'pointer',
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '10px',
                                                            fontFamily: "'Jost', sans-serif",
                                                            transition: 'all 0.3s ease'
                                                        }}
                                                    >
                                                        <CalendarMonthIcon sx={{ fontSize: 20 }} />
                                                        <span>Book Appointment</span>
                                                    </motion.button>
                                                </Link>
                                                <Link href={process.env.NEXT_PUBLIC_GIFTCARDS_ROUTER as string}>
                                                    <motion.button
                                                        className="button button-lg"
                                                        whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(127, 166, 129, 0.4)' }}
                                                        whileTap={{ scale: 0.95 }}
                                                        style={{
                                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                            color: '#fff',
                                                            border: '2px solid rgba(255, 255, 255, 0.5)',
                                                            padding: '15px 35px',
                                                            borderRadius: '5px',
                                                            fontSize: '1rem',
                                                            fontWeight: 500,
                                                            cursor: 'pointer',
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '10px',
                                                            fontFamily: "'Jost', sans-serif",
                                                            backdropFilter: 'blur(10px)',
                                                            transition: 'all 0.3s ease'
                                                        }}
                                                    >
                                                        <CardGiftcardIcon sx={{ fontSize: 20 }} />
                                                        <span>Buy eGift Online</span>
                                                    </motion.button>
                                                </Link>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
            </>

            :
            <AnimatedSection>
                <section className="section-page-wrap" style={{ paddingTop: '150px', paddingBottom: '150px' }}>
                    <div className="container-lg">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            style={{
                                textAlign: 'center',
                                padding: '60px 20px'
                            }}
                        >
                            <h2
                                style={{
                                    fontFamily: "'Mollie Glaston', sans-serif",
                                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                                    fontWeight: 500,
                                    color: '#1a1a1a',
                                    marginBottom: '20px'
                                }}
                            >
                                Content Coming Soon
                            </h2>
                            <p
                                style={{
                                    fontSize: '1.15rem',
                                    color: '#666',
                                    maxWidth: '600px',
                                    margin: '0 auto',
                                    lineHeight: 1.7,
                                    fontFamily: "'Jost', sans-serif"
                                }}
                            >
                                We're currently updating our about page. Please check back soon!
                            </p>
                        </motion.div>
                    </div>
                </section>
            </AnimatedSection>
    )
}


export async function getServerSideProps(context : any) {
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
