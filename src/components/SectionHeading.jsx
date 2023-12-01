import { Heading } from '@chakra-ui/react';
import React from 'react';

export const SectionHeading = ({ title }) => {
  return (
    <p className='text-4xl mb-4 uppercase' >
      {title}
    </p>
  );
};
