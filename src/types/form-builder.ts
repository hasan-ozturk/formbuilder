export type FormElementType = 
  | 'text'
  | 'textarea'
  | 'number'
  | 'email'
  | 'password'
  | 'checkbox'
  | 'radio'
  | 'select'
  | 'date'
  | 'time'
  | 'file'
  | 'heading'
  | 'paragraph'
  | 'divider'
  | 'spacer';

export interface FormElementBase {
  id: string;
  type: FormElementType;
  label: string;
  required: boolean;
  columnSpan: 1 | 2 | 3 | 4;
}

export interface TextFieldElement extends FormElementBase {
  type: 'text' | 'textarea' | 'email' | 'password' | 'number';
  placeholder: string;
  defaultValue: string;
  minLength?: number;
  maxLength?: number;
}

export interface CheckboxElement extends FormElementBase {
  type: 'checkbox';
  options: { label: string; value: string }[];
  defaultValue: string[];
}

export interface RadioElement extends FormElementBase {
  type: 'radio';
  options: { label: string; value: string }[];
  defaultValue: string;
}

export interface SelectElement extends FormElementBase {
  type: 'select';
  options: { label: string; value: string }[];
  defaultValue: string;
  multiple: boolean;
}

export interface DateTimeElement extends FormElementBase {
  type: 'date' | 'time';
  defaultValue: string;
}

export interface FileElement extends FormElementBase {
  type: 'file';
  accept: string;
  multiple: boolean;
}

export interface StaticElement extends FormElementBase {
  type: 'heading' | 'paragraph' | 'divider' | 'spacer';
  content: string;
}

export type FormElement = 
  | TextFieldElement
  | CheckboxElement
  | RadioElement
  | SelectElement
  | DateTimeElement
  | FileElement
  | StaticElement;

export interface FormLayout {
  columns: 1 | 2 | 3 | 4;
}

export interface FormSettings {
  title: string;
  description: string;
  submitButtonText: string;
  successMessage: string;
  layout: FormLayout;
}

export interface FormData {
  id: string;
  settings: FormSettings;
  elements: FormElement[];
}