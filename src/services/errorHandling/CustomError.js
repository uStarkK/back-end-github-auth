export default class CustomError {
    static createError({name, cause, message: msg, code}){
        const error = new Error(msg || name)
        error.name = name;
        error.code = code;
        error.cause = cause
        error.message = msg
        throw error
    }
}