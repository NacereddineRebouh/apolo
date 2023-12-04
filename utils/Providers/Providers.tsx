'use client';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '@/utils/Providers/store/store';

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
