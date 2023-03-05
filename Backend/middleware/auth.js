//custom middleware

import jwt from "jsonwebtoken";

export const auth = (request, response, next) =>{
    try{
        const token = request.header("x-auth-token");
        jwt.verify(token,process.env.SECRET_KEY);
            next(); //if error | next will be skiped
    }catch(err){
        response.status(401).send({
            message: err.message
        })
    }
}; 