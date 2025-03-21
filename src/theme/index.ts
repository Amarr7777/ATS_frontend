import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#E6FFFA',
      100: '#B2F5EA',
      200: '#81E6D9',
      300: '#4FD1C5',
      400: '#38B2AC',
      500: '#319795',  // Primary teal
      600: '#2C7A7B',
      700: '#285E61',
      800: '#234E52',
      900: '#1D4044',
    },
    accent: {
      50: '#FFE4E6',
      100: '#FFBDC2',
      200: '#FF939C',
      300: '#FF6B76',
      400: '#FF4252',
      500: '#FF1A2F',  // Vibrant coral
      600: '#DB1428',
      700: '#B70F21',
      800: '#930B1A',
      900: '#7A0813',
    },
    dark: {
      50: '#F7FAFC',  // Light text
      100: '#EDF2F7',  // Secondary text
      200: '#E2E8F0',  // Disabled text
      300: '#171B24',  // Surface
      400: '#10131A',  // Background
      500: '#0C0E14',  // Hover
      600: '#08090E',  // Active
      700: '#040508',
      800: '#020304',
      900: '#000000',
    },
    success: {
      500: '#10B981',
    },
    warning: {
      500: '#F59E0B',
    },
    error: {
      500: '#EF4444',
    },
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: '#10131A',  // dark.400
        color: '#F7FAFC',  // dark.50
      },
      '.chakra-modal__content': {
        backgroundColor: '#171B24 !important',  // dark.300
        borderColor: '#10131A !important',  // dark.400
      },
      '.chakra-modal__header': {
        backgroundColor: '#171B24 !important',  // dark.300
      },
      '.chakra-modal__footer': {
        backgroundColor: '#171B24 !important',  // dark.300
      },
      '.chakra-modal__body': {
        backgroundColor: '#171B24 !important',  // dark.300
      },
      '.chakra-alert': {
        backgroundColor: '#171B24 !important',  // dark.300
      },
      '.chakra-card': {
        backgroundColor: '#171B24 !important',  // dark.300
      },
      '.chakra-menu__list': {
        backgroundColor: '#171B24 !important',  // dark.300
        borderColor: '#10131A !important',  // dark.400
      },
      '.chakra-popover__content': {
        backgroundColor: '#171B24 !important',  // dark.300
        borderColor: '#10131A !important',  // dark.400
      },
      '.chakra-toast': {
        backgroundColor: '#171B24 !important',  // dark.300
      }
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'lg',
        _hover: {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(49, 151, 149, 0.4)',
        },
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.400',
          _hover: {
            bg: 'dark.300',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          backgroundColor: '#171B24',  // dark.300
          borderColor: '#10131A',  // dark.400
          color: 'dark.50',  // Ensure text is visible
          borderRadius: 'xl',
          borderWidth: '1px',
          transition: 'all 0.2s',
          _hover: {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 16px rgba(49, 151, 149, 0.2)',
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        color: 'dark.50',  // Light text for headings
        fontWeight: 'bold',
        letterSpacing: '-0.02em',
      },
    },
    Text: {
      baseStyle: {
        color: 'dark.100',  // Slightly dimmed text for better contrast
      },
      variants: {
        secondary: {
          color: 'dark.200',
        },
        highlight: {
          color: 'brand.300',
        },
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            bg: 'dark.300',
            _hover: {
              bg: 'dark.200',
            },
            _focus: {
              borderColor: 'brand.500',
              bg: 'dark.200',
            },
          },
        },
      },
      defaultProps: {
        variant: 'filled',
      },
    },
    Chart: {
      baseStyle: {
        bg: 'dark.300',
        borderRadius: 'xl',
        borderWidth: '1px',
        borderColor: 'dark.200',
        p: 6,
      },
    },
    Container: {
      baseStyle: {
        maxW: 'container.xl',
        px: 4,
        color: 'dark.50',  // Ensure text visibility
        backgroundColor: '#10131A',  // dark.400
      },
    },
    Box: {
      baseStyle: {
        color: 'dark.50',  // Default light text
        backgroundColor: 'transparent',
      },
    },
    Stat: {
      baseStyle: {
        label: {
          color: 'dark.100',  // Secondary text
        },
        number: {
          color: 'brand.300',  // Highlight numbers
        },
        helpText: {
          color: 'dark.200',  // Tertiary text
        },
      },
    },
    List: {
      baseStyle: {
        item: {
          color: 'dark.50',  // Light text for list items
        },
      },
    },
    Table: {
      baseStyle: {
        th: {
          color: 'dark.50',
        },
        td: {
          color: 'dark.100',
        },
      },
    },
    chartOptions: {
      plugins: {
        legend: {
          labels: {
            color: 'dark.50',
            font: {
              family: '"Inter", system-ui, sans-serif',
            },
          },
        },
        tooltip: {
          backgroundColor: 'dark.300',
          titleColor: 'dark.50',
          bodyColor: 'dark.100',
          borderColor: 'dark.500',
          borderWidth: 1,
        },
      },
      scales: {
        r: {
          angleLines: {
            display: true,
            color: 'dark.500',
          },
          grid: {
            display: true,
            color: 'dark.500',
            circular: true,
          },
          pointLabels: {
            display: true,
            color: 'dark.50',
            font: {
              size: 12,
              family: '"Inter", system-ui, sans-serif',
            },
          },
          ticks: {
            display: true,
            color: 'dark.100',
            backdropColor: 'transparent',
            showLabelBackdrop: false,
            font: {
              size: 10,
            },
          },
          beginAtZero: true,
        },
        y: {
          display: true,
          grid: {
            display: true,
            color: 'dark.500',
          },
          ticks: {
            color: 'dark.50',
            font: {
              family: '"Inter", system-ui, sans-serif',
            },
          },
        },
        x: {
          display: true,
          grid: {
            display: true,
            color: 'dark.500',
          },
          ticks: {
            color: 'dark.50',
            font: {
              family: '"Inter", system-ui, sans-serif',
            },
          },
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          backgroundColor: '#171B24',  // dark.300
          borderColor: '#10131A',  // dark.400
        },
        header: {
          backgroundColor: '#171B24',  // dark.300
        },
        body: {
          backgroundColor: '#171B24',  // dark.300
        },
        footer: {
          backgroundColor: '#171B24',  // dark.300
        }
      }
    },
    Popover: {
      baseStyle: {
        content: {
          backgroundColor: '#171B24',  // dark.300
          borderColor: '#10131A',  // dark.400
        }
      }
    },
    Menu: {
      baseStyle: {
        list: {
          backgroundColor: '#171B24',  // dark.300
          borderColor: '#10131A',  // dark.400
        },
        item: {
          backgroundColor: '#171B24',  // dark.300
          _hover: {
            backgroundColor: '#10131A',  // dark.400
          }
        }
      }
    },
  },
  fonts: {
    heading: '"Inter", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
  },
});

export default theme;
