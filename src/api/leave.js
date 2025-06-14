import { toast } from 'react-toastify';
import axiosServices from 'utils/axios';

export const leaveRequest = async (payload) => {
  try {
    const api = `attendance/leave/request`;
    const response = await axiosServices.post(api, payload);
    toast.success('leave reqested sucessfully');
    return response.data.data;
  } catch (e) {
    console.error('Error while requesting leave :', e);
    toast.error(e.response?.data?.message || 'Failed to request leave');
    throw e;
  }
};
export const UpdateLeaveRequest = async (payload, id) => {
  try {
    const api = `/attendance/leave/${id}/update`;
    const response = await axiosServices.put(api, payload);
    toast.success('leave reqested updated successfully');
    return response.data.data;
  } catch (e) {
    console.error('Error while updating leave reqest:', e);
    toast.error(e.response?.data?.message || 'Failed to update leave reqest');
    throw e;
  }
};
export const getAllLeaveRequests = async () => {
  try {
    const api = `/attendance/leave/request`;
    const response = await axiosServices.get(api);
    return response.data.data;
  } catch (e) {
    console.error('Error while requesting leave:', e);
    toast.error(e.response?.data?.message || 'Failed to fetch leave request');
    throw e;
  }
};
export const getLeaveHistory = async () => {
  try {
    const api = `/attendance/leave/history`;
    const response = await axiosServices.get(api);
    return response.data.data;
  } catch (e) {
    console.error('Error while requesting leave:', e);
    toast.error(e.response?.data?.message || 'Failed to fetch leave request');
    throw e;
  }
};
