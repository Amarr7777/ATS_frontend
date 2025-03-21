import React from 'react';
import { Box, VStack, Text, List, ListItem, ListIcon } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

interface ATSAnalysisProps {
  children: React.ReactNode;
  keywords?: string[];
  suggestions?: string[];
}

const ATSAnalysis: React.FC<ATSAnalysisProps> = ({ children, keywords = [], suggestions = [] }) => {
  return (
    <VStack spacing={6} width="100%">
      <Box 
        bg="#171B24"  // dark.300
        borderColor="#10131A"  // dark.400
        borderWidth="1px"
        borderRadius="xl"
        p={6}
        width="100%"
      >
        {children}
      </Box>

      {keywords.length > 0 && (
        <Box
          bg="#171B24"  // dark.300
          borderColor="#10131A"  // dark.400
          borderWidth="1px"
          borderRadius="xl"
          p={6}
          width="100%"
        >
          <Text fontSize="lg" fontWeight="bold" mb={4} color="brand.300">
            Keywords Detected
          </Text>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {keywords.map((keyword, index) => (
              <Box
                key={index}
                bg="#10131A"  // dark.400
                color="#4FD1C5"  // brand.300
                px={3}
                py={1}
                borderRadius="full"
                fontSize="sm"
                borderWidth="1px"
                borderColor="#2C7A7B"  // brand.600
              >
                {keyword}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {suggestions.length > 0 && (
        <Box
          bg="#171B24"  // dark.300
          borderColor="#10131A"  // dark.400
          borderWidth="1px"
          borderRadius="xl"
          p={6}
          width="100%"
        >
          <Text fontSize="lg" fontWeight="bold" mb={4} color="brand.300">
            Suggestions
          </Text>
          <List spacing={3}>
            {suggestions.map((suggestion, index) => (
              <ListItem
                key={index}
                display="flex"
                alignItems="center"
                color="#F7FAFC"  // dark.50
              >
                <ListIcon
                  as={CheckCircleIcon}
                  color="#10B981"  // success.500
                  mr={2}
                />
                {suggestion}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </VStack>
  );
};

export default ATSAnalysis; 