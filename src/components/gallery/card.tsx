import {Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CollectionsIcon from '@mui/icons-material/Collections';
import React from "react";
import "./card.css"
import {useRouter} from "next/router";
const CardGalleryComponent = (props : any) => {
    const {galleryDetail} = props;
    const router = useRouter()
    const handleClickDetail = () => {
        router.push(process.env.NEXT_PUBLIC_DETAIL_GALLERY_ROUTER+`/${galleryDetail?.theme}`)
    }
    return (
        <>
            <div className="col-xs-12 col-sm-6 col-md-4 col-item mt-2" style={{}} key={galleryDetail?.id}>
                <Card >
                    <CardActionArea className="card-gallery">
                        <CardMedia
                            component="img"
                            height ={200}
                            style={{
                                backgroundPosition: "center",
                                backgroundSize : "unset",
                                backgroundRepeat : "no-repeat"
                            }}
                            image={galleryDetail?.image}
                            alt={galleryDetail?.theme}
                        />
                        <CardContent className="service-list">
                            <h2 className="service-list-name">{galleryDetail?.theme}</h2>
                            <div className="service-item-name">
                                ${galleryDetail?.description}
                            </div>
                        </CardContent>
                    </CardActionArea>
                    <CardActions style={{float :"right"}}>
                        <button className="button icon-button" onClick={() => handleClickDetail()} >
                            <span>See Detail</span>
                            <CollectionsIcon className="fa-solid fa-calendar-days ms-2" sx={{ fontSize: 18 }} style={{paddingBottom:"3px", paddingRight:"2px"}} />
                        </button>
                    </CardActions>
                </Card>
            </div>

        </>
    )
}


export default CardGalleryComponent