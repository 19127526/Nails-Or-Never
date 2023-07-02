import {useRouter} from "next/router";
import React, {useRef} from "react";

const pathNameNonAuthen = ["/admin/login"]

const Authenticate = (props) => {
  const router = useRouter();
  if( pathNameNonAuthen.includes(router.pathname) == false && localStorage.getItem('token') == undefined) {
    router.push("/admin/login")
  }
    return (
      <>
        {props.children}
      </>
    )

}


export default Authenticate