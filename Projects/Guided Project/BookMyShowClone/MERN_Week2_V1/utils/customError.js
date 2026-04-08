//Custom error class created for error handling
class CustomError extends Error{
    constructor(message,statusCode){
        super(message);//invoke the constructor of the super class
        this.statusCode = statusCode;
    }
}

module.exports = CustomError;