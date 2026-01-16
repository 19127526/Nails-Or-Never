export interface actionWithPayload{
    type : string,
    payload : any,
    [key: string]: any;
}

export interface actionWithoutPayload{
    type : string,
    [key: string]: any;
}