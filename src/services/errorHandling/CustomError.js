export default class CustomError {
    static createError({name, cause, msg, code}){
        const error = new Error(msg, {cause})
        error.name = name;
        error.code = code;
        throw error
    }
}