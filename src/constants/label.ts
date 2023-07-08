import {labelHeaderInterFace} from "@/model/header";
import Link from "next/link";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import React from "react";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

export const colorMain = '#7fa681'

export const DateInto : any = {
    0 : [2, 3, 4, 5, 6],
    1 : [7],
    2 : [8]
}

export const mainName = 'Nails Or Never'

export const labelHeader : labelHeaderInterFace [] = [
    {
        label : "Home",
        url : process.env.NEXT_PUBLIC_HOME_ROUTER as string
    },
    {
        label : "Service",
        url : process.env.NEXT_PUBLIC_SERVICES_ROUTER as string
    },
    {
        label : "Gallery",
        url : process.env.NEXT_PUBLIC_GALLERY_ROUTER as string
    },
    {
        label : "Gift Cards",
        url : process.env.NEXT_PUBLIC_GIFTCARDS_ROUTER as string
    },
    {
        label : "About Us",
        url : process.env.NEXT_PUBLIC_ABOUT_US_ROUTER as string
    },
    {
        label : "Contact",
        url : process.env.NEXT_PUBLIC_CONTACT_ROUTER as string
    },
]


