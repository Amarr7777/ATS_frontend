import React from 'react';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  HStack,
  VStack,
  Flex,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiAward, FiMessageSquare } from 'react-icons/fi';
import FadeInSection from '../components/FadeInSection';

const Feature = ({ title, text, icon }: { title: string; text: string; icon: React.ReactElement }) => {
  return (
    <FadeInSection>
      <Stack
        align={'center'}
        justify={'center'}
        textAlign={'center'}
        spacing={{ base: 5, md: 8 }}
        p={8}
        rounded="xl"
        bg={useColorModeValue('white', 'gray.800')}
        shadow="lg"
        _hover={{
          transform: 'translateY(-5px)',
          shadow: 'xl',
        }}
        transition="all 0.3s"
      >
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          bg={'brand.400'}
          mb={1}
        >
          {icon}
        </Flex>
        <Text fontWeight={600} fontSize="lg">
          {title}
        </Text>
        <Text color={'gray.600'}>{text}</Text>
      </Stack>
    </FadeInSection>
  );
};

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Container maxW={'7xl'}>
      <Stack
        as={Box}
        textAlign={'center'}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
      >
        <FadeInSection>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Optimize your resume with{' '}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{ display: 'inline-block' }}
            >
              <Text as={'span'} color={'brand.400'}>
                AI-powered analysis
              </Text>
            </motion.span>
          </Heading>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <Text color={'gray.500'} maxW={'3xl'} margin={'auto'}>
            Upload your resume and get instant feedback on ATS compatibility,
            keyword optimization, and personalized suggestions. Practice with our
            AI interviewer to prepare for your next job interview.
          </Text>
        </FadeInSection>

        <FadeInSection delay={0.4}>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
          >
            <Button
              colorScheme={'brand'}
              bg={'brand.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'brand.500',
                transform: 'translateY(-2px)',
                shadow: 'lg',
              }}
              onClick={() => navigate('/upload')}
            >
              Get Started
            </Button>
            <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
              Learn more
            </Button>
          </Stack>
        </FadeInSection>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 10, md: 4, lg: 10 }}
          mt={10}
        >
          <Feature
            icon={<Icon as={FiUpload} w={10} h={10} />}
            title={'Easy Upload'}
            text={'Simply upload your resume in PDF format and get instant analysis'}
          />
          <Feature
            icon={<Icon as={FiAward} w={10} h={10} />}
            title={'ATS Optimization'}
            text={'Get detailed feedback on how to improve your resume for ATS systems'}
          />
          <Feature
            icon={<Icon as={FiMessageSquare} w={10} h={10} />}
            title={'AI Interview'}
            text={'Practice interviews with our AI-powered interview simulator'}
          />
        </Stack>
      </Stack>
    </Container>
  );
} 