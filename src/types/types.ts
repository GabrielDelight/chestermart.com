import React from "react";

export interface WrapperTypes {
  children: JSX.Element[] | JSX.Element;
}
export interface ProfileWrapperTypes {
  children: JSX.Element[] | JSX.Element;
}
export interface AdminWrapperTypes {
  children: JSX.Element[] | JSX.Element;
}

export interface CardPaymentTypes {
  onClodeHandler: () => void;
  onSubmitHandler: () => void;
}
export interface ProductAttributesTypes {
  onClodeHandler: () => void;
  onSubmitHandler: (values: any) => void;
  title: string;
  isLoading: boolean;
}
export interface ProductListTypes {
  name: string;
  price: number;
  image: string;
  _id: string;
  item: any;
}
export interface CartListTypes {
  item: any;
  isCart?: boolean
  hasRatings?: boolean
}
export interface SearchModalTypes {
  onCloseHandler: any;
  item: any[]
  isLoading: boolean
}
export interface FilterModalTypes {
  toggleHandler: () => void;
}
export interface MatchingProductTypes {
  category: string
  brand: string
}
export interface CreateRatingsTypes {
  productId: string
  onCloseHandler: () => void
}

