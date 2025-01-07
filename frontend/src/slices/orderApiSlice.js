import { apiSlice } from "./apiSlice.js";
import { ORDER_URL } from "../constants.js";


export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDER_URL,
                method: 'POST',
                body: {...order}
            }),
            invalidatesTags: ['Order']
        }),
        getOrders: builder.query({
            query: () => ({
                url: ORDER_URL,
                credentials: 'include'
            }),
            providesTags: ['Order'],
            keepUnusedDataFor: 5
        }), 
        getOrderDetails: builder.query({
            query: (id) => ({
                url: `${ORDER_URL}/${id}`,
                credentials: 'include'
            }),
            providesTags: ['Order'],
            keepUnusedDataFor: 5
        })
    })
});

export const {
    useCreateOrderMutation,
    useGetOrdersQuery,
    useGetOrderDetailsQuery
} = ordersApiSlice