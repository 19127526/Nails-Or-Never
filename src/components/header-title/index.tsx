import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import defaultImage from "@/public/images/Untitled.jpeg";

interface HeaderTitleProps {
    title: string;
    backgroundImage?: string | { src: string };
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ title, backgroundImage }) => {
    // Use provided image or default image
    const imageSrc = backgroundImage 
        ? (typeof backgroundImage === 'string' ? backgroundImage : backgroundImage.src)
        : defaultImage.src;

    // Parallax effect for background image
    const { scrollY } = useScroll();
    const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

    // Animation variants for title
    const titleVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                delay: 0.2
            }
        }
    };

    // Animation for container
    const containerVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut" as const
            }
        }
    };

    return (
        <motion.div 
            className="page-title"
            style={{
                backgroundImage: `url(${imageSrc})`,
                position: 'relative',
                overflow: 'hidden'
            }}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Parallax background layer */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '120%',
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    y: backgroundY,
                    opacity: opacity,
                    willChange: 'transform'
                }}
            />
            
            {/* Content */}
            <div className="container-lg" style={{ position: 'relative', zIndex: 2 }}>
                <div className="row">
                    <div className="col-lg-12">
                        <motion.h1 
                            className="text-center mb-0"
                            variants={titleVariants}
                            style={{
                                fontFamily: "'Mollie Glaston', sans-serif",
                                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                                fontWeight: 400,
                                color: '#1a1a1a',
                                lineHeight: 1.2,
                                padding: '0 20px'
                            }}
                        >
                            {title}
                        </motion.h1>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default HeaderTitle
