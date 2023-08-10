import {useEffect, useState} from "react";
import {getSubServicePagination} from "@/api-client/service/Services.api";
import useSWR from "swr";
import {useDispatch} from "react-redux";
import {turnOffLoading, turnOnLoading} from "@/components/loading/index.actions";
import {mainName} from "@/constants/label";

const CardServiceComponent = (props : any) => {
    const {parentService, subService} = props
    return (
        <div className="col-lg-12" key={parentService?.id}>
            <div className="service-list" id="nails-enhancement">
                <div className="row justify-content-center gx-3 gx-md-4 gx-lg-5">
                    <div className="col-9 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                        <div className="service-list-thumb-wrap">
                            <div className="service-list-thumb">
                                <img
                                    src={parentService?.image}
                                    alt={`${mainName}-${parentService?.name}`} loading="lazy"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 col-lg-6">
                        <h2 className="service-list-name">{parentService?.name}</h2>
                        {parentService?.description == null || parentService?.description == '' || parentService?.description == 'null' ?
                            <></>
                            :
                            <h2 className="service-list-description">{parentService?.description}</h2>
                        }
                        <ul className="service-item-list">
                            {
                                [...subService]?.map(index =>
                                    <li className="service-item" key={index?.id}>
                                        <div className="box-wrap">
                                            <div className="box-left">
                                                <div className="service-item-name">{index?.name}</div>
                                                    {index?.description == null || index?.description == '' ?
                                                        <></>
                                                        :
                                                        <div className="service-item-desc">
                                                            {index?.description}
                                                        </div>
                                                    }
                                            </div>
                                            <div className="box-right">
                                                <div className="service-item-price">
                                                    ${index?.price}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardServiceComponent