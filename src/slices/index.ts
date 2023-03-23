import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface IProduct {
    id: number;
    name: string;
    price: number;
}

export interface IProductsState {
    products: IProduct[];
    status: "idle" | "loading" | "failed";
    single: IProduct;
}

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const response = await axios.get("https://63e26e4c109336b6cb079437.mockapi.io/api/v1/marquee");
        const data = response.data;
        if (!data) return;

        return data;
    }
)

export const getProduct = createAsyncThunk(
    "products/getProduct",
    async (id: number) => {
        const response = await axios.get(`https://63e26e4c109336b6cb079437.mockapi.io/api/v1/marquee/` + id);
        const data = response.data;
        return data;
    }
)

export const addProduct = createAsyncThunk(
    "products/addProduct",
    async (product: IProduct) => {
        const response = await axios.post("https://63e26e4c109336b6cb079437.mockapi.io/api/v1/marquee", product);
        const data = response.data;
        if (!data) return;
    }
)

export const deleteProduct = createAsyncThunk(
    "products/delete",
    async (id: number) => {
        const response = await axios.delete(`https://63e26e4c109336b6cb079437.mockapi.io/api/v1/marquee/${id}`);
        const data = response.data;
        return data;
    }
)

export const updateProduct = createAsyncThunk(
    "products/update",
    async (product: IProduct) => {
        const response = await axios.put(`https://63e26e4c109336b6cb079437.mockapi.io/api/v1/marquee/${product.id}`, product);
        const data = response.data;
        return data;

    }
)

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        status: "idle",
        single: {} as IProduct
    } as IProductsState,
    reducers: {
        setProducts(state, action) {
            state.products = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = "idle";
            state.products = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.status = "failed";
        });

        // getProduct
        builder.addCase(getProduct.pending, (state) => {
            state.status = "loading";
        })
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.status = "idle";
            state.single = action.payload;
        })
        builder.addCase(getProduct.rejected, (state) => {
            state.status = "failed";
        })


        // addProduct
        builder.addCase(addProduct.pending, (state) => {
            state.status = "loading";
        })
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.status = "idle";
            state.products.push(action.payload as unknown as IProduct);
        })
        builder.addCase(addProduct.rejected, (state) => {
            state.status = "failed";
        })

        // deleteProduct
        builder.addCase(deleteProduct.pending, (state) => {
            state.status = "loading";
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.status = "idle";
            state.products = state.products.filter((product) => product.id !== (action.payload as unknown as number));
        })
        builder.addCase(deleteProduct.rejected, (state) => {
            state.status = "failed";
        })

        // updateProduct
        builder.addCase(updateProduct.pending, (state) => {
            state.status = "loading";
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.status = "idle";
            state.products = state.products.map((product) => product.id === action.payload.id ? action.payload : product);
        })
        builder.addCase(updateProduct.rejected, (state) => {
            state.status = "failed";
        })
    }

});

export default productSlice.reducer