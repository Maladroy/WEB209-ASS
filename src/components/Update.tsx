import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getProduct, IProduct, updateProduct } from '../slices';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { useNavigate, useParams } from 'react-router-dom';
import { Dispatch } from 'redux';
import { RootState } from '../store';
type Props = {};

const Update = (props: Props) => {
  const dispatch: Dispatch<any> = useAppDispatch();
  const { id } = useParams();
  const { single } = useAppSelector((state: RootState) => state.products);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IProduct>();

  // lấy dữ liệu từ api, update form fields
  useEffect(() => {
    if (!id) return;
    dispatch(getProduct(id as unknown as number));
  }, [dispatch]);

  useEffect(() => {
    setValue('name', single.name);
    setValue('price', single.price);
  }, [single]);

  const onHandleUpdate: SubmitHandler<IProduct> = data => {
    if (confirm('Are you sure?')) {
      dispatch(updateProduct(data)).then(() => {
        window.location.replace('/');
      });
    }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        className="border-2 px-3 py-2 grid grid-cols-2 gap-2 shadow-lg"
        onSubmit={handleSubmit(onHandleUpdate)}
      >
        <div className="">
          <input type="hidden" {...register('id')} defaultValue={id} />
          <input
            className="border-2"
            type="text"
            {...register('name', { required: true })}
          />
          {errors.name && <span>This field is required</span>}
          <input
            className="border-2 block"
            type="text"
            {...register('price', { required: true })}
          />
          {errors.price && <span>This field is required</span>}
        </div>
        <div className="">
          <button type="submit" className="bg-lime-400 text-black p-3 w-full">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
