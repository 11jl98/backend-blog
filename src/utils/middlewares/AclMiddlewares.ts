import { Request, Response, NextFunction } from "express";


export function AclMiddlewares(request:Request, response:Response, next:NextFunction){
    const { rule_user } = request

    if(rule_user !== "admin") return response.sendStatus(401)

    next()
}