import React from 'react';
import { Text } from '@chakra-ui/react';

const Logo = () => (
  <Text
    fontSize="xl"
    fontWeight="bold"
    bgGradient="linear(to-r, brand.400, brand.600)"
    bgClip="text"
  >
    Resume Analyzer
  </Text>
);

export default Logo; 