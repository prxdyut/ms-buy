'use client';
import { Box } from '@chakra-ui/react';
import { SectionHeading } from '@src/components/SectionHeading';
import { IProduct } from '@src/model';
import React from 'react';
import { ProductsSlider } from './ProductsSlider';

export const FeaturedProducts = ({ title, products }) => {
  return (
    <div className='w-100 bg-primary p-8 pb-20'>
      <SectionHeading title={title} />
      <ProductsSlider products={products} />
    </div>
  );
};
