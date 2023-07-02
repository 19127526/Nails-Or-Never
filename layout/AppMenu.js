import React, {useContext, useEffect, useState} from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { getServicesParentWithOutPagination} from "../api-client/services/Services.api";
import useSWR from "swr";
import {useDispatch} from "react-redux";
import {turnOffLoading, turnOnLoading} from "../components/loading/index.actions";
import {getListParentGallery} from "../api-client/gallery/Gallery.api";

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const dispatch = useDispatch()
    const {data : listServiceParentApi, mutate : mutateListServiceParent} = useSWR('list-service-parent-with-out-pagination', () => getServicesParentWithOutPagination())
    const {data : listGalleryParentApi, error, mutate : mutateListGalleryParent} = useSWR('list-gallery-parent-with-out-pagination', () => getListParentGallery({pagination : 0}))

    const [listGalleryParent, setListGalleryParent] = useState([]);
    const [listServiceParent, setListServiceParent] = useState([]);
    useEffect(() => {
        if (listGalleryParentApi === undefined) {
        } else {
            setListGalleryParent([{theme : "Add Parent Gallery", id : 'add'},...listGalleryParentApi?.data?.data])
        }
    }, [listGalleryParentApi, dispatch]);

    useEffect(() => {
        mutateListGalleryParent();
    }, [mutateListGalleryParent])

    useEffect(() => {
        if (listServiceParentApi === undefined) {
            dispatch(turnOnLoading());
        } else {
            setListServiceParent([{name : "Add Parent Service", id : 'add'},...listServiceParentApi?.data?.data])
            dispatch(turnOffLoading());
        }
    }, [listServiceParentApi, dispatch]);

    useEffect(() => {
        mutateListServiceParent();
    }, [mutateListServiceParent]);


    const model = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        {
            label: 'Service & Gallery',
            icon: 'pi pi-fw pi-briefcase',
            items :[
              {
                label: 'Parent Services',
                icon: 'pi pi-fw pi-user',
                items : [...listServiceParent]?.map((index, number) => {
                    if(number == 0) {
                        return {
                            label : `${index?.name}`,
                            icon : 'pi pi-fw pi-plus',
                            to: `/admin/parent-service/${index?.id}`,
                        }
                    }
                    else {
                        return {
                            label : `${index?.name}`,
                            icon : 'pi pi-fw pi-id-card',
                            to: `/admin/parent-service/${index?.id}`,
                        }
                    }

                })
            },
            {
                label: 'Parent Gallery',
                icon: 'pi pi-fw pi-user',
                items : [...listGalleryParent]?.map((index, number) => {
                    if(number == 0) {
                        return {
                            label : `${index?.theme}`,
                            icon : 'pi pi-fw pi-plus',
                            to: `/admin/parent-gallery/${index?.id}`,
                        }
                    }
                    else {
                        return {
                            label : `${index?.theme}`,
                            icon : 'pi pi-fw pi-id-card',
                            to: `/admin/parent-gallery/${index?.id}`,
                        }
                    }

                })
            }
            ]
        },
        {
            label: 'General',
            items: [
                { label: 'Gift Card', icon: 'pi pi-fw pi-id-card', to: '/admin/gift-card' },
                { label: 'Booking', icon: 'pi pi-fw pi-id-card', to: '/admin/booking' },
                { label: 'Employees', icon: 'pi pi-fw pi-exclamation-circle', to: '/admin/employees' },
                { label: 'Contact', icon: 'pi pi-fw pi-check-square', to: '/admin/contact' },
                { label: 'About Us', icon: 'pi pi-fw pi-bookmark', to: '/admin/about-us' },
            ]
        },

        // {
        //     label: 'UI Components',
        //     items: [
        //         { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
        //         { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
        //         { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/uikit/floatlabel' },
        //         { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', to: '/uikit/invalidstate' },
        //         { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
        //         { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
        //         { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
        //         { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
        //         { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
        //         { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
        //         { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
        //         { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu', preventExact: true },
        //         { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
        //         { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
        //         { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
        //         { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
        //     ]
        // },
        // {
        //     label: 'Prime Blocks',
        //     items: [
        //         { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: 'NEW' },
        //         { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: 'https://blocks.primereact.org', target: '_blank' }
        //     ]
        // },
        // {
        //     label: 'Utilities',
        //     items: [
        //         { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', to: '/utilities/icons' },
        //         { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: 'https://www.primefaces.org/primeflex/', target: '_blank' }
        //     ]
        // },
        // {
        //     label: 'Pages',
        //     icon: 'pi pi-fw pi-briefcase',
        //     to: '/pages',
        //     items: [
        //         {
        //             label: 'Landing',
        //             icon: 'pi pi-fw pi-globe',
        //             to: '/landing'
        //         },
        //         {
        //             label: 'Auth',
        //             icon: 'pi pi-fw pi-user',
        //             items: [
        //                 {
        //                     label: 'Login',
        //                     icon: 'pi pi-fw pi-sign-in',
        //                     to: '/auth/login'
        //                 },
        //                 {
        //                     label: 'Error',
        //                     icon: 'pi pi-fw pi-times-circle',
        //                     to: '/auth/error'
        //                 },
        //                 {
        //                     label: 'Access Denied',
        //                     icon: 'pi pi-fw pi-lock',
        //                     to: '/auth/access'
        //                 }
        //             ]
        //         },
        //         {
        //             label: 'Crud',
        //             icon: 'pi pi-fw pi-pencil',
        //             to: '/pages/crud'
        //         },
        //         {
        //             label: 'Timeline',
        //             icon: 'pi pi-fw pi-calendar',
        //             to: '/pages/timeline'
        //         },
        //         {
        //             label: 'Not Found',
        //             icon: 'pi pi-fw pi-exclamation-circle',
        //             to: '/pages/notfound'
        //         },
        //         {
        //             label: 'Empty',
        //             icon: 'pi pi-fw pi-circle-off',
        //             to: '/pages/empty'
        //         }
        //     ]
        // },
        // {
        //     label: 'Hierarchy',
        //     items: [
        //         {
        //             label: 'Submenu 1',
        //             icon: 'pi pi-fw pi-bookmark',
        //             items: [
        //                 {
        //                     label: 'Submenu 1.1',
        //                     icon: 'pi pi-fw pi-bookmark',
        //                     items: [
        //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
        //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
        //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
        //                     ]
        //                 },
        //                 {
        //                     label: 'Submenu 1.2',
        //                     icon: 'pi pi-fw pi-bookmark',
        //                     items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
        //                 }
        //             ]
        //         },
        //         {
        //             label: 'Submenu 2',
        //             icon: 'pi pi-fw pi-bookmark',
        //             items: [
        //                 {
        //                     label: 'Submenu 2.1',
        //                     icon: 'pi pi-fw pi-bookmark',
        //                     items: [
        //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
        //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
        //                     ]
        //                 },
        //                 {
        //                     label: 'Submenu 2.2',
        //                     icon: 'pi pi-fw pi-bookmark',
        //                     items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
        //                 }
        //             ]
        //         }
        //     ]
        // },
        // {
        //     label: 'Get Started',
        //     items: [
        //         {
        //             label: 'Documentation',
        //             icon: 'pi pi-fw pi-question',
        //             to: '/documentation'
        //         },
        //         {
        //             label: 'View Source',
        //             icon: 'pi pi-fw pi-search',
        //             url: 'https://github.com/primefaces/sakai-react',
        //             target: '_blank'
        //         }
        //     ]
        // }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

                {/*<Link href="https://blocks.primereact.org" target="_blank" style={{ cursor: 'pointer' }}>*/}
                {/*    <img alt="Prime Blocks" className="w-full mt-3" src={`/layout/images/banner-primeblocks${layoutConfig.colorScheme === 'light' ? '' : '-dark'}.png`} />*/}
                {/*</Link>*/}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
