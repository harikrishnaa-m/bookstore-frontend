import { serverURL } from "./serverURL";
import { commonAPI } from "./commonAPI";

//register api
export const registerAPI = (reqBody) => {
  return commonAPI("POST", `${serverURL}/api/register`, reqBody, {});
};

//login api
export const loginAPI = (reqBody) => {
  return commonAPI("POST", `${serverURL}/api/login`, reqBody, {});
};

//Google login api
export const GoogleloginAPI = (reqBody) => {
  return commonAPI("POST", `${serverURL}/api/google-login`, reqBody, {});
};
export const uploadBookApi = (reqBody, reqHeader) => {
  return commonAPI("POST", `${serverURL}/api/addBook`, reqBody, reqHeader);
};
export const getHomeBookAPI = () => {
  return commonAPI("GET", `${serverURL}/api/homebooks`);
};
export const getAllBookAPI = (searchKey, reqHeader) => {
  return commonAPI(
    "GET",
    `${serverURL}/api/allbooks?search=${searchKey}`,
    null,
    reqHeader
  );
};

export const getABookAPI = (id, reqHeader) => {
  return commonAPI("GET", `${serverURL}/api/getABook/${id}`, null, reqHeader);
};

//--------------------------------ADMIN-------------------------------

export const getAdminAllBookAPI = (reqHeader) => {
  return commonAPI("GET", `${serverURL}/api/admin-allBooks`, null, reqHeader);
};

export const adminApprovedBookAPI = (reqBody, reqHeader) => {
  return commonAPI(
    "PUT",
    `${serverURL}/api/admin-approvedBook`,
    reqBody,
    reqHeader
  );
};

export const adminGetUsersAPI = (reqHeader) => {
  return commonAPI("GET", `${serverURL}/api/admin-users`, null, reqHeader);
};

export const adminAddJobAPI = (reqBody, reqHeader) => {
  return commonAPI(
    "POST",
    `${serverURL}/api/admin-addJobs`,
    reqBody,
    reqHeader
  );
};
export const adminGetJobsAPI = (reqHeader) => {
  return commonAPI("GET", `${serverURL}/api/admin-allJobs`, null, reqHeader);
};

export const adminDeleteJobAPI = (id, reqHeader) => {
  return commonAPI(
    "DELETE",
    `${serverURL}/api/admin-deleteJob/${id}`,
    null,
    reqHeader
  );
};

export const updateAdminDetailsAPI = (reqBody, reqHeader) => {
  return commonAPI("PUT", `${serverURL}/api/update-admin`, reqBody, reqHeader);
};

export const getAdminDetailsAPI = (reqHeader) => {
  return commonAPI("GET", `${serverURL}/api/admin-details`, null, reqHeader);
};

export const makePaymentAPI = (reqBody, reqHeader) => {
  return commonAPI("PUT", `${serverURL}/api/make-payment`, reqBody, reqHeader);
};
export const addApplicationAPI = (reqBody, reqHeader) => {
  return commonAPI(
    "POST",
    `${serverURL}/api/addApplication`,
    reqBody,
    reqHeader
  );
};
export const getApplicantsAPI = (reqHeader) => {
  return commonAPI("GET", `${serverURL}/api/getApplicants`, null, reqHeader);
};
