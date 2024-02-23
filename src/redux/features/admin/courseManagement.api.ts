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
      }),
    }),
})

export const {useAddRegisterSemesterMutation, useGetAllRegisteredSemestersQuery} = courseManagementApi;