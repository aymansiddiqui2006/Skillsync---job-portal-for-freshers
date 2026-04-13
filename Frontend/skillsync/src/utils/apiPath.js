export const baseURL="http://localhost:8000";

export const APIpaths={
    AUTH:{
        SIGNIN:"/api/v1/user/register",
        LOGIN:"/api/v1/user/login",
        LOGOUT:"/api/v1/user/logout",
        DELETE_ACCOUNT:"/api/v1/user/delete-account",
        GET_USER:"/api/v1/user/profile"
    },
    CHANGE:{
       CHANGE_PASSWORD:"/api/v1/user/profile/update/password",
       CHANGE_DATA:"/api/v1/user/profile/update/data",
       CHANGE_AVATAR:"/api/v1/user/profile/update/avatar",
       UPLOAD_RESUME:"/api/v1/user/profile/update/resume",
    },
    JOB:{
      POST_JOB:"/api/v1/job/post",
      UPDATE_JOB:(jobId)=>`/api/v1/job/${jobId}`,
      DELETE_JOB:(jobId)=>`/api/v1/job/${jobId}`,
      GET_ALL_JOB:"/api/v1/job",
      GET_SINGLE_JOB:(jobId)=>`/api/v1/job/${jobId}`,
      GET_JOB_BY_RECRUITER:(recruiterId)=>`/api/v1/job/recruiter/${recruiterId}`

    }
}

