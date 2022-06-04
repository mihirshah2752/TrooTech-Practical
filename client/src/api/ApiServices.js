import axiosClient from "../config/axios.config";

export function getRequest(URL) {
  return axiosClient.get(`/${URL}`).then((response) => response);
}

export function postRequest(URL, payload) {
  return axiosClient.post(`/${URL}`, payload).then((response) => response);
}

export function patchRequest(URL, id, payload) {
  return axiosClient.put(`/${URL}/${id}`, payload).then((response) => response);
}

export function deleteRequest(URL, payload) {
  return axiosClient.delete(`/${URL}/${payload}`).then((response) => response);
}
