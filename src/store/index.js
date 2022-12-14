import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./product.slice";

export * from "./product.slice";

export const store = configureStore({
    reducer: {
        product: productsReducer
    }
})