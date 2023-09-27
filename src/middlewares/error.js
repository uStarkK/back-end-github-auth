import HandledErrors from "../services/errorHandling/ErrorCode.js";


export default (err, req, res, next)=>{
    console.log(err, err.cause);
    switch(err.code){
        case HandledErrors.INVALID_TYPES_ERROR:
            res.send({status: "error", error: err.name})
            break;
        case HandledErrors.RESOURCE_NOT_FOUND_ERROR:
            res.send({status:"error", error: err.name})
            break;
        case HandledErrors.DATABASE_ERROR:
            res.send({status:"error", error: err.name})
            break;
        case HandledErrors.STOCK_RELATED_ERROR:
            res.send({status:"error", error: err.name})
            break;
        case HandledErrors.VALIDATION_ERROR:
            res.send({status: "error", error: err.name})
            break;
        default:
            res.send({status:"error", error: "Unhandled error"})
    }
}