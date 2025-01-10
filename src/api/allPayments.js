import axiosServices from 'utils/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const FetchFeeEnquiry = async () => {
  try {
    let api = `/payment/my-enquiry`;

    const data = await axiosServices.get(api);

    return data.data;
  } catch (e) {
    console.error('Error fetching Fee enquiry:', e);
    toast.error(e.response?.data?.message || 'Failed to fetch payment enquiry');
    throw e;
  }
};

export const FetchPaymentDetails = async (id, page = 1, take = 25, searchQuery = '', sortOrder = 'asc') => {
  try {
    // Construct the API endpoint with query parameters
    const api = `/payment/${id}?page=${page}&take=${take}&searchQuery=${encodeURIComponent(searchQuery)}&sortOrder=${sortOrder}`;
    
    // Call the API using axios
    const response = await axiosServices.get(api);
    
    // Return the data from the API response
    return response.data;
  } catch (error) {
    console.error('Error fetching payment details:', error);
    toast.error(error.response?.data?.message || 'Failed to fetch payment details');
    throw error; // Rethrow the error for further handling if needed
  }
};
