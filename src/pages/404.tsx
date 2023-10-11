import Head from 'next/head';
import {Box, Button, Container, Typography} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmptyLayout from "@/components/layout/empty";
import Link from "next/link";
import {useDispatch} from "react-redux";
import React, {useEffect} from "react";
import {turnOffLoading} from "@/components/loading/index.actions";

const NotFound = () => {
    const dispatch = useDispatch()

   return(<>
        <Head>
            <meta charSet="utf-8"/>
            <meta httpEquiv="X-UA-Compatible"content="IE=edge"/>
            <meta name="viewport" content="initial-scale=1, width=device-width"/>
            <meta name="robots" content="index,follow"/>
              <link ref="canonical" href="https://nailsornever.com"/>
            <title>Empty Page - {process.env.NEXT_PUBLIC_NAME_PRODUCT} - Malta</title>
            <meta name="description" content={`We have many years of experience in the
                                nail industry. Renowned for its friendly, unpretentious staff, esthetically pleasing and
                                soothing atmosphere and more notable for its qualified and certified professionals. You
                                will feel the difference the minute you walk through our door.`}/>
            <meta name="keywords"
                  content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} &amp; SPA,MALTA,Empty extensions`}/>
            <meta property="og:url" content="https://nailsornever.com/"/>
            <meta property="og:type" content="Website"/>
            <meta property="og:title" content={`Empty Page - ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>
            <meta property="og:description" content={`We have many years of experience in the
                                nail industry. Renowned for its friendly, unpretentious staff, esthetically pleasing and
                                soothing atmosphere and more notable for its qualified and certified professionals. You
                                will feel the difference the minute you walk through our door.`}/>
            <meta property="og:image"
                  content="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png"/>
            <meta name="generator"  content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>

        </Head>
        <Box
            component="main"
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                minHeight: '100%'
            }}
        >
            <Container maxWidth="md">
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Typography
                        align="center"
                        color="textPrimary"
                        variant="h3"
                    >
                        Not Found
                    </Typography>
                    <Box sx={{textAlign: 'center'}}>
                        <img
                            alt="Under development"
                            src="../images/not_found.svg"
                            style={{
                                marginTop: 50,
                                display: 'inline-block',
                                maxWidth: '100%',
                                width: 560
                            }}
                        />
                    </Box>
                    <Typography
                        align="center"
                        color="textPrimary"
                        variant="subtitle2"
                    >
                        You either tried some shady route or you came here by mistake.
                        Whichever it is, try using the navigation
                    </Typography>
                    <Link href={"/"} replace>
                        <Button
                            startIcon={(<ArrowBackIcon fontSize="small"/>)}
                            sx={{mt: 3}}
                            variant="contained"
                        >
                            Go back to dashboard
                        </Button>
                    </Link>
                </Box>
            </Container>
        </Box>
    </>)
}

NotFound.Layout = EmptyLayout
export default NotFound;