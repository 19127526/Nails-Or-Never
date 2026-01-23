import {useEffect, useState} from "react";
import Image from "next/image";
import {getSubServicePagination} from "@/api-client/service/Services.api";
import useSWR from "swr";
import {useDispatch} from "react-redux";
import {turnOffLoading, turnOnLoading} from "@/components/loading/index.actions";
import {mainName} from "@/constants/label";
import { motion } from "framer-motion";

const CardServiceComponent = (props : any) => {
    const {parentService, subService} = props
    return (
        <div className="col-lg-12" key={parentService?.id}>
            <motion.div
                className="service-list"
                id="nails-enhancement"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                    padding: 'clamp(30px, 4vw, 50px)',
                    marginBottom: 'clamp(30px, 4vw, 50px)',
                    borderRadius: '15px',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease'
                }}
            >
                <div className="row justify-content-center align-items-center gx-3 gx-md-4 gx-lg-5">
                    <div className="col-9 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                        <motion.div
                            className="service-list-thumb-wrap"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            whileHover={{ scale: 1.02 }}
                            style={{ transition: 'transform 0.3s ease' }}
                        >
                            <div className="service-list-thumb" style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden' }}>
                                <Image
                                    src={parentService?.image}
                                    alt={`${parentService?.name} nail service in Malta, NY - ${mainName} professional nail salon`}
                                    fill
                                    quality={90}
                                    loading="lazy"
                                    style={{
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        borderRadius: '50rem 50rem 0 0'
                                    }}
                                />
                            </div>
                        </motion.div>
                    </div>
                    <div className="col-md-8 col-lg-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="service-list-name"
                            style={{
                                fontFamily: "'Mollie Glaston', sans-serif",
                                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                                fontWeight: 400,
                                color: '#1a1a1a',
                                marginBottom: 'clamp(15px, 2vw, 20px)',
                                lineHeight: 1.2,
                                letterSpacing: '1px'
                            }}
                        >
                            {parentService?.name}
                        </motion.h2>
                        {parentService?.description == null || parentService?.description == '' || parentService?.description == 'null' ?
                            <></>
                            :
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="service-list-description"
                                style={{
                                    fontFamily: "'Jost', sans-serif",
                                    fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                                    fontWeight: 400,
                                    color: '#666',
                                    marginBottom: 'clamp(20px, 3vw, 30px)',
                                    lineHeight: 1.6
                                }}
                            >
                                {parentService?.description}
                            </motion.h2>
                        }
                        <ul className="service-item-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {
                                [...subService]?.map((index, idx) =>
                                    <motion.li
                                        key={index?.id}
                                        className="service-item"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.5 + idx * 0.08, ease: "easeOut" }}
                                        whileHover={{ x: 5, backgroundColor: 'rgba(127, 166, 129, 0.05)' }}
                                        style={{
                                            padding: 'clamp(15px, 2vw, 20px)',
                                            marginBottom: 'clamp(10px, 1.5vw, 15px)',
                                            borderRadius: '10px',
                                            transition: 'all 0.3s ease',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <div className="box-wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '15px' }}>
                                            <div className="box-left" style={{ flex: 1 }}>
                                                <div
                                                    className="service-item-name"
                                                    style={{
                                                        fontFamily: "'Jost', sans-serif",
                                                        fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                                                        fontWeight: 500,
                                                        color: '#1a1a1a',
                                                        marginBottom: '8px',
                                                        lineHeight: 1.4
                                                    }}
                                                >
                                                    {index?.name}
                                                </div>
                                                    {index?.description == null || index?.description == '' ?
                                                        <></>
                                                        :
                                                    <div
                                                        className="service-item-desc"
                                                        style={{
                                                            fontFamily: "'Jost', sans-serif",
                                                            fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
                                                            fontWeight: 400,
                                                            color: '#666',
                                                            lineHeight: 1.5
                                                        }}
                                                    >
                                                            {index?.description}
                                                        </div>
                                                    }
                                            </div>
                                            <div className="box-right" style={{ flexShrink: 0 }}>
                                                <div
                                                    className="service-item-price"
                                                    style={{
                                                        fontFamily: "'Jost', sans-serif",
                                                        fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
                                                        fontWeight: 600,
                                                        color: '#7fa681',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    ${index?.id == 33 ? `${index.price} up` : index.price}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default CardServiceComponent