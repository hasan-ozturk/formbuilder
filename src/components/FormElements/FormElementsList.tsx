import React from 'react';
import { 
  Paper, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Typography,
  Divider,
  Box,
  Collapse,
  ListSubheader
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useFormStore } from '../../store/formStore';
import { ElementIcon } from './ElementIcons';
import { FormElementType } from '../../types/form-builder';

const formElements = [
  { 
    category: 'Basic Inputs',
    elements: [
      { type: 'text', label: 'Text Input' },
      { type: 'textarea', label: 'Multi-line Text' },
      { type: 'number', label: 'Number' },
      { type: 'email', label: 'Email' },
      { type: 'password', label: 'Password' },
    ]
  },
  {
    category: 'Selection Inputs',
    elements: [
      { type: 'checkbox', label: 'Checkboxes' },
      { type: 'radio', label: 'Radio Buttons' },
      { type: 'select', label: 'Dropdown' },
    ]
  },
  {
    category: 'Advanced Inputs',
    elements: [
      { type: 'date', label: 'Date Picker' },
      { type: 'time', label: 'Time Picker' },
      { type: 'file', label: 'File Upload' },
    ]
  },
  {
    category: 'Layout Elements',
    elements: [
      { type: 'heading', label: 'Heading' },
      { type: 'paragraph', label: 'Paragraph' },
      { type: 'divider', label: 'Divider' },
      { type: 'spacer', label: 'Spacer' },
    ]
  }
];

export const FormElementsList: React.FC = () => {
  const { addElement } = useFormStore();
  const [openCategories, setOpenCategories] = React.useState<string[]>(
    formElements.map(category => category.category)
  );

  const handleCategoryToggle = (category: string) => {
    setOpenCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleAddElement = (type: FormElementType, label: string) => {
    const defaultElement = {
      type,
      label,
      required: false,
      columnSpan: 1 as const,
    };

    // Add additional properties based on element type
    switch (type) {
      case 'text':
      case 'textarea':
      case 'email':
      case 'password':
      case 'number':
        addElement({
          ...defaultElement,
          placeholder: `Enter ${label.toLowerCase()}`,
          defaultValue: '',
        });
        break;
      
      case 'checkbox':
        addElement({
          ...defaultElement,
          options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
          ],
          defaultValue: [],
        });
        break;
      
      case 'radio':
        addElement({
          ...defaultElement,
          options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
          ],
          defaultValue: '',
        });
        break;
      
      case 'select':
        addElement({
          ...defaultElement,
          options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
          ],
          defaultValue: '',
          multiple: false,
        });
        break;
      
      case 'date':
      case 'time':
        addElement({
          ...defaultElement,
          defaultValue: '',
        });
        break;
      
      case 'file':
        addElement({
          ...defaultElement,
          accept: '*/*',
          multiple: false,
        });
        break;
      
      case 'heading':
      case 'paragraph':
      case 'divider':
      case 'spacer':
        addElement({
          ...defaultElement,
          content: type === 'heading' ? 'Section Heading' : 
                  type === 'paragraph' ? 'This is a paragraph of text.' : '',
        });
        break;
      
      default:
        addElement(defaultElement);
    }
  };

  return (
    <Paper 
      elevation={1} 
      sx={{ 
        height: '100%', 
        overflow: 'auto',
        borderRadius: 1,
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
        <Typography variant="h6" fontWeight="medium">Form Elements</Typography>
        <Typography variant="body2" color="text.secondary">
          Drag elements onto the canvas
        </Typography>
      </Box>
      
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="form-elements-list"
        dense
      >
        {formElements.map((category) => (
          <React.Fragment key={category.category}>
            <ListItemButton onClick={() => handleCategoryToggle(category.category)}>
              <ListItemText primary={category.category} />
              {openCategories.includes(category.category) ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            
            <Collapse in={openCategories.includes(category.category)} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {category.elements.map((element) => (
                  <ListItemButton
                    key={element.type}
                    sx={{ pl: 4 }}
                    onClick={() => handleAddElement(element.type as FormElementType, element.label)}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <ElementIcon type={element.type as FormElementType} fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={element.label} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};