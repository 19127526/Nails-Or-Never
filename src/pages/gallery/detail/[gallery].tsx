import MainLayout from "@/components/layout/main";
import Head from "next/head";
import React, {useEffect} from "react";
import CardGalleryDetailComponent from "@/components/gallery/carddetail";
import {useRouter} from "next/router";
import {getAllSubGalleryByParentTheme} from "@/api-client/gallery/Gallery.api";
import {useDispatch} from "react-redux";
import {turnOffLoading} from "@/components/loading/index.actions";

const DetailGalleryPage = ({gallerySub}) => {
    const router = useRouter();
    const { gallery } = router.query
    const dispatch = useDispatch()
    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
                <meta name="generator" content="Nails Or Never"/>
                <title>{process.env.NEXT_PUBLIC_NAME_PRODUCT} – List Detail ${gallery}</title>
            </Head>
            <div className="page-title"
                 style={{backgroundImage: "url(https://w20.wocmarketing.com/wp-content/themes/woctheme/assets/images/page-bg.jpg)"}}>
                <div className="container-lg">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="text-center mb-0">Detail {gallery} Gallery  </h1>
                        </div>
                    </div>
                </div>
            </div>
            <section id="gallery" className="section-page-wrap section-gallery" style={{paddingTop: "30px", paddingBottom : "30px"}}  >
                <div className="container-lg">
                    <div className="row g-2">
                        {
                            gallerySub != null ?
                                [...gallerySub?.gallery]?.map(index =>
                                    <CardGalleryDetailComponent detailGallery={index}/>
                                )
                                :
                                <></>
                        }
                    </div>

                </div>
            </section>
        </>
    )
}


export async function getServerSideProps(context) {
    try {
        const {params} = context ?? "1"
        const listSubGallery = await getAllSubGalleryByParentTheme({theme: params?.gallery});
        const data = await listSubGallery?.data
        return {
            props: {
                gallerySub: data,
            }
        }
    }
    catch (err) {
        return {
            props: {
                gallerySub: null,
            }
        }
    }

}


DetailGalleryPage.Layout = MainLayout
export default DetailGalleryPage