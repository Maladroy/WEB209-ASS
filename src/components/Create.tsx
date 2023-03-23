import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IProduct, addProduct } from '../slices';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from 'redux';
type Props = {};

const Create = (props: Props) => {
  const dispatch: Dispatch<any> = useAppDispatch();

  const onHandleSubmit: SubmitHandler<IProduct> = data => {
    //@ts-ignore
    dispatch(addProduct(data)).then(() => {
      // use built-in redirect
      window.location.replace('/');
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>();

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        className="border-2 px-3 py-2 grid grid-cols-2 gap-2 shadow-lg"
        onSubmit={handleSubmit(onHandleSubmit)}
      >
        <div className="">
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
