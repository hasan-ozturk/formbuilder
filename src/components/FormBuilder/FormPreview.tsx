import React from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Button,
  Grid,
  Alert,
  Snackbar,
} from '@mui/material';
import { useFormStore } from '../../store/formStore';
import { renderFormElement } from '../FormElements/FormElementRenderer';

export const FormPreview: React.FC = () => {
  const { form } = useFormStore();
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleCloseSnackbar = () => {
    setSubmitted(false);
  };

  const getGridTemplateColumns = () => {
    switch (form.settings.layout.columns) {
      case 1: return '1fr';
      case 2: return 'repeat(2, 1fr)';
      case 3: return 'repeat(3, 1fr)';
      case 4: return 'repeat(4, 1fr)';
      default: return '1fr';
    }
  };

  return (
    <Paper
      elevation={1}
      sx={{
        height: '100%',
        overflow: 'auto',
        borderRadius: 1,
        p: { xs: 2, md: 4 },
        maxWidth: 1000,
        mx: 'auto',
      }}
    >
      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight="medium">
            {form.settings.title || 'Untitled Form'}
          </Typography>
          {form.settings.description && (
            <Typography variant="body1" color="text.secondary" paragraph>
              {form.settings.description}
            </Typography>
          )}
        </Box>
        
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: getGridTemplateColumns(),
            gap: 3,
            mb: 4,
          }}
        >
          {form.elements.map((element, index) => (
            <Box 
              key={element.id}
              sx={{ 
                gridColumn: `span ${element.columnSpan}`,
              }}
            >
              {renderFormElement(element, true)}
            </Box>
          ))}
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={submitting}
            sx={{ 
              minWidth: 120,
              borderRadius: 2,
              boxShadow: 2,
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 3,
              },
            }}
          >
            {submitting ? 'Submitting...' : form.settings.submitButtonText || 'Submit'}
          </Button>
        </Box>
      </Box>
      
      <Snackbar
        open={submitted}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {form.settings.successMessage || 'Form submitted successfully!'}
        </Alert>
      </Snackbar>
    </Paper>
  );
};