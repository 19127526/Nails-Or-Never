import React, {useEffect, useState} from "react";
import {getDetailAboutUs} from "@/api-client/about-us/AboutUs.api";
import {convertWorkingHourToArray, getTimeAndUnit} from "@/utils/format-working-hour";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import Link from "next/link";
import ScrollToTop from "@/components/scroll-to-top";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Footer Section Component with Animation
const FooterSection: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
    children,
    delay = 0,
    className = ''
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const FooterComponent = () => {
    const [detailAboutUs, setDetailAboutUs] = useState({
        id : undefined,
        name : undefined,
        description : undefined,
        working_hour : undefined,
        tel : undefined,
        email : undefined,
        address : undefined,
        footage : undefined
    })
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        const getDetailAboutUsApi = async () => {
            try {
                setIsLoading(true)
                const res = await getDetailAboutUs()
                if (res?.data?.aboutUs?.[0]) {
                    setDetailAboutUs(res.data.aboutUs[0])
                }
            } catch (err) {
                console.error('Error fetching footer data:', err)
            } finally {
                setIsLoading(false)
            }
        }
        getDetailAboutUsApi()
    }, [])
    return (
        <>
            <ScrollToTop />
            <a className="btn-phone" href={`tel:${detailAboutUs?.tel}`} rel="nofollow">
                <div className="phone-group phone-green phone-show">
                    <div className="phone-ph-circle"></div>
                    <div className="phone-ph-circle-fill"></div>
                    <div className="phone-ph-img-circle"></div>
                </div>
            </a>
        <footer id="footer" className="footer" style={{ backgroundColor: '#e8f5e9', color: '#1a1a1a', position: 'relative' }}>
            <div className="footer-main" style={{
                paddingTop: 'clamp(60px, 8vw, 100px)',
                paddingBottom: 'clamp(50px, 6vw, 80px)'
            }}>
                <div className="container-lg">
                    <div className="row gy-4 gy-md-5 gx-3 gx-md-4 g-lg-5">
                        {/* Links Section */}
                        <FooterSection delay={0.1} className="col-6 col-md-6 col-lg-3 col-xl-2">
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="footer-col-title"
                                style={{
                                    fontFamily: "'Mollie Glaston', sans-serif",
                                    fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
                                    fontWeight: 500,
                                    color: '#1a1a1a',
                                    marginBottom: 'clamp(20px, 3vw, 30px)',
                                    letterSpacing: '1px',
                                    lineHeight: 1.2
                                }}
                            >
                                Links
                            </motion.h3>
                            <div className="footer-col-content">
                                {[
                                    { href: process.env.NEXT_PUBLIC_SERVICES_ROUTER, text: 'Our Services' },
                                    { href: process.env.NEXT_PUBLIC_GALLERY_ROUTER, text: 'Gallery' },
                                    { href: process.env.NEXT_PUBLIC_ABOUT_US_ROUTER, text: 'About Us' },
                                    { href: process.env.NEXT_PUBLIC_CONTACT_ROUTER, text: 'Contact' }
                                ].map((link, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.2 + idx * 0.08, ease: "easeOut" }}
                                    >
                                        <Link href={link.href as string} replace>
                                            <motion.p
                                                whileHover={{ x: 5, color: '#7fa681' }}
                                                whileTap={{ scale: 0.98 }}
                                                transition={{ duration: 0.2, ease: "easeOut" }}
                                                style={{
                                                    marginBottom: 'clamp(10px, 1.5vw, 14px)',
                                                    fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
                                                    fontFamily: "'Jost', sans-serif",
                                                    color: '#1a1a1a',
                                                    cursor: 'pointer',
                                                    transition: 'color 0.3s ease',
                                                    lineHeight: 1.5
                                                }}
                                            >
                                                {link.text}
                                            </motion.p>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </FooterSection>

                        {/* Operation Hours Section */}
                        <FooterSection delay={0.2} className="col-6 col-md-6 col-lg-3 col-xl-3">
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="footer-col-title"
                                style={{
                                    fontFamily: "'Mollie Glaston', sans-serif",
                                    fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
                                    fontWeight: 500,
                                    color: '#1a1a1a',
                                    marginBottom: 'clamp(20px, 3vw, 30px)',
                                    letterSpacing: '1px',
                                    lineHeight: 1.2
                                }}
                            >
                                Operation Hours
                            </motion.h3>
                            <div className="footer-col-content">
                                {
                                    detailAboutUs?.id != undefined ?
                                        convertWorkingHourToArray(detailAboutUs?.working_hour)?.map((index, number) => (
                                            <motion.p
                                                key={number}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: 0.3 + number * 0.08, ease: "easeOut" }}
                                                style={{
                                                    marginBottom: 'clamp(10px, 1.5vw, 14px)',
                                                    fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
                                                    fontFamily: "'Jost', sans-serif",
                                                    color: '#1a1a1a',
                                                    lineHeight: 1.6
                                                }}
                                            >
                                                <strong style={{ color: '#7fa681', marginRight: '8px' }}>{index?.date}:</strong>
                                                {getTimeAndUnit(index?.time?.start)} - {getTimeAndUnit(index?.time?.end)}
                                            </motion.p>
                                        ))
                                    :
                                    <></>
                                }
                            </div>
                        </FooterSection>

                        {/* Contact Section */}
                        <FooterSection delay={0.3} className="col-12 col-md-6 col-lg-3 col-xl-4">
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="footer-col-title"
                                style={{
                                    fontFamily: "'Mollie Glaston', sans-serif",
                                    fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
                                    fontWeight: 500,
                                    color: '#1a1a1a',
                                    marginBottom: 'clamp(20px, 3vw, 30px)',
                                    letterSpacing: '1px',
                                    lineHeight: 1.2
                                }}
                            >
                                Contact
                            </motion.h3>
                            <div className="footer-col-content">
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                                    style={{
                                        marginBottom: 'clamp(12px, 2vw, 18px)',
                                        fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
                                        fontFamily: "'Jost', sans-serif",
                                        color: '#1a1a1a',
                                        lineHeight: 1.6,
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 'clamp(8px, 1.2vw, 12px)'
                                    }}
                                >
                                    <LocationOnIcon sx={{ fontSize: 20, color: '#1a1a1a', flexShrink: 0, marginTop: '2px' }} />
                                    <a
                                        target="_blank"
                                        href={`https://goo.gl/maps/2Wa838Gd6xxbD75h7`}
                                        style={{
                                            color: '#1a1a1a',
                                            textDecoration: 'none',
                                            transition: 'color 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (e.currentTarget) e.currentTarget.style.color = '#7fa681';
                                        }}
                                        onMouseLeave={(e) => {
                                            if (e.currentTarget) e.currentTarget.style.color = '#1a1a1a';
                                        }}
                                    >
                                        {detailAboutUs?.address || '2374 US-9, Malta, NY 12118'}
                                    </a>
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                                    style={{
                                        marginBottom: 'clamp(12px, 2vw, 18px)',
                                        fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
                                        fontFamily: "'Jost', sans-serif",
                                        color: '#1a1a1a',
                                        lineHeight: 1.6,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'clamp(8px, 1.2vw, 12px)'
                                    }}
                                >
                                    <LocalPhoneIcon sx={{ fontSize: 20, color: '#1a1a1a', flexShrink: 0 }} />
                                    <a
                                        href={`tel:${detailAboutUs?.tel || '518-400-1028'}`}
                                        style={{
                                            color: '#1a1a1a',
                                            textDecoration: 'none',
                                            transition: 'color 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (e.currentTarget) e.currentTarget.style.color = '#7fa681';
                                        }}
                                        onMouseLeave={(e) => {
                                            if (e.currentTarget) e.currentTarget.style.color = '#1a1a1a';
                                        }}
                                    >
                                        {detailAboutUs?.tel || '518-400-1028'}
                                    </a>
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                                    style={{
                                        marginBottom: 'clamp(15px, 2.5vw, 25px)',
                                        fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
                                        fontFamily: "'Jost', sans-serif",
                                        color: '#1a1a1a',
                                        lineHeight: 1.6,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'clamp(8px, 1.2vw, 12px)',
                                        wordBreak: 'break-word'
                                    }}
                                >
                                    <EmailIcon sx={{ fontSize: 20, color: '#1a1a1a', flexShrink: 0 }} />
                                    <a
                                        href={`mailto:${detailAboutUs?.email || 'nailsornever@gmail.com'}`}
                                        style={{
                                            color: '#1a1a1a',
                                            textDecoration: 'none',
                                            transition: 'color 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (e.currentTarget) e.currentTarget.style.color = '#7fa681';
                                        }}
                                        onMouseLeave={(e) => {
                                            if (e.currentTarget) e.currentTarget.style.color = '#1a1a1a';
                                        }}
                                    >
                                        {detailAboutUs?.email || 'nailsornever@gmail.com'}
                                    </a>
                                </motion.p>
                                <motion.ul
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
                                    className="list-social"
                                    style={{
                                        listStyle: 'none',
                                        padding: 0,
                                        margin: 0,
                                        display: 'flex',
                                        gap: 'clamp(12px, 2vw, 18px)',
                                        alignItems: 'center',
                                        flexWrap: 'wrap'
                                    }}
                                >
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
                                                width: 'clamp(36px, 4vw, 44px)',
                                                height: 'clamp(36px, 4vw, 44px)',
                                                borderRadius: '50%',
                                                backgroundColor: '#4a7c59',
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
                                                width: 'clamp(36px, 4vw, 44px)',
                                                height: 'clamp(36px, 4vw, 44px)',
                                                borderRadius: '50%',
                                                backgroundColor: '#4a7c59',
                                                color: '#fff',
                                                textDecoration: 'none',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <InstagramIcon sx={{ fontSize: 20 }} />
                                        </motion.a>
                                    </li>
                                </motion.ul>
                            </div>
                        </FooterSection>

                        {/* Google Maps Section */}
                        <FooterSection delay={0.4} className="col-12 col-md-12 col-lg-3 col-xl-3 order-md-1">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                                style={{
                                    borderRadius: 'clamp(8px, 1.2vw, 12px)',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                                    height: '100%',
                                    minHeight: 'clamp(200px, 30vw, 280px)'
                                }}
                            >
                                <iframe
                                    src="https://www.google.com/maps/embed/v1/place?q=2374+US-9,+Mechanicville,+NY+12118,+Hoa+Kỳ&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                                    width="100%"
                                    height="100%"
                                    style={{ border: "0", minHeight: '250px' }}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </motion.div>
                        </FooterSection>
                    </div>
                </div>
            </div>
            {/*Footer Design*/}
            <div className="footer-absolute" style={{
                borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                backgroundColor: '#7fa681'
            }}>
                <div className="container-lg">
                    <div className="row">
                        <div className="col-lg-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="text-center"
                                style={{
                                    padding: 'clamp(15px, 2.5vw, 25px) 0',
                                    fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
                                    fontFamily: "'Jost', sans-serif"
                                }}
                            >
                                <motion.span
                                    style={{
                                        display: 'block',
                                        marginBottom: 'clamp(6px, 1vw, 10px)',
                                        color: '#fff',
                                        lineHeight: 1.5
                                    }}
                                >
                                    © {new Date().getFullYear()} <strong style={{ color: '#fff' }}>Nails or Never</strong>
                                </motion.span>
                                <motion.span
                                    style={{
                                        display: 'block',
                                        fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)',
                                        color: '#fff',
                                        lineHeight: 1.5
                                    }}
                                >
                                    Designed by{' '}
                                    <a
                                        target="_blank"
                                        href='mailto:phamtienquan2001@gmail.com'
                                        style={{
                                            color: '#fff',
                                            textDecoration: 'none',
                                            transition: 'color 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (e.currentTarget) e.currentTarget.style.color = '#e8f5e9';
                                        }}
                                        onMouseLeave={(e) => {
                                            if (e.currentTarget) e.currentTarget.style.color = '#fff';
                                        }}
                                    >
                                        <strong>NAILS OR NEVER &amp; WEB DESIGN</strong>
                                    </a>
                                </motion.span>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}






export default FooterComponent
