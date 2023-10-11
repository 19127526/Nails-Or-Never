import MainLayout from "@/components/layout/main";
import CardServiceComponent from "@/components/services/card";
import {Pagination} from "@mui/material";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import {getSubServicePagination} from "@/api-client/service/Services.api";
import {useDispatch, useSelector} from "react-redux";
import {turnOffLoading, turnOnLoading} from "@/components/loading/index.actions";
import image from "../../public/images/Untitled.jpeg"
const ServicesPage = (props: any) => {
    const {services} = props
    const [pagination, setPagination] = useState<number>(1)
    const route = useRouter()
    const dispatch = useDispatch()
    console.log(props)
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
                      <link ref="canonical" href="http://nailsornever.com"/>
                    <title>Services - {process.env.NEXT_PUBLIC_NAME_PRODUCT} - Malta</title>
                    <meta name="description" content={` In ${process.env.NEXT_PUBLIC_NAME_PRODUCT}, we provide some service such as 
                    ${[...services?.services]?.map(index => ` ${index?.name}`)}. You can booking service in my website`}/>
                    <meta name="keywords"
                          content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} &amp; SPA,MALTA,${[...services?.services]?.map(index => ` ${index?.name}`)} extensions`}/>
                    <meta property="og:url" content="http://nailsornever.com/"/>
                    <meta property="og:type" content="Website"/>
                    <meta property="og:title" content={`Services Nail - ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>
                    <meta property="og:description" content={` In ${process.env.NEXT_PUBLIC_NAME_PRODUCT}, we provide some service such as 
                    ${[...services?.services]?.map(index => `${index?.name}`)}. You can booking service in my website`}/>
                    <meta property="og:image"
                          content="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png"/>
                    <meta name="generator"  content={`Services Nail - ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>
                </Head>

                <div className="page-title"
                     style={{backgroundImage: `url(${image.src})`}}>
                    <div className="container-lg">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="text-center mb-0">Our Services</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="section-page-wrap">
                    <div className="container-lg">
                        <div className="row justify-content-center gy-5 gx-3 g-lg-5">
                            {
                                [...services?.services]?.map((index : any) => <CardServiceComponent   parentService={index as any} subService={index?.service as any}/>)
                            }
                            <div className="col-lg-12">
                                <nav className="text-center">
                                    <ul className="pagination justify-content-center mt-5 mb-0">
                                        <Pagination count={services?.pages} onChange={handleChangePagination} page={pagination} />
                                    </ul>
                                </nav>
                            </div>
                        </div>
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