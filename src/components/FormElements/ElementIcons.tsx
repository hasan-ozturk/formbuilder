import React from 'react';
import { FormElementType } from '../../types/form-builder';
import {
  TextFields,
  CheckBox,
  RadioButtonChecked,
  ArrowDropDown,
  CalendarMonth,
  AccessTime,
  AttachFile,
  Title,
  Notes,
  HorizontalRule,
  SpaceBar,
  Article
} from '@mui/icons-material';

interface ElementIconProps {
  type: FormElementType;
  fontSize?: 'small' | 'medium' | 'large' | 'inherit';
}

export const ElementIcon: React.FC<ElementIconProps> = ({ type, fontSize = 'medium' }) => {
  switch (type) {
    case 'text':
    case 'email':
    case 'password':
    case 'number':
      return <TextFields fontSize={fontSize} />;
    case 'textarea':
      return <Article fontSize={fontSize} />;
    case 'checkbox':
      return <CheckBox fontSize={fontSize} />;
    case 'radio':
      return <RadioButtonChecked fontSize={fontSize} />;
    case 'select':
      return <ArrowDropDown fontSize={fontSize} />;
    case 'date':
      return <CalendarMonth fontSize={fontSize} />;
    case 'time':
      return <AccessTime fontSize={fontSize} />;
    case 'file':
      return <AttachFile fontSize={fontSize} />;
    case 'heading':
      return <Title fontSize={fontSize} />;
    case 'paragraph':
      return <Notes fontSize={fontSize} />;
    case 'divider':
      return <HorizontalRule fontSize={fontSize} />;
    case 'spacer':
      return <SpaceBar fontSize={fontSize} />;
    default:
      return <TextFields fontSize={fontSize} />;
  }
};