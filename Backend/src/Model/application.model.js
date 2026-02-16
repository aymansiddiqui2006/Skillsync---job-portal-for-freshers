import mongoose, { mongo } from "mongoose";

const applicationSchema=mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
    },
    fresher:[{
        type:String
    }],
    jonStatus:{
        type:String,
        enum:["accepted","rejected","applied"],
    },
    feedback:{
        type:String,
    },
    matchedSkill:[{
        type:String,
    }],
    unmatchedSkill:[{
        type:String,
    }],
    appliedAt:{

    }
})

export const Application=mongoose.model("application",applicationSchema)