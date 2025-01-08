import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";
import { logOut } from "./authSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login:builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            }),
        }),
        register:builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            })
        }),
        logOut:builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            }),
           
        }),
        profile: builder.mutation({
            query:(data) =>({
            url: `${USERS_URL}/profile`,
            method:'PUT',
            body:data,
        })
    })

    })

})

export const { useLoginMutation, useLogOutMutation, useRegisterMutation, useProfileMutation } = usersApiSlice