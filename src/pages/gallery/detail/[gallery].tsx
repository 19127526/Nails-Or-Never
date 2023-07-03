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
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
                <meta name="generator" content="Nails Or Never"/>
                <title>List Theme Gallery ${gallery}-{process.env.NEXT_PUBLIC_NAME_PRODUCT}</title>
                <meta charSet="utf-8"/>
                <meta httpEquiv="X-UA-Compatible"content="IE=edge"/>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
                <meta name="robots" content="max-image-preview:large"/>
                <meta name="canonical" href="https://nailsornever.com"/>
                <meta name="description" content={`Located conveniently in Malta, NewYork, 12118,
                        ${process.env.NEXT_PUBLIC_NAME_PRODUCT} is one of the best salons in this area. ${process.env.NEXT_PUBLIC_NAME_PRODUCT} offers premier nails care and spa treatment services to satisfy your needs of enhancing natural beauty and refreshing your day.
                        mynewline Our salon takes pride in providing our valued customers all good services and top-high quality products as well as materials.
                        also, in ${gallery}, we have ${[...gallerySub?.gallery]?.length} theme gallery collection. 
                       Let's come to our nail salon to see how deluxe salon & the unique nail art only at our salon`}/>
                <meta name="keywords"
                      content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} &amp; SPA,MALTA,List Theme Gallery,${gallery} extensions`}/>
                <meta property="og:url" content="https://nailsornever.com/"/>
                <meta property="og:type" content="Website"/>
                <meta property="og:title" content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} &amp-List Theme Gallery-${gallery}; SPA`}/>
                <meta property="og:description" content={`Located conveniently in Malta, NewYork, 12118,
                        ${process.env.NEXT_PUBLIC_NAME_PRODUCT} is one of the best salons in this area. ${process.env.NEXT_PUBLIC_NAME_PRODUCT} offers premier nails care and spa treatment services to satisfy your needs of enhancing natural beauty and refreshing your day.
                        mynewline Our salon takes pride in providing our valued customers all good services and top-high quality products as well as materials.
                        also, in ${gallery}, we have ${[...gallerySub?.gallery]?.length} theme gallery collection. 
                       Let's come to our nail salon to see how deluxe salon & the unique nail art only at our salon`}/>
                <meta property="og:image"
                      content="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png"/>
                <meta name="generator"  content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>
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
        const listSubGallery = await getAllSubGalleryByParentTheme( params?.gallery as string);
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