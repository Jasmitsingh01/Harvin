import { toast } from 'react-toastify';
import api from '../../services/api';
import ROUTES from '../../utilities/api-routes';
import { useReviewStore } from './review-store';

const { setState } = useReviewStore;

export const postReview = async (data: any, callback: any) => {
  try {
    setState({
      postLoading: true,
      postError: null,
    });
    const { data: result } = await api.post(ROUTES.postReview(), data);
    toast.success(
      'Successfully Done! Review will be display after admin approved'
    );
    callback();
    if (result.success) {
      setState({
        postLoading: false,
      });

      // setProductQuantity(value);
    }
  } catch (e) {
    setState({
      postLoading: false,
      postError: e.message,
    });
  }
};

export const postEnquire = async (data: any, callback: any) => {
  try {
    setState({
      postLoading: true,
      postError: null,
    });
    const { data: result } = await api.post(ROUTES.helpDesk(), data);
    toast.success('Successfully Sent!');
    callback();
    if (result.success) {
      setState({
        postLoading: false,
      });

      // setProductQuantity(value);
    }
  } catch (e) {
    setState({
      postLoading: false,
      postError: e.message,
    });
  }
};

export const uploadReviewMedia = async (files: FileList) => {
  try {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const isValidFileType = Array.from(files).every((file) =>
      allowedTypes.includes(file.type)
    );

    if (!isValidFileType) {
      toast.error('Invalid file type. Only PNG, JPEG, and JPG are allowed.');
      throw new Error('Invalid file type');
    }

    const responses = [];
    const names = [];

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append(`file`, files[i]);

      const response = await api.postFormData(ROUTES.reviewMedia(), formData);
      responses.push(response);
      names.push(response.data.name);
    }

    const commaSeparatedNames = names.join(', ');
    return { responses, commaSeparatedNames };
  } catch (error) {
    return error;
  }
};
