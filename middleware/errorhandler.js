exports.errorhandler=(err,req,res,next)=>{
    let status=500;

    if(err.message==="task not found ")status=404;
    if(err.message.includes("required"))status=400;

    res.status(status).json({
        message:err.message
    });
};