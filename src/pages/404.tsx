import Head from 'next/head';
import {Box, Button, Container, Typography} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmptyLayout from "@/components/layout/empty";
import Link from "next/link";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {turnOffLoading} from "@/components/loading/index.actions";

const NotFound = () => {
    const dispatch = useDispatch()

   return(<>
        <Head>
            <title>
                404
            </title>
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