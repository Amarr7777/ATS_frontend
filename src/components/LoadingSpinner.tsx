import React from 'react';
import { Box, Spinner, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text = 'Loading...' }) => {
  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="rgba(0, 0, 0, 0.4)"
      zIndex="overlay"
    >
      <VStack
        bg="white"
        p={8}
        rounded="xl"
        shadow="xl"
        spacing={4}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.500"
          size="xl"
        />
        <Text color="gray.600" fontSize="lg">
          {text}
        </Text>
      </VStack>
    </Box>
  );
};

export default LoadingSpinner; 