import axiosServices from 'utils/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//get all fee Structure


export const FetchFeeEnquiry = async () => {
    try {
      // Construct the API URL with the studentId parameter
      let api = `/payment/my-enquiry`;
  
      const data = await axiosServices.get(api);
  
      return data.data;
    } catch (e) {
      console.error('Error fetching Fee enquiry:', e);
      toast.error(e.response?.data?.message || 'Failed to fetch payment enquiry');
      throw e;
    }
  };

  export const FetchPaymentDetails = async () => {
    try {
      // Construct the API URL with the studentId parameter
      let api = `/student/my-detail`;
  
      const data = await axiosServices.get(api);
  
      return data.data;
    } catch (e) {
      console.error('Error fetching Details:', e);
      toast.error(e.response?.data?.message || 'Failed to fetch details');
      throw e;
    }
  };
  