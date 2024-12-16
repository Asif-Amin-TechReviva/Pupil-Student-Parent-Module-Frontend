import axiosServices from 'utils/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const FetchAllAssignments = async () => {
    try {
      // Construct the API URL with the studentId parameter
      let api = `/assignments`;
  
      const data = await axiosServices.get(api);
  
      return data.data;
    } catch (e) {
      console.error('Error fetching Assignments:', e);
      toast.error(e.response?.data?.message || 'Failed to fetch assignments');
      throw e;
    }
  };