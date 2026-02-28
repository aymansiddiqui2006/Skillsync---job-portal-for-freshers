class ApiRes{
    constructor(statusCode,data,message){
        super(message)
        this.statusCode=statusCode;
        this.data=data;
        this.message=message;
        this.success=statusCode<400;
    }
}

export default ApiRes;