import React, { RefObject, useRef } from 'react';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  Flex,
  VStack,
  Link,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiAward, FiMessageSquare, FiArrowUp } from 'react-icons/fi';
import { keyframes } from '@emotion/react';
import FadeInSection from '../components/FadeInSection';

// Subtle background animation for Hero Section
const pulse = keyframes`
  0% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.05); }
  100% { opacity: 0.3; transform: scale(1); }
`;

// Professional gradient wave animation
const gradientWave = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Define the wave animation for the heading
const waveAnimation = {
  y: [0, -5, 0, 5, 0], // Subtle up-down wave
  transition: {
    duration: 2, // 2 seconds per cycle
    ease: 'easeInOut',
    repeat: Infinity, // Loops forever
  },
};

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
        bg={useColorModeValue('gray.800', 'gray.900')}
        shadow="lg"
        _hover={{
          transform: 'translateY(-5px)',
          shadow: 'xl',
        }}
        transition="all 0.3s"
        h="300px"
        w="full"
        maxW="sm"
        overflow="hidden"
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
        <Text fontWeight={600} fontSize="lg" color="gray.200">
          {title}
        </Text>
        <Text color={'gray.400'} fontSize="sm" noOfLines={3} overflow="hidden" textOverflow="ellipsis">
          {text}
        </Text>
      </Stack>
    </FadeInSection>
  );
};

const ContentBox = ({ title, text }: { title: string; text: string }) => {
  return (
    <FadeInSection>
      <Stack
        spacing={6}
        p={8}
        rounded="xl"
        bg="gray.900"
        shadow="md"
        _hover={{
          transform: 'translateY(-5px)',
          shadow: 'xl',
          borderColor: 'brand.400',
          borderWidth: '1px',
        }}
        transition="all 0.3s"
        borderWidth="1px"
        borderColor="gray.700"
        w="full"
        maxW="4xl"
      >
        <Heading size="lg" color="brand.400" textAlign="left">
          {title}
        </Heading>
        <Text color="gray.300" fontSize="md" textAlign="left">
          {text}
        </Text>
      </Stack>
    </FadeInSection>
  );
};

interface HomePageProps {
  tryItNowRef: RefObject<HTMLButtonElement>;
}

const MotionHeading = motion(Heading); // Create a motion-enabled Heading component

export default function HomePage({ tryItNowRef }: HomePageProps) {
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);

  const handleLearnMoreClick = () => {
    if (featuresRef.current) {
      const navbarHeight = 100; // Adjust based on your navbar height
      const offsetTop = featuresRef.current.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      {/* Full-page background animation */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="linear-gradient(45deg, #1A202C, #2D3748, #4A5568, #1A202C)"
        backgroundSize="200% 200%"
        animation={`${gradientWave} 15s ease infinite`}
        zIndex={-2}
        opacity={0.6}
      />
      <Container maxW={'7xl'} position="relative">
        {/* Hero Section with Background Animation */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="brand.400"
          opacity={0.3}
          borderRadius="xl"
          animation={`${pulse} 6s infinite ease-in-out`}
          zIndex={-1}
          maxW="80%"
          mx="auto"
          h="50%"
        />
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <FadeInSection>
            <MotionHeading
              animate={waveAnimation} // Apply the wave animation
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
            </MotionHeading>
            <Text color="gray.400" fontSize="xl" mt={4}>
              Elevate your career with smarter tools.
            </Text>
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
                onClick={handleLearnMoreClick}
              >
                Get Started
              </Button>
            </Stack>
          </FadeInSection>

          {/* Services Section */}
          <Stack
            ref={featuresRef}
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 10, md: 4, lg: 10 }}
            mt={10}
            justify="center"
          >
            <Feature
              icon={<Icon as={FiUpload} w={10} h={10} />}
              title={'Easy Upload'}
              text={'Simply upload your resume and job description in PDF format and get instant analysis'}
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

          {/* Additional Content Sections */}
          <VStack spacing={10} mt={16} align="center">
            <ContentBox
              title="How It Works"
              text="Our platform uses advanced AI algorithms to analyze your resume against job descriptions. After uploading your documents, you’ll receive a detailed report highlighting strengths, weaknesses, and actionable suggestions to boost your chances of passing ATS filters. The AI Interview feature simulates real-world scenarios, helping you refine your responses and build confidence."
            />
            <ContentBox
              title="Why Choose Us?"
              text="Unlike traditional resume builders, we combine cutting-edge AI with practical insights tailored to today’s job market. Whether you’re a recent graduate or a seasoned professional, our tools adapt to your needs, ensuring you stand out to employers and recruiters."
            />
            <ContentBox
              title="Get Ahead of the Competition"
              text="In a crowded job market, every advantage counts. Our detailed analytics provide metrics like keyword match rate, readability scores, and more, giving you a clear edge. Plus, our AI Interview practice ensures you’re ready to impress when it matters most."
            />
          </VStack>

          {/* Call-to-Action Banner */}
          <FadeInSection delay={0.2}>
            <Box
              bg="gray.900"
              p={8}
              rounded="xl"
              shadow="md"
              textAlign="center"
              mt={16}
              borderWidth="1px"
              borderColor="gray.700"
              _hover={{
                shadow: 'xl',
                borderColor: 'brand.400',
              }}
              transition="all 0.3s"
            >
              <Heading size="lg" color="brand.400" mb={4}>
                Ready to Take the Next Step?
              </Heading>
              <Text color="gray.300" mb={6}>
                Start optimizing your resume and practicing interviews today!
              </Text>
              <Button
                ref={tryItNowRef}
                colorScheme="brand"
                bg="brand.400"
                rounded="full"
                px={8}
                size="lg"
                _hover={{ bg: 'brand.500', transform: 'scale(1.05)' }}
                transition="all 0.3s"
                onClick={() => navigate('/upload')}
              >
                Try It Now
              </Button>
            </Box>
          </FadeInSection>
        </Stack>
      </Container>

      {/* Simplified Footer */}
      <Box as="footer" bg="black" py={4} mt={20} w="full">
        <Container maxW="7xl">
          <Flex justify="space-between" align="center" direction={{ base: 'column', md: 'row' }}>
            <Text fontSize="sm" color="gray.400">
              © {new Date().getFullYear()} Resume Optimizer. All rights reserved.
            </Text>
            <Button
              variant="ghost"
              color="gray.400"
              leftIcon={<FiArrowUp />}
              onClick={handleScrollToTop}
              _hover={{ color: 'brand.400' }}
            >
              Back to Top
            </Button>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}