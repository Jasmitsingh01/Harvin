import { create } from 'zustand';

interface UploadResponse {
  data: {
    name: string;
  };
}

interface UploadState {
  responses: UploadResponse[];
  commaSeparatedNames: string;
}

export const useReviewFileStore = create<UploadState>(() => ({
  responses: [],
  commaSeparatedNames: '',
}));

export const INTIAL_STATE = {
  postLoading: true,
  postError: null,
};

export const useReviewStore = create(() => ({
  ...INTIAL_STATE,
}));

export const usePostReviewData = () => {
  return useReviewStore((s) => ({
    loading: s.postLoading,
    error: s.postError,
  }));
};

export const useReviewFileActions = useReviewFileStore;
