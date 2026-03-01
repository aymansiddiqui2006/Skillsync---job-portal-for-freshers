// const AsyncHandler = (func) => {
//   async (req, res, next) => {
//     try {
//       return await func(req, res, next);
//     } catch (error) {
//       next(error);
//     }
//   };
// };


const AsyncHandler=(func)=>{
    return(req,res,next)=>{
        Promise.resolve(func(req,res,next))
        .catch((err)=>next(err))
    }
}

export default AsyncHandler;
