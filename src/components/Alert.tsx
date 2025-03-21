import React from 'react';
import {
  Alert as ChakraAlert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AlertProps,
} from '@chakra-ui/react';

interface CustomAlertProps extends AlertProps {
  title: string;
  message: string;
}

export const CustomAlert: React.FC<CustomAlertProps> = ({
  status = 'info',
  title,
  message,
  ...props
}) => {
  return (
    <ChakraAlert
      status={status}
      variant="solid"
      bg="#171B24"
      borderWidth="1px"
      borderColor="#10131A"
      color={status === 'error' ? 'error.500' : 'brand.500'}
      {...props}
    >
      <AlertIcon />
      <AlertTitle mr={2}>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </ChakraAlert>
  );
};

export default CustomAlert; 