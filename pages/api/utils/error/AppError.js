export default class AppError extends Error{
    constructor(message,code){
        super(message,code)
        this.name="AppError"
        this.code=code
    }
}