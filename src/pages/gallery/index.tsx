import MainLayout from "@/components/layout/main";
import {Pagination} from "@mui/material";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useRouter} from "next/router";
import CardGalleryComponent from "@/components/gallery/card";
import Head from "next/head";
import {getGalleryPagination} from "@/api-client/gallery/Gallery.api";
import {turnOffLoading} from "@/components/loading/index.actions";
import {useDispatch} from "react-redux";

const GalleryPage = ({galleryParent}) => {

    const [pagination, setPagination] = useState<number>(1)
    const route = useRouter();
    const dispatch = useDispatch()
    useEffect(() => {
        console.log("all api here", route?.query?.page)
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
        galleryParent != null ?
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
                <meta name="generator" content="Nails Or Never"/>
                <title>{process.env.NEXT_PUBLIC_NAME_PRODUCT} – List Gallery Nail</title>
            </Head>
            <div className="page-title"
                 style={{backgroundImage: "url(https://w20.wocmarketing.com/wp-content/themes/woctheme/assets/images/page-bg.jpg)"}}>
                <div className="container-lg">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="text-center mb-0">Our Gallery</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section className="section-page-wrap"  style={{paddingTop: "30px", paddingBottom : "30px"}}>
                <div className="container-lg">
                    <div className="row g-2">
                        {
                            [...galleryParent?.galleryParent]?.map(index => <CardGalleryComponent galleryDetail={index}/>)
                        }
                    </div>

                    <div className="col-lg-12">
                        <nav className="text-center">
                            <ul className="pagination justify-content-center mt-5 mb-0">
                                <Pagination count={galleryParent?.pages} onChange={handleChangePagination} page={pagination} />
                            </ul>
                        </nav>
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
        const page = context?.query?.page ?? "1";
        // `getStaticProps` is executed on the server side.
        const gallery = await getGalleryPagination({page : page, limit : 6})
        const data = await gallery?.data
        return {
            props: {
                galleryParent: data,
            }
        }
    }
    catch (err) {
        return {
            props: {
                galleryParent: null,
            }
        }
    }
}

GalleryPage.Layout = MainLayout

export default GalleryPage