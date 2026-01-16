import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";
import Image from "next/image";
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import {mainName} from "@/constants/label";

const CardGalleryDetailComponent = (props : any) => {
    const {detailGallery} = props;
    return (
        <div className="col-6 col-sm-4 col-md-3 col-item" style={{}} key={detailGallery?.id}>
            <a href={detailGallery?.image}
               data-lightbox="our-photos">
                <div className="gallery-item">
                    <div className="ratio ratio-1x1">
                        <div className="ratio-body" style={{ position: 'relative' }}>
                            <Image
                                src={detailGallery?.image}
                                alt={`${mainName} - Nail art gallery image`}
                                fill
                                quality={85}
                                loading="lazy"
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center'
                                }}
                            />
                        </div>
                        <div className="icon-zoom">
                            <CenterFocusWeakIcon className="fa-solid fa-calendar-days" sx={{fontSize: 40}}
                                              style={{paddingBottom: "3px", paddingRight: "2px"}}/>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}


export default CardGalleryDetailComponent