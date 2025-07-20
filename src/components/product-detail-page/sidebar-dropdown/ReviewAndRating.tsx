import React, { useMemo, useState } from 'react';
import { useProductDetailData } from '../../../stores/product-detail/product-store';
import { convertUtcToIst, isUserLoggedIn } from '../../../utilities/helper';
import Rating from '../../../shared/rating/Rating';
import Button from '../../../shared/common/Button';
import { useTranslation } from 'react-i18next';
import ReactStars from 'react-rating-stars-component';
import { useForm } from 'react-hook-form';
import { userReviewValidationSchemas } from '../../../validations/review';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../../../shared/fields/Input';
import {
  postReview,
  uploadReviewMedia,
} from '../../../stores/reviews/review-action';
import { loginModalOpen } from '../../../stores/user/user-action';
import { sideBarTabAction } from '../../../stores/product-detail/product-action';
import ProgressiveImage from '../../../shared/progressive-image';

const ReviewAndRating = () => {
  const { t } = useTranslation();
  const { productRating, productReview, product, sidebarTab } =
    useProductDetailData();
  const {
    register: reviewRegister,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(userReviewValidationSchemas),
    shouldUnregister: false,
  });
  const handleRatingChange = (value: number) => {
    setValue('rating', Number(value));
  };

  console.log(productReview, 'productReview');

  interface UploadResponse {
    data: {
      name: string;
    };
  }

  interface UploadState {
    responses: UploadResponse[];
    commaSeparatedNames: string;
  }

  const [uploadResponses, setUploadResponses] = useState<UploadState>({
    responses: [],
    commaSeparatedNames: '',
  });

  const [state, setClear] = useState('');

  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  const [loading, setLoading] = useState(false);
  // const submitData = (data: any) => {
  //   postReview({ rating: 1, product_id: product.id,photos:uploadResponses, ...data });
  // };

  const handleCalbback = () => {
    setClear('');
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    setValue('rating', 0);
    setLoading(false);
  };

  const submitData = (data: any) => {
    const { comment, rating } = data;
    const photos = uploadResponses.responses.map(
      (response) => response.data.name
    );

    const product_id = product.id;

    const newPayload = {
      product_id,
      comment,
      rating,
      photos,
    };

    setLoading(true);

    postReview(newPayload, handleCalbback);
  };

  const ratingElement = useMemo(() => {
    if (loading) {
      return null;
    }

    return (
      <ReactStars
        count={5}
        onChange={handleRatingChange}
        size={24}
        isHalf={false}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        filledIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
      />
    );
  }, [loading]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploadingMedia(true);
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }

    try {
      const { responses, commaSeparatedNames } = await uploadReviewMedia(files);
      setUploadResponses({ responses, commaSeparatedNames });
    } catch (error) {
      setIsUploadingMedia(false);
    } finally {
      setIsUploadingMedia(false);
    }
  };

  return (
    <div
      className={`offcanvas offcanvas-end ${
        sidebarTab === 'reviews-ratings' ? 'show' : ''
      }`}
      id="reviews-ratings"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5
          className="offcanvas-title text-18 weight-600"
          id="offcanvasRightLabel"
        >
          {t('reviewsRatings')}
        </h5>
        <Button
          onClick={() => sideBarTabAction('')}
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body side-review-rating">
        <div className="side-rating d-flex align-items-center">
          <h3>{productRating}</h3>
          <div className="side-star-rating d-flex align-items-center">
            {ratingElement}
          </div>
          <span className="text-16 weight-500 ms-3">
            ({t('averageRating')})
          </span>
        </div>
        {isUserLoggedIn() ? (
          <form onSubmit={handleSubmit(submitData)}>
            <input
              id="fileInput"
              className="form-control mb-3 mt-3"
              type="file"
              onChange={handleFileChange}
              multiple
            />

            <Input
              key={'comment'}
              type={'textarea'}
              name={'comment'}
              rows={4}
              cols={5}
              register={reviewRegister}
              control={control}
              errors={errors}
              className="form-control"
              placeholder={'Comment here...'}
              setValue={setValue}
              trigger={trigger}
              value={state}
              onChange={(name, value) => {
                setClear(value);
                // handlePincodeChange();
              }}
            />
            {errors && (
              <p className="text-danger mt-2">
                {t((errors?.comment as any)?.message)}
              </p>
            )}
            <button
              type="submit"
              className="btn side-review-btn"
              disabled={isUploadingMedia}
            >
              {isUploadingMedia ? 'Uploading...' : t('writeReview')}
            </button>
          </form>
        ) : (
          <button
            type="button"
            className="btn side-review-btn"
            onClick={() => loginModalOpen(true)}
          >
            {t('writeReview')}
          </button>
        )}
        {productReview?.map((elem: any, index: number) => {
          return (
            <div className="customer-review " key={index}>
              <div className="customer-rating">
                <Rating rating={elem?.rating} />
              </div>
              {elem?.photos?.length > 0 && (
                <ProgressiveImage
                  src={elem?.photos[0]?.original}
                  alt=""
                  className="w-10"
                  layout="intrisinic"
                  width={100}
                  height={100}
                />
              )}
              <div className="customer-review-text">
                <p>{elem?.comment}</p>
              </div>
              <div className="customer-review-detail d-flex align-items-center">
                <span>{convertUtcToIst(elem?.created_at, 'MM/DD/YYYY')}</span>
                <span>{elem?.customer_name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewAndRating;
