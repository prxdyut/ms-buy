'use client';
import { Box } from '@chakra-ui/react';
import { SectionHeading } from '@src/components/SectionHeading';
import { IProduct } from '@src/model';
import React from 'react';
import { ProductsSlider } from './ProductsSlider';

export const FeaturedProducts = ({ title, products }) => {
  return (
    <div className='lg:w-[-webkit-fill-available] bg-black lg:-mx-16 px-4 py-8 lg:px-16 lg:py-8 pb-20 left-0'>
      <div className=' container mx-auto'>
        
      <SectionHeading title={title} />
      <ProductsSlider products={products} />
      </div>
    </div>
  );
};
