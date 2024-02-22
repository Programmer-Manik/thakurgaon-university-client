import { BaseQueryApi } from '@reduxjs/toolkit/query';

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export const monthNames=[
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const genders = ['Male', 'Female', 'Other'];

export const bloodGroup = ['A+', 'A-', 'B+', 'B-' ,'ab+','ab-','O+','O-'];

export const monthOptions = monthNames.map((item)=>({
  value:item,
  label:item,
}))

export const genderOptions = genders.map((item)=>({
  value: item.toLowerCase(),
  label:item,
}))

export const bloodGroupOptions = bloodGroup.map((item)=>({
  value:item,
  label:item
}))