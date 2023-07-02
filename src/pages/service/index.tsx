import MainLayout from "@/components/layout/main";
import CardServiceComponent from "@/components/services/card";
import {Pagination} from "@mui/material";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import {getSubServicePagination} from "@/api-client/service/Services.api";
import {useDispatch, useSelector} from "react-redux";
import {turnOffLoading, turnOnLoading} from "@/components/loading/index.actions";
const ServicesPage = ({services, giftCard}) => {
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
                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                    <meta name="generator" content="Nails Or Never"/>
                    <title>{process.env.NEXT_PUBLIC_NAME_PRODUCT} – List Service Nail</title>
                </Head>

                <div className="page-title"
                     style={{backgroundImage: "url(https://w20.wocmarketing.com/wp-content/themes/woctheme/assets/images/page-bg.jpg)"}}>
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
                                [...services?.services]?.map(index => <CardServiceComponent   parentService={index} subService={index?.service}/>)
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


export async function getServerSideProps(context) {
    try {
        const {params} = context ?? "1"
        const page = context?.query?.page ?? "1";
        // `getStaticProps` is executed on the server side.
        const services = await getSubServicePagination({page : page, limit : 5})
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