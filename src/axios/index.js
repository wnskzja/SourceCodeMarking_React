import React from 'react';
import { axiosInstance } from './axiosIns';

const withAxios = (WrappedComponent) => (props) => (
  <WrappedComponent {...props} axios={axiosInstance} />
);

export { withAxios };
