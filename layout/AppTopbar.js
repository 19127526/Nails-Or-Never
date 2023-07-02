import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { LayoutContext } from './context/layoutcontext';
import {postSignOut} from "../api-client/authen/Authentication.api";
import {Tooltip } from 'antd';
import {Toast} from "primereact/toast";

import {useDispatch} from "react-redux";
import {messageAuthen} from "../pages/admin/login/index.actions";
const AppTopbar = forwardRef((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const router = useRouter();
    const dispatch = useDispatch()
    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    const handleClickLogOut = async () => {
      await postSignOut()
        .then(res => {
          localStorage.removeItem('token');

          router.push("/admin/login")
        })
        .catch(err => {

        })
    }
    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
                <img src={`https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png`} width="47.22px" height={'35px'} widt={'true'} alt="logo" />
                <span>Nail Or Never Admin</span>
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                {/*<button type="button" className="p-link layout-topbar-button">*/}
                {/*    <i className="pi pi-calendar"></i>*/}
                {/*    <span>Calendar</span>*/}
                {/*</button>*/}
                {/*<button type="button" className="p-link layout-topbar-button">*/}
                {/*    <i className="pi pi-user"></i>*/}
                {/*    <span>Profile</span>*/}
                {/*</button>*/}
                {/*<Link href="/documentation">*/}
                {/*    <button type="button" className="p-link layout-topbar-button">*/}
                {/*        <i className="pi pi-cog"></i>*/}
                {/*        <span>Settings</span>*/}
                {/*    </button>*/}
                {/*</Link>*/}
              <Tooltip title="Log out" color={"#2db7f5"} key={"#2db7f5"}>
                <button type="button" className="p-link layout-topbar-button" onClick={() => handleClickLogOut()}>
                  <i className="pi pi-user"></i>
                  <span>Log out</span>
                </button>
              </Tooltip>
            </div>
        </div>
    );
});

export default AppTopbar;
