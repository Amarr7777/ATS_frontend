import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  List,
  ListItem,
  Progress,
} from '@chakra-ui/react';
import { CheckIcon, WarningIcon } from '@chakra-ui/icons';
import styles from '../styles/ATSScoreAnalysis.module.css';

interface ATSScoreAnalysisProps {
  score: number;
  keywordRate: number;
  formatRate: number;
  contentRate: number;
  strengths: string[];
  improvements: string[];
}

const ATSScoreAnalysis: React.FC<ATSScoreAnalysisProps> = ({
  score,
  keywordRate,
  formatRate,
  contentRate,
  strengths,
  improvements,
}) => {
  return (
    <Box className={styles.container}>
      <Heading size="lg" className={styles.heading}>
        ATS Score Analysis
      </Heading>
      
      <VStack spacing={6} align="stretch">
        <Text className={styles.scoreText}>
          Your resume achieved an ATS compatibility score of{' '}
          <Text as="span" className={styles.scoreValue}>
            {score}%
          </Text>
        </Text>

        <Box>
          <Text className={styles.sectionTitle}>
            Key Factors Contributing to Your Score:
          </Text>
          <List spacing={4}>
            <ListItem className={styles.factorItem}>
              <Text className={styles.factorLabel}>
                Keyword Match Rate: {keywordRate}%
              </Text>
              <Progress 
                value={keywordRate} 
                colorScheme="teal" 
                className={styles.progressBar} 
              />
              <Text className={styles.factorDescription}>
                Alignment with industry-standard terms and requirements
              </Text>
            </ListItem>
            <ListItem className={styles.factorItem}>
              <Text className={styles.factorLabel}>
                Format Compliance: {formatRate}%
              </Text>
              <Progress 
                value={formatRate} 
                colorScheme="teal" 
                className={styles.progressBar} 
              />
              <Text className={styles.factorDescription}>
                Resume structure and formatting standards
              </Text>
            </ListItem>
            <ListItem className={styles.factorItem}>
              <Text className={styles.factorLabel}>
                Content Quality: {contentRate}%
              </Text>
              <Progress 
                value={contentRate} 
                colorScheme="teal" 
                className={styles.progressBar} 
              />
              <Text className={styles.factorDescription}>
                Clarity, relevance, and completeness of information
              </Text>
            </ListItem>
          </List>
        </Box>

        <Box>
          <Text className={styles.sectionTitle}>
            Areas of Excellence:
          </Text>
          <List spacing={2}>
            {strengths.map((strength, index) => (
              <ListItem key={index} className={styles.listItem}>
                <CheckIcon className={styles.successIcon} />
                {strength}
              </ListItem>
            ))}
          </List>
        </Box>

        <Box>
          <Text className={styles.sectionTitle}>
            Improvement Opportunities:
          </Text>
          <List spacing={2}>
            {improvements.map((improvement, index) => (
              <ListItem key={index} className={styles.listItem}>
                <WarningIcon className={styles.warningIcon} />
                {improvement}
              </ListItem>
            ))}
          </List>
        </Box>
      </VStack>
    </Box>
  );
};

export default ATSScoreAnalysis; 