import React from 'react';
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  ModalProps,
} from '@chakra-ui/react';

interface CustomModalProps extends Omit<ModalProps, 'children'> {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  title,
  isOpen,
  onClose,
  onConfirm,
  children,
  ...props
}) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} {...props}>
      <ModalOverlay bg="rgba(16, 19, 26, 0.8)" />
      <ModalContent bg="#171B24" borderColor="dark.300">
        <ModalHeader color="brand.700">{title}</ModalHeader>
        <ModalCloseButton color="brand.500" />
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter borderTopWidth="1px" borderColor="dark.300">
          <Button variant="ghost" mr={3} onClick={onClose} color="brand.500">
            Close
          </Button>
          <Button colorScheme="brand" onClick={onConfirm}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default CustomModal; 