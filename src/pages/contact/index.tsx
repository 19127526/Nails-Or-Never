import MainLayout from "@/components/layout/main";
import Head from "next/head";
import React, {useState} from "react";
import {getDetailAboutUs} from "@/api-client/about-us/AboutUs.api";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import {Spin} from "antd";
import {Snackbar} from "@mui/material";
import HeaderTitle from "@/components/header-title";
import {isInputEmpty} from "@/utils/fotmar-date-time";
import {postContact} from "@/api-client/contact/Contact.api";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/animated-section";
import SendIcon from "@mui/icons-material/Send";


interface emptyContactInter {
    name: any,
    email: any,
    phone: any,
    message: any,
}

const emptyContact: emptyContactInter = {
    name: undefined,
    email: undefined,
    phone: undefined,
    message: undefined
}
const ContactPage = (props: any) => {
    const {aboutUs} = props
    const [contact, setContact] = useState(emptyContact)
    const [isOpen, setIsOpen] = useState({
        state: false,
        message: ''
    });
    const [isErrorPhoneNumber, setIsErrorPhoneNumber] = useState({
        status: false,
        message: ''
    })
    const [isLoading, setIsLoading] = useState(false);
    const handleChangePhoneNumber = (e: any) => {
        let num = e.target.value;
        if (isNaN(num) == false || num == '-') {
            if (num.toString().length == 4 || num.toString().length == 8) {
                if (e.target.value.length > contact?.phone?.length) {
                    setContact({...contact, phone: contact?.phone + '-' + num.slice(-1)})
                } else {
                    setContact({...contact, phone: num})
                }
            } else if (num.toString().length == 3 || num.toString().length == 7) {
                if (e.target.value.length > contact?.phone?.length) {
                    setContact({...contact, phone: num + '-'})
                } else {
                    setContact({...contact, phone: num})
                }
            } else {
                setContact({...contact, phone: num})
            }
            setIsErrorPhoneNumber({
                status: false,
                message: 'Please Enter Only Number'
            })
        } else {
            if (num.toString().includes("-")) {
                if (num.toString().length == 4 || num.toString().length == 8) {
                    if (e.target.value.length > contact?.phone?.length) {
                        setContact({...contact, phone: contact?.phone + '-' + num.slice(-1)})
                    } else {
                        setContact({...contact, phone: num})
                    }
                } else if (num.toString().length == 3 || num.toString().length == 7) {
                    if (e.target.value.length > contact?.phone?.length) {
                        setContact({...contact, phone: num + '-'})
                    } else {
                        setContact({...contact, phone: num})
                    }
                } else {
                    setContact({...contact, phone: num})
                }
                setIsErrorPhoneNumber({
                    status: false,
                    message: 'Please Enter Only Number'
                })
            } else {
                setIsErrorPhoneNumber({
                    status: true,
                    message: 'Please Enter Only Number'
                })
                setContact({...contact, phone: num})
            }
        }
    }

    const handleChangeInputText = (e: any, type: any) => {
        setContact({...contact, [type]: e.target.value})
    }

    const handleSubmitContact = async (event: any) => {
        event.preventDefault();
        if (isInputEmpty(contact.name) == false && isInputEmpty(contact.email) == false
            && isInputEmpty(contact.phone) == false && isInputEmpty(contact.message) == false) {
            const phoneTmpArr = contact.phone.toString().split("-");
            if (phoneTmpArr.length != 3) {
                setIsOpen({state: true, message: `Format Phone Number Invalid`});
            } else {
                const formData: emptyContactInter = {
                    name: contact?.name,
                    message: contact?.message,
                    phone: contact?.phone,
                    email: contact?.email
                }
                const postContactApi = async () => {
                    setIsLoading(true);
                    await postContact(formData)
                        .then(res => {
                            setIsOpen({state: true, message: `Send Contact Success`});
                            setContact(emptyContact);
                            setIsLoading(false)
                        })
                        .catch(err => {
                            setIsOpen({state: true, message: `Send Contact Error`});
                            setIsLoading(false)
                        })
                }
                postContactApi()
            }

        } else {
            setIsOpen({state: true, message: `Please Fill Information`});
        }
    }
    return (
        aboutUs != null ?
            <>
                <Spin spinning={isLoading}>
                    <Head>
                        <meta name="viewport" content="initial-scale=1, width=device-width"/>
                        <meta name="generator" content="Nails Or Never"/>
                        <title>Contact - {process.env.NEXT_PUBLIC_NAME_PRODUCT} - Malta</title>
                        <meta charSet="utf-8"/>
                        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                        <meta name="viewport" content="initial-scale=1, width=device-width"/>
                        <meta name="robots" content="index,follow"/>
                        <link rel="canonical" href="https://nailsornever.com/contact"/>

                        <meta name="description" content={` Located conveniently in Malta, NewYork, 12118,
                        ${process.env.NEXT_PUBLIC_NAME_PRODUCT} is one of the best salons in this area. ${process.env.NEXT_PUBLIC_NAME_PRODUCT} offers premier nails care and spa treatment services to satisfy your needs of enhancing natural beauty and refreshing your day.
                        mynewline Our salon takes pride in providing our valued customers all good services and top-high quality products as well as materials.
                        You can find all nail-related services and gift-card. At ${process.env.NEXT_PUBLIC_NAME_PRODUCT},
                        we take pride in providing you with all good products and qualified services to help you rejuvenate your beauty.
                        You always feel friendly and welcome from our passionate staff who understand what you want.`}/>
                        <meta name="keywords"
                              content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} &amp; SPA,MALTA,Contact extensions`}/>
                        <meta property="og:url" content="https://nailsornever.com/"/>
                        <meta property="og:type" content="Website"/>
                        <meta property="og:title"
                              content={`Contact with me - ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>
                        <meta property="og:description" content={`Located conveniently in Malta, NewYork, 12118,
                        ${process.env.NEXT_PUBLIC_NAME_PRODUCT} is one of the best salons in this area. ${process.env.NEXT_PUBLIC_NAME_PRODUCT} offers premier nails care and spa treatment services to satisfy your needs of enhancing natural beauty and refreshing your day.
                        mynewline Our salon takes pride in providing our valued customers all good services and top-high quality products as well as materials.
                        You can find all nail-related services and gift-card. At ${process.env.NEXT_PUBLIC_NAME_PRODUCT},
                        we take pride in providing you with all good products and qualified services to help you rejuvenate your beauty.
                        You always feel friendly and welcome from our passionate staff who understand what you want.`}/>
                        <meta property="og:image"
                              content="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png"/>
                        <meta name="generator" content={`Contact with me - ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify({
                                    "@context": "https://schema.org",
                                    "@type": "ContactPage",
                                    "name": `Contact - ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`,
                                    "description": `Contact ${process.env.NEXT_PUBLIC_NAME_PRODUCT} for nail care services in Malta, NY`,
                                    "url": "https://nailsornever.com/contact",
                                    "mainEntity": {
                                        "@type": "BeautySalon",
                                        "name": process.env.NEXT_PUBLIC_NAME_PRODUCT,
                                        "address": {
                                            "@type": "PostalAddress",
                                            "addressLocality": "Malta",
                                            "addressRegion": "NY",
                                            "postalCode": "12118",
                                            "addressCountry": "US",
                                            "streetAddress": aboutUs?.address || ""
                                        },
                                        "telephone": aboutUs?.tel || "",
                                        "email": aboutUs?.email || ""
                                    }
                                })
                            }}
                        />
                    </Head>

                    <Snackbar
                        autoHideDuration={3000}
                        style={{marginTop: "50px"}}
                        open={isOpen?.state as boolean}
                        anchorOrigin={{vertical: "top", horizontal: "right"}}
                        onClose={() => setIsOpen({...isOpen, state: false})}
                        message={`${isOpen?.message}`}
                    />

                    <HeaderTitle title="Contact Us" />
                    <section className="section-page-wrap contact" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
                        <div className="container-lg">
                            <div className="row gy-5 gx-3 g-lg-5">
                                {/* Contact Information Section */}
                                <div className="col-lg-6 order-1 order-lg-0">
                                    <AnimatedSection delay={0.1}>
                                        <motion.div
                                            initial={{ opacity: 0, x: -50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ duration: 0.6 }}
                                        >
                                    <div className="heading-flex mb-4">
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
                                                        marginBottom: '10px',
                                                        lineHeight: 1.2,
                                                        letterSpacing: '2px'
                                                    }}
                                                >
                                                    Contact
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
                                                    Information
                                                </motion.h3>
                                    </div>
                                            <div className="row g-3 g-sm-4 gx-md-5">
                                                <div className="col-sm-6 col-md-6">
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 30 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.5, delay: 0.4 }}
                                                        whileHover={{ scale: 1.02, y: -5 }}
                                                        className="contact-info-box"
                                                        style={{
                                                            padding: '25px 20px',
                                                            borderRadius: '12px',
                                                            backgroundColor: '#fff',
                                                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                                                            transition: 'all 0.3s ease',
                                                            height: '100%',
                                                            border: '1px solid rgba(127, 166, 129, 0.1)'
                                                        }}
                                                    >
                                                        <motion.h4
                                                            style={{
                                                                fontFamily: "'Mollie Glaston', sans-serif",
                                                                fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                                                                fontWeight: 500,
                                                                color: '#1a1a1a',
                                                                marginBottom: '15px',
                                                                letterSpacing: '1px'
                                                            }}
                                                        >
                                                            Address
                                                        </motion.h4>
                                                        <a 
                                                            className="text-decoration-underline" 
                                                            target="_blank"
                                                            href={`https://goo.gl/maps/2Wa838Gd6xxbD75h7`}
                                                            style={{
                                                                color: '#666',
                                                                textDecoration: 'none',
                                                                transition: 'color 0.3s ease',
                                                                display: 'block'
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                if (e.currentTarget) e.currentTarget.style.color = '#7fa681';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                if (e.currentTarget) e.currentTarget.style.color = '#666';
                                                            }}
                                                        >
                                                            <p style={{
                                                                margin: 0,
                                                                fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
                                                                lineHeight: 1.6,
                                                                fontFamily: "'Jost', sans-serif",
                                                                display: 'flex',
                                                                alignItems: 'flex-start',
                                                                gap: '10px'
                                                            }}>
                                                                <LocationOnIcon sx={{ fontSize: 22, color: '#7fa681', flexShrink: 0, marginTop: '2px' }} />
                                                                <span>{aboutUs?.address}</span>
                                                    </p>
                                                </a>
                                                    </motion.div>
                                            </div>
                                                <div className="col-sm-6 col-md-6">
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 30 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.5, delay: 0.5 }}
                                                        whileHover={{ scale: 1.02, y: -5 }}
                                                        className="contact-info-box"
                                                        style={{
                                                            padding: '25px 20px',
                                                            borderRadius: '12px',
                                                            backgroundColor: '#fff',
                                                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                                                            transition: 'all 0.3s ease',
                                                            height: '100%',
                                                            border: '1px solid rgba(127, 166, 129, 0.1)'
                                                        }}
                                                    >
                                                        <motion.h4
                                                            style={{
                                                                fontFamily: "'Mollie Glaston', sans-serif",
                                                                fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                                                                fontWeight: 500,
                                                                color: '#1a1a1a',
                                                                marginBottom: '15px',
                                                                letterSpacing: '1px'
                                                            }}
                                                        >
                                                            Email
                                                        </motion.h4>
                                                        <a 
                                                            className="text-decoration-underline"
                                                            href={`mailto:${aboutUs?.email}`}
                                                            style={{
                                                                color: '#666',
                                                                textDecoration: 'none',
                                                                transition: 'color 0.3s ease',
                                                                display: 'block'
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                if (e.currentTarget) e.currentTarget.style.color = '#7fa681';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                if (e.currentTarget) e.currentTarget.style.color = '#666';
                                                            }}
                                                        >
                                                            <p style={{
                                                                margin: 0,
                                                                fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
                                                                lineHeight: 1.6,
                                                                fontFamily: "'Jost', sans-serif",
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '10px',
                                                                wordBreak: 'break-word'
                                                            }}>
                                                                <EmailIcon sx={{ fontSize: 22, color: '#7fa681', flexShrink: 0 }} />
                                                                <span>{aboutUs?.email}</span>
                                                    </p>
                                                </a>
                                                    </motion.div>
                                            </div>
                                                <div className="col-sm-6 col-md-6">
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 30 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.5, delay: 0.6 }}
                                                        whileHover={{ scale: 1.02, y: -5 }}
                                                        className="contact-info-box"
                                                        style={{
                                                            padding: '25px 20px',
                                                            borderRadius: '12px',
                                                            backgroundColor: '#fff',
                                                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                                                            transition: 'all 0.3s ease',
                                                            height: '100%',
                                                            border: '1px solid rgba(127, 166, 129, 0.1)'
                                                        }}
                                                    >
                                                        <motion.h4
                                                            style={{
                                                                fontFamily: "'Mollie Glaston', sans-serif",
                                                                fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                                                                fontWeight: 500,
                                                                color: '#1a1a1a',
                                                                marginBottom: '15px',
                                                                letterSpacing: '1px'
                                                            }}
                                                        >
                                                            Phone
                                                        </motion.h4>
                                                        <a 
                                                            className="text-decoration-underline" 
                                                            href={`tel:${aboutUs?.tel}`}
                                                            style={{
                                                                color: '#666',
                                                                textDecoration: 'none',
                                                                transition: 'color 0.3s ease',
                                                                display: 'block'
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                if (e.currentTarget) e.currentTarget.style.color = '#7fa681';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                if (e.currentTarget) e.currentTarget.style.color = '#666';
                                                            }}
                                                        >
                                                            <p style={{
                                                                margin: 0,
                                                                fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
                                                                lineHeight: 1.6,
                                                                fontFamily: "'Jost', sans-serif",
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '10px'
                                                            }}>
                                                                <LocalPhoneIcon sx={{ fontSize: 22, color: '#7fa681', flexShrink: 0 }} />
                                                                <span>{aboutUs?.tel}</span>
                                                    </p>
                                                </a>
                                                    </motion.div>
                                            </div>
                                                <div className="col-sm-6 col-md-6">
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 30 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.5, delay: 0.7 }}
                                                        whileHover={{ scale: 1.02, y: -5 }}
                                                        className="contact-info-box"
                                                        style={{
                                                            padding: '25px 20px',
                                                            borderRadius: '12px',
                                                            backgroundColor: '#fff',
                                                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                                                            transition: 'all 0.3s ease',
                                                            height: '100%',
                                                            border: '1px solid rgba(127, 166, 129, 0.1)'
                                                        }}
                                                    >
                                                        <motion.h4
                                                            style={{
                                                                fontFamily: "'Mollie Glaston', sans-serif",
                                                                fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                                                                fontWeight: 500,
                                                                color: '#1a1a1a',
                                                                marginBottom: '15px',
                                                                letterSpacing: '1px'
                                                            }}
                                                        >
                                                            Social Media
                                                        </motion.h4>
                                                        <ul className="list-social" style={{ 
                                                            listStyle: 'none', 
                                                            padding: 0, 
                                                            margin: 0,
                                                            display: 'flex',
                                                            gap: '15px',
                                                            alignItems: 'center'
                                                        }}>
                                                            <li>
                                                                <motion.a 
                                                                    target="_blank" 
                                                                    href="#"
                                                                    whileHover={{ scale: 1.2, y: -3 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    style={{
                                                                        display: 'inline-flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        width: '40px',
                                                                        height: '40px',
                                                                        borderRadius: '50%',
                                                                        backgroundColor: '#7fa681',
                                                                        color: '#fff',
                                                                        textDecoration: 'none',
                                                                        transition: 'all 0.3s ease'
                                                                    }}
                                                                >
                                                                    <FacebookIcon sx={{ fontSize: 20 }} />
                                                                </motion.a>
                                                            </li>
                                                            <li>
                                                                <motion.a 
                                                                    target="_blank" 
                                                                    href="#"
                                                                    whileHover={{ scale: 1.2, y: -3 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    style={{
                                                                        display: 'inline-flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        width: '40px',
                                                                        height: '40px',
                                                                        borderRadius: '50%',
                                                                        backgroundColor: '#7fa681',
                                                                        color: '#fff',
                                                                        textDecoration: 'none',
                                                                        transition: 'all 0.3s ease'
                                                                    }}
                                                                >
                                                                    <InstagramIcon sx={{ fontSize: 20 }} />
                                                                </motion.a>
                                                            </li>
                                                </ul>
                                                    </motion.div>
                                            </div>
                                        </div>
                                        </motion.div>
                                    </AnimatedSection>
                                    </div>
                                {/* Contact Form Section */}
                                <div className="col-lg-6 order-0 order-lg-1">
                                    <AnimatedSection delay={0.2}>
                                        <motion.div
                                            initial={{ opacity: 0, x: 50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ duration: 0.6 }}
                                            className="contact-form"
                                            style={{
                                                paddingLeft: '0',
                                                paddingTop: '40px'
                                            }}
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.6, delay: 0.3 }}
                                                className="mb-4"
                                            >
                                                <h2 
                                                    className="title mb-2"
                                                    style={{
                                                        fontFamily: "'Mollie Glaston', sans-serif",
                                                        fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                                                        fontWeight: 400,
                                                        color: '#1a1a1a',
                                                        lineHeight: 1.2,
                                                        letterSpacing: '2px'
                                                    }}
                                                >
                                                    Get in touch
                                                </h2>
                                                <p style={{
                                                    fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
                                                    color: '#666',
                                                    lineHeight: 1.6,
                                                    fontFamily: "'Jost', sans-serif",
                                                    marginBottom: 0
                                                }}>
                                                    Questions regarding our services? Fill out the form below.
                                                </p>
                                            </motion.div>

                                            <form onSubmit={handleSubmitContact}>
                                                <div className="row g-4">
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.5, delay: 0.4 }}
                                                        className="col-md-12"
                                                    >
                                                        <label 
                                                            className="label-field" 
                                                            htmlFor="fullname"
                                                            style={{
                                                                fontFamily: "'Jost', sans-serif",
                                                                fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                                                                fontWeight: 500,
                                                                color: '#1a1a1a',
                                                                marginBottom: '8px',
                                                                display: 'block'
                                                            }}
                                                        >
                                                            Full name
                                                        </label>
                                                        <motion.div 
                                                            className="text-field"
                                                            whileFocus={{ scale: 1.01 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            <input 
                                                                autoComplete="off" 
                                                                type="text" 
                                                                name="Fullname"
                                                                value={contact?.name || ''}
                                                                id="fullname" 
                                                                placeholder="Enter your full name"
                                                                onChange={(e) => handleChangeInputText(e as any, 'name')}
                                                                style={{
                                                                    width: '100%',
                                                                    padding: '14px 18px',
                                                                    fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                                                                    fontFamily: "'Jost', sans-serif",
                                                                    border: 'none',
                                                                    borderRadius: '8px',
                                                                    outline: 'none',
                                                                    transition: 'all 0.3s ease',
                                                                    backgroundColor: '#f8f9fa',
                                                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                                                                }}
                                                                onFocus={(e) => {
                                                                    e.target.style.backgroundColor = '#fff';
                                                                    e.target.style.boxShadow = '0 0 0 3px rgba(127, 166, 129, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)';
                                                                }}
                                                                onBlur={(e) => {
                                                                    e.target.style.backgroundColor = '#f8f9fa';
                                                                    e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                                                                }}
                                                            />
                                                        </motion.div>
                                                    </motion.div>
                                                    
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.5, delay: 0.5 }}
                                                        className="col-md-6"
                                                    >
                                                        <label 
                                                            className="label-field" 
                                                            htmlFor="email"
                                                            style={{
                                                                fontFamily: "'Jost', sans-serif",
                                                                fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                                                                fontWeight: 500,
                                                                color: '#1a1a1a',
                                                                marginBottom: '8px',
                                                                display: 'block'
                                                            }}
                                                        >
                                                            Email address
                                                        </label>
                                                        <motion.div 
                                                            className="text-field"
                                                            whileFocus={{ scale: 1.01 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            <input 
                                                                autoComplete="off" 
                                                                type="email" 
                                                                name="fEmail"
                                                                   id="email"
                                                                   placeholder="Enter your email address"
                                                                value={contact?.email || ''}
                                                                onChange={(e) => handleChangeInputText(e as any, 'email')}
                                                                style={{
                                                                    width: '100%',
                                                                    padding: '14px 18px',
                                                                    fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                                                                    fontFamily: "'Jost', sans-serif",
                                                                    border: 'none',
                                                                    borderRadius: '8px',
                                                                    outline: 'none',
                                                                    transition: 'all 0.3s ease',
                                                                    backgroundColor: '#f8f9fa',
                                                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                                                                }}
                                                                onFocus={(e) => {
                                                                    e.target.style.backgroundColor = '#fff';
                                                                    e.target.style.boxShadow = '0 0 0 3px rgba(127, 166, 129, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)';
                                                                }}
                                                                onBlur={(e) => {
                                                                    e.target.style.backgroundColor = '#f8f9fa';
                                                                    e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                                                                }}
                                                            />
                                                        </motion.div>
                                                    </motion.div>
                                                    
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.5, delay: 0.6 }}
                                                        className="col-md-6"
                                                    >
                                                        <label 
                                                            className="label-field" 
                                                            htmlFor="phone"
                                                            style={{
                                                                fontFamily: "'Jost', sans-serif",
                                                                fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                                                                fontWeight: 500,
                                                                color: '#1a1a1a',
                                                                marginBottom: '8px',
                                                                display: 'block'
                                                            }}
                                                        >
                                                            Phone number
                                                        </label>
                                                        <motion.div 
                                                            className="text-field"
                                                            whileFocus={{ scale: 1.01 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            <input 
                                                                autoComplete="off" 
                                                                type="text" 
                                                                name="fPhone"
                                                                   id="phone"
                                                                maxLength={12} 
                                                                placeholder="Enter your phone number"
                                                                value={contact?.phone as any || ''}
                                                                   inputMode="numeric"
                                                                onChange={(e) => handleChangePhoneNumber(e as any)}
                                                                style={{
                                                                    width: '100%',
                                                                    padding: '14px 18px',
                                                                    fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                                                                    fontFamily: "'Jost', sans-serif",
                                                                    border: 'none',
                                                                    borderRadius: '8px',
                                                                    outline: 'none',
                                                                    transition: 'all 0.3s ease',
                                                                    backgroundColor: '#f8f9fa',
                                                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                                                                }}
                                                                onFocus={(e) => {
                                                                    e.target.style.backgroundColor = '#fff';
                                                                    e.target.style.boxShadow = '0 0 0 3px rgba(127, 166, 129, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)';
                                                                }}
                                                                onBlur={(e) => {
                                                                    e.target.style.backgroundColor = '#f8f9fa';
                                                                    e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                                                                }}
                                                            />
                                                        </motion.div>
                                                        {
                                                            isErrorPhoneNumber?.status == true ?
                                                                <motion.span
                                                                    initial={{ opacity: 0, y: -10 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    style={{
                                                                        color: "#e74c3c",
                                                                        fontSize: '0.9rem',
                                                                        fontFamily: "'Jost', sans-serif",
                                                                        marginTop: '5px',
                                                                        display: 'block'
                                                                    }}
                                                                >
                                                                    {isErrorPhoneNumber?.message}
                                                                </motion.span>
                                                                :
                                                                <></>
                                                        }
                                                    </motion.div>
                                                    
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.5, delay: 0.7 }}
                                                        className="col-lg-12"
                                                    >
                                                        <label 
                                                            className="label-field" 
                                                            htmlFor="message"
                                                            style={{
                                                                fontFamily: "'Jost', sans-serif",
                                                                fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                                                                fontWeight: 500,
                                                                color: '#1a1a1a',
                                                                marginBottom: '8px',
                                                                display: 'block'
                                                            }}
                                                        >
                                                            Message
                                                        </label>
                                                        <motion.div 
                                                            className="text-field"
                                                            whileFocus={{ scale: 1.01 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            <textarea 
                                                                autoComplete="off" 
                                                                rows={5}
                                                                name="fMessage" 
                                                                id="message"
                                                                      placeholder="Enter your message"
                                                                value={contact?.message || ''}
                                                                onChange={(e) => handleChangeInputText(e as any, 'message')}
                                                                style={{
                                                                    width: '100%',
                                                                    padding: '14px 18px',
                                                                    fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                                                                    fontFamily: "'Jost', sans-serif",
                                                                    border: 'none',
                                                                    borderRadius: '8px',
                                                                    outline: 'none',
                                                                    transition: 'all 0.3s ease',
                                                                    backgroundColor: '#f8f9fa',
                                                                    resize: 'vertical',
                                                                    minHeight: '120px',
                                                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                                                                }}
                                                                onFocus={(e) => {
                                                                    e.target.style.backgroundColor = '#fff';
                                                                    e.target.style.boxShadow = '0 0 0 3px rgba(127, 166, 129, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)';
                                                                }}
                                                                onBlur={(e) => {
                                                                    e.target.style.backgroundColor = '#f8f9fa';
                                                                    e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                                                                }}
                                                            />
                                                        </motion.div>
                                                    </motion.div>
                                                </div>

                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.5, delay: 0.8 }}
                                                    className="col-md-12 text-center"
                                                    style={{ paddingTop: "24px" }}
                                                >
                                                    <motion.button
                                                        type="submit"
                                                        value="Submit"
                                                        whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(127, 166, 129, 0.4)' }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="button button-lg"
                                                        style={{
                                                            backgroundColor: '#7fa681',
                                                            color: '#fff',
                                                            border: 'none',
                                                            padding: '16px 40px',
                                                            borderRadius: '8px',
                                                            fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
                                                            fontWeight: 500,
                                                            cursor: 'pointer',
                                                            fontFamily: "'Jost', sans-serif",
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '10px',
                                                            transition: 'all 0.3s ease',
                                                            minWidth: '180px',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <SendIcon sx={{ fontSize: 20 }} />
                                                        <span>Send Message</span>
                                                    </motion.button>
                                                </motion.div>
                                            </form>
                                        </motion.div>
                                    </AnimatedSection>
                                </div>
                            </div>
                        </div>
                    </section>
                </Spin>
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
                                Contact Information Coming Soon
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
                                We're currently updating our contact information. Please check back soon!
                            </p>
                        </motion.div>
                    </div>
                </section>
            </AnimatedSection>
    )
}

export async function getServerSideProps(context: any) {
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

ContactPage.Layout = MainLayout
export default ContactPage