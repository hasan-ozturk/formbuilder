import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { FormElementsList } from '../FormElements/FormElementsList';
import { FormCanvas } from './FormCanvas';
import { PropertiesPanel } from './PropertiesPanel';
import { FormHeader } from './FormHeader';
import { FormPreview } from './FormPreview';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f5f7fa',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export const FormBuilder: React.FC = () => {
  const [isPreview, setIsPreview] = useState(false);

  const togglePreview = () => {
    setIsPreview((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
          bgcolor: 'background.default',
        }}
      >
        <FormHeader onPreviewToggle={togglePreview} isPreview={isPreview} />
        
        {isPreview ? (
          <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
            <FormPreview />
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '280px 1fr 300px' },
              gap: 2,
              p: 2,
              flex: 1,
              overflow: 'hidden',
            }}
          >
            <Box sx={{ overflow: 'auto', display: { xs: 'none', md: 'block' } }}>
              <FormElementsList />
            </Box>
            
            <Box sx={{ overflow: 'auto' }}>
              <FormCanvas />
            </Box>
            
            <Box sx={{ overflow: 'auto', display: { xs: 'none', md: 'block' } }}>
              <PropertiesPanel />
            </Box>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};