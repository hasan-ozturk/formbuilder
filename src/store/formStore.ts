import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { FormData, FormElement, FormSettings } from '../types/form-builder';

interface FormState {
  form: FormData;
  selectedElementId: string | null;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
  setSelectedElementId: (id: string | null) => void;
  addElement: (element: Omit<FormElement, 'id'>) => void;
  updateElement: (id: string, updates: Partial<FormElement>) => void;
  removeElement: (id: string) => void;
  moveElement: (fromIndex: number, toIndex: number) => void;
  updateSettings: (settings: Partial<FormSettings>) => void;
  resetForm: () => void;
  saveForm: () => void;
  loadForm: (id: string) => void;
}

const defaultSettings: FormSettings = {
  title: 'Untitled Form',
  description: 'Form Description',
  submitButtonText: 'Submit',
  successMessage: 'Thank you for submitting the form!',
  layout: {
    columns: 1,
  },
};

const createDefaultForm = (): FormData => ({
  id: nanoid(),
  settings: defaultSettings,
  elements: [],
});

export const useFormStore = create<FormState>((set, get) => ({
  form: createDefaultForm(),
  selectedElementId: null,
  isDragging: false,

  setIsDragging: (isDragging) => set({ isDragging }),
  
  setSelectedElementId: (id) => set({ selectedElementId: id }),
  
  addElement: (element) => set((state) => ({
    form: {
      ...state.form,
      elements: [...state.form.elements, { ...element, id: nanoid() }],
    },
  })),
  
  updateElement: (id, updates) => set((state) => ({
    form: {
      ...state.form,
      elements: state.form.elements.map((element) => 
        element.id === id ? { ...element, ...updates } : element
      ),
    },
  })),
  
  removeElement: (id) => set((state) => ({
    form: {
      ...state.form,
      elements: state.form.elements.filter((element) => element.id !== id),
    },
    selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
  })),
  
  moveElement: (fromIndex, toIndex) => set((state) => {
    const elements = [...state.form.elements];
    const [removed] = elements.splice(fromIndex, 1);
    elements.splice(toIndex, 0, removed);
    
    return {
      form: {
        ...state.form,
        elements,
      },
    };
  }),
  
  updateSettings: (settings) => set((state) => ({
    form: {
      ...state.form,
      settings: {
        ...state.form.settings,
        ...settings,
      },
    },
  })),
  
  resetForm: () => set({ form: createDefaultForm(), selectedElementId: null }),
  
  saveForm: () => {
    const { form } = get();
    try {
      localStorage.setItem(`form_${form.id}`, JSON.stringify(form));
      // Here you could also implement saving to a backend
    } catch (error) {
      console.error('Failed to save form:', error);
    }
  },
  
  loadForm: (id) => {
    try {
      const savedForm = localStorage.getItem(`form_${id}`);
      if (savedForm) {
        set({ form: JSON.parse(savedForm), selectedElementId: null });
      }
    } catch (error) {
      console.error('Failed to load form:', error);
    }
  },
}));