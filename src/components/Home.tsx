import React, { Dispatch, useEffect } from 'react';
import { deleteProduct, IProduct } from '../slices';
import { RootState } from '../store';
import { fetchProducts } from '../slices';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hook';

const Home = () => {
  const { products, status } = useAppSelector(
    (state: RootState) => state.products
  );

  const dispatch: Dispatch<any> = useAppDispatch();

  // chỉ dùng để lấy product lúc load trang
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id)).then(() => {
        window.location.reload();
      });
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-screen overflow-hidden">
      <div className="grid grid-cols-4 gap-5 w-3/4 mx-auto my-10">
        <div className="border-2 shadow-lg text-center relative hover:brightness-50">
          <Link
            className="text-medium absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            to={'/add'}
          >
            Create New Product
            <span className="text-4xl block">+</span>
          </Link>
        </div>
        {products.map((product: IProduct) => {
          return (
            <div
              key={product.id}
              className="border-2 px-3 py-2 grid grid-cols-2 gap-2 shadow-lg"
            >
              <div className="">
                <p className="text-lg font-semibold">{product.name}</p>
                <p>${product.price}</p>
              </div>
              <div>
                <Link
                  className="mb-1 bg-lime-400 text-black py-2 w-full block text-center hover:brightness-50 transition-colors"
                  to={'/edit/' + product.id}
                >
                  Edit
                </Link>
                <button
                  className="bg-red-400 text-black py-2 w-full hover:brightness-50 transition-colors"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
