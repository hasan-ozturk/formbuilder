import React from 'react';
import { 
  TextField, 
  Checkbox, 
  FormControlLabel, 
  Radio, 
  RadioGroup,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormGroup,
  Typography,
  Divider,
  Box,
  FormHelperText
} from '@mui/material';
import { FormElement } from '../../types/form-builder';

export const renderFormElement = (element: FormElement, isPreview: boolean = false) => {
  const commonProps = {
    required: element.required,
    fullWidth: true,
    margin: 'normal' as const,
    disabled: !isPreview,
  };

  switch (element.type) {
    case 'text':
    case 'email':
    case 'password':
    case 'number':
      return (
        <TextField
          {...commonProps}
          label={element.label}
          type={element.type}
          placeholder={element.placeholder}
          defaultValue={element.defaultValue}
          InputLabelProps={{ shrink: true }}
        />
      );

    case 'textarea':
      return (
        <TextField
          {...commonProps}
          label={element.label}
          multiline
          rows={4}
          placeholder={element.placeholder}
          defaultValue={element.defaultValue}
          InputLabelProps={{ shrink: true }}
        />
      );

    case 'checkbox':
      return (
        <FormControl {...commonProps} component="fieldset">
          <Typography variant="subtitle1" gutterBottom>
            {element.label} {element.required && <span style={{ color: 'red' }}>*</span>}
          </Typography>
          <FormGroup>
            {element.options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={element.defaultValue.includes(option.value)}
                    name={option.value}
                    disabled={!isPreview}
                  />
                }
                label={option.label}
              />
            ))}
          </FormGroup>
        </FormControl>
      );

    case 'radio':
      return (
        <FormControl {...commonProps}>
          <Typography variant="subtitle1" gutterBottom>
            {element.label} {element.required && <span style={{ color: 'red' }}>*</span>}
          </Typography>
          <RadioGroup
            defaultValue={element.defaultValue}
            name={element.id}
          >
            {element.options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio disabled={!isPreview} />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      );

    case 'select':
      return (
        <FormControl {...commonProps}>
          <InputLabel id={`select-label-${element.id}`}>
            {element.label}
          </InputLabel>
          <Select
            labelId={`select-label-${element.id}`}
            value={element.defaultValue}
            label={element.label}
            multiple={element.multiple}
            disabled={!isPreview}
          >
            {element.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );

    case 'date':
    case 'time':
      return (
        <TextField
          {...commonProps}
          label={element.label}
          type={element.type}
          defaultValue={element.defaultValue}
          InputLabelProps={{ shrink: true }}
        />
      );

    case 'file':
      return (
        <FormControl {...commonProps}>
          <Typography variant="subtitle1" gutterBottom>
            {element.label} {element.required && <span style={{ color: 'red' }}>*</span>}
          </Typography>
          <TextField
            type="file"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              multiple: element.multiple,
              accept: element.accept,
              disabled: !isPreview,
            }}
          />
          <FormHelperText>Upload files</FormHelperText>
        </FormControl>
      );

    case 'heading':
      return <Typography variant="h5" gutterBottom>{element.content}</Typography>;

    case 'paragraph':
      return <Typography variant="body1" paragraph>{element.content}</Typography>;

    case 'divider':
      return <Divider sx={{ my: 2 }} />;

    case 'spacer':
      return <Box sx={{ height: 32 }} />;

    default:
      return <Typography>Unknown element type</Typography>;
  }
};