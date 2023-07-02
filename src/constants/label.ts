import {labelHeaderInterFace} from "@/model/header";
import Link from "next/link";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import React from "react";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

export const colorMain = '#7fa681'

export const DateInto = {
    0 : [2, 3, 4, 5, 6],
    1 : [7],
    2 : [8]
}

export const mainName = 'Nail Or Never'

export const labelHeader : labelHeaderInterFace [] = [
    {
        label : "Home",
        url : process.env.NEXT_PUBLIC_HOME_ROUTER
    },
    {
        label : "Service",
        url : process.env.NEXT_PUBLIC_SERVICES_ROUTER
    },
    {
        label : "Gallery",
        url : process.env.NEXT_PUBLIC_GALLERY_ROUTER
    },
    {
        label : "Gift Cards",
        url : process.env.NEXT_PUBLIC_GIFTCARDS_ROUTER
    },
    {
        label : "About Us",
        url : process.env.NEXT_PUBLIC_ABOUT_US_ROUTER
    },
    {
        label : "Contact",
        url : process.env.NEXT_PUBLIC_CONTACT_ROUTER
    },
]


