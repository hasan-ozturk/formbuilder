import React from 'react';
import { 
  Paper, 
  Typography, 
  Box,
  TextField,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  Chip,
  IconButton,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useFormStore } from '../../store/formStore';
import { FormElement } from '../../types/form-builder';

export const PropertiesPanel: React.FC = () => {
  const { form, selectedElementId, updateElement, updateSettings } = useFormStore();
  
  const selectedElement = form.elements.find(
    element => element.id === selectedElementId
  );

  const renderElementProperties = (element: FormElement) => {
    const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      updateElement(element.id, { label: e.target.value });
    };

    const handleRequiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      updateElement(element.id, { required: e.target.checked });
    };

    const handleColumnSpanChange = (e: React.ChangeEvent<{ value: unknown }>) => {
      updateElement(element.id, { columnSpan: e.target.value as 1 | 2 | 3 | 4 });
    };

    const handlePlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if ('placeholder' in element) {
        updateElement(element.id, { placeholder: e.target.value });
      }
    };

    const handleDefaultValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if ('defaultValue' in element && typeof element.defaultValue === 'string') {
        updateElement(element.id, { defaultValue: e.target.value });
      }
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if ('content' in element) {
        updateElement(element.id, { content: e.target.value });
      }
    };

    const handleAddOption = () => {
      if ('options' in element) {
        const newOption = {
          label: `Option ${element.options.length + 1}`,
          value: `option${element.options.length + 1}`,
        };
        updateElement(element.id, {
          options: [...element.options, newOption],
        });
      }
    };

    const handleRemoveOption = (index: number) => {
      if ('options' in element) {
        const newOptions = [...element.options];
        newOptions.splice(index, 1);
        updateElement(element.id, { options: newOptions });
      }
    };

    const handleOptionLabelChange = (index: number, value: string) => {
      if ('options' in element) {
        const newOptions = [...element.options];
        newOptions[index] = { ...newOptions[index], label: value };
        updateElement(element.id, { options: newOptions });
      }
    };

    const handleOptionValueChange = (index: number, value: string) => {
      if ('options' in element) {
        const newOptions = [...element.options];
        newOptions[index] = { ...newOptions[index], value };
        updateElement(element.id, { options: newOptions });
      }
    };

    const handleMultipleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if ('multiple' in element) {
        updateElement(element.id, { multiple: e.target.checked });
      }
    };

    return (
      <>
        <Typography variant="subtitle1" gutterBottom fontWeight="medium">
          Element Properties
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Label"
            value={element.label}
            onChange={handleLabelChange}
            margin="normal"
            size="small"
          />

          {('placeholder' in element) && (
            <TextField
              fullWidth
              label="Placeholder"
              value={element.placeholder}
              onChange={handlePlaceholderChange}
              margin="normal"
              size="small"
            />
          )}

          {('defaultValue' in element && typeof element.defaultValue === 'string') && (
            <TextField
              fullWidth
              label="Default Value"
              value={element.defaultValue}
              onChange={handleDefaultValueChange}
              margin="normal"
              size="small"
            />
          )}

          {('content' in element) && (
            <TextField
              fullWidth
              label="Content"
              value={element.content}
              onChange={handleContentChange}
              margin="normal"
              size="small"
              multiline={element.type === 'paragraph'}
              rows={element.type === 'paragraph' ? 3 : 1}
            />
          )}

          {('options' in element) && (
            <Box sx={{ mt: 2, mb: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Options
              </Typography>
              
              {element.options.map((option, index) => (
                <Box key={index} sx={{ display: 'flex', mb: 1, gap: 1 }}>
                  <TextField
                    size="small"
                    label="Label"
                    value={option.label}
                    onChange={(e) => handleOptionLabelChange(index, e.target.value)}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    size="small"
                    label="Value"
                    value={option.value}
                    onChange={(e) => handleOptionValueChange(index, e.target.value)}
                    sx={{ flex: 1 }}
                  />
                  <IconButton 
                    size="small" 
                    onClick={() => handleRemoveOption(index)}
                    sx={{ mt: 0.5 }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              ))}
              
              <Button
                startIcon={<Add />}
                onClick={handleAddOption}
                size="small"
                sx={{ mt: 1 }}
              >
                Add Option
              </Button>
            </Box>
          )}

          {('multiple' in element) && (
            <FormControlLabel
              control={
                <Switch
                  checked={element.multiple}
                  onChange={handleMultipleChange}
                  size="small"
                />
              }
              label="Allow multiple selections"
            />
          )}

          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={element.required}
                  onChange={handleRequiredChange}
                  size="small"
                />
              }
              label="Required"
            />
          </Box>

          <FormControl fullWidth margin="normal" size="small">
            <InputLabel id="column-span-label">Column Span</InputLabel>
            <Select
              labelId="column-span-label"
              value={element.columnSpan}
              label="Column Span"
              onChange={handleColumnSpanChange}
            >
              <MenuItem value={1}>1 Column</MenuItem>
              <MenuItem value={2}>2 Columns</MenuItem>
              <MenuItem value={3}>3 Columns</MenuItem>
              <MenuItem value={4}>4 Columns</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </>
    );
  };

  const renderFormSettings = () => {
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      updateSettings({ title: e.target.value });
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      updateSettings({ description: e.target.value });
    };

    const handleSubmitButtonTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      updateSettings({ submitButtonText: e.target.value });
    };

    const handleSuccessMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      updateSettings({ successMessage: e.target.value });
    };

    const handleColumnsChange = (e: React.ChangeEvent<{ value: unknown }>) => {
      updateSettings({ 
        layout: { 
          ...form.settings.layout, 
          columns: e.target.value as 1 | 2 | 3 | 4 
        } 
      });
    };

    return (
      <>
        <Typography variant="subtitle1" gutterBottom fontWeight="medium">
          Form Settings
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Form Title"
            value={form.settings.title}
            onChange={handleTitleChange}
            margin="normal"
            size="small"
          />

          <TextField
            fullWidth
            label="Form Description"
            value={form.settings.description}
            onChange={handleDescriptionChange}
            margin="normal"
            size="small"
            multiline
            rows={2}
          />

          <TextField
            fullWidth
            label="Submit Button Text"
            value={form.settings.submitButtonText}
            onChange={handleSubmitButtonTextChange}
            margin="normal"
            size="small"
          />

          <TextField
            fullWidth
            label="Success Message"
            value={form.settings.successMessage}
            onChange={handleSuccessMessageChange}
            margin="normal"
            size="small"
            multiline
            rows={2}
          />

          <FormControl fullWidth margin="normal" size="small">
            <InputLabel id="columns-label">Number of Columns</InputLabel>
            <Select
              labelId="columns-label"
              value={form.settings.layout.columns}
              label="Number of Columns"
              onChange={handleColumnsChange}
            >
              <MenuItem value={1}>1 Column</MenuItem>
              <MenuItem value={2}>2 Columns</MenuItem>
              <MenuItem value={3}>3 Columns</MenuItem>
              <MenuItem value={4}>4 Columns</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </>
    );
  };

  return (
    <Paper 
      elevation={1} 
      sx={{ 
        height: '100%', 
        overflow: 'auto',
        borderRadius: 1,
        p: 2,
      }}
    >
      {selectedElement ? (
        renderElementProperties(selectedElement)
      ) : (
        renderFormSettings()
      )}
    </Paper>
  );
};