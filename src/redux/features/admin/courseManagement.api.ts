import {  TQueryParam, TResponseRedux, tSemester } from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      getAllRegisteredSemesters: builder.query({
        query: (args) => {
          console.log(args);
          const params = new URLSearchParams();
  
          if (args) {
            args.forEach((item: TQueryParam) => {
              params.append(item.name, item.value as string);
            });
          }
  
          return {
            url: '/semester-registrations',
            method: 'GET',
            params: params,
          };
        },
        providesTags:['semester'],
        transformResponse: (response: TResponseRedux<tSemester[]>) => {
          return {
            data: response.data,
            meta: response.meta,
          };
        },
      }),
      addRegisterSemester: builder.mutation({
        query: (data) => ({
          url: '/semester-registrations/create-semester-registration',
          method: 'POST',
          body: data,
        }),
        invalidatesTags:['semester']
      }),
      updateRegisterSemester: builder.mutation({
        query: (args) => ({
          url: `/semester-registrations/${args.id}`,
          method: 'PATCH',
          body: args.data,
        }),
        invalidatesTags:['semester']
      }),
    }),
})

export const {useUpdateRegisterSemesterMutation,useAddRegisterSemesterMutation, useGetAllRegisteredSemestersQuery} = courseManagementApi;