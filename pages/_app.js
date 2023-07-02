import React from 'react';
import { LayoutProvider } from '../layout/context/layoutcontext';
import Layout from '../layout/layout';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';
import "../styles/layout/_antd.css"
import {Provider} from 'react-redux'
import LoadingComponent from "../components/loading";
import {persistor, store} from "../app/store";
import { PersistGate } from 'redux-persist/integration/react';
import {SWRConfig} from "swr/_internal";
import axiosClient from "../api-client/axiosClient";
import Authenticate from "../authenticate";

export default function MyApp({ Component, pageProps }) {
    if (Component.getLayout) {
        return <LayoutProvider>{Component.getLayout(<Component {...pageProps} />)}</LayoutProvider>;
    } else {
        return (
          <Provider store={store}>
            <PersistGate loading={<LoadingComponent/>} persistor={persistor}>
                <SWRConfig value={{fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false}}>
            <LayoutProvider>
                <Authenticate>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Authenticate>
            </LayoutProvider>
                </SWRConfig>
            </PersistGate>
          </Provider>
        );
    }
}
