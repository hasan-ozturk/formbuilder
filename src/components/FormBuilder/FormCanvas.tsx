import React from 'react';
import { 
  DndContext, 
  DragEndEvent, 
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { 
  SortableContext, 
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { Box, Paper, Typography } from '@mui/material';
import { useFormStore } from '../../store/formStore';
import { DraggableElement } from '../FormElements/DraggableElement';
import { FormElement } from '../../types/form-builder';

export const FormCanvas: React.FC = () => {
  const { 
    form, 
    moveElement, 
    selectedElementId,
    setSelectedElementId,
    setIsDragging,
  } = useFormStore();
  
  const [activeElement, setActiveElement] = React.useState<FormElement | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeElementData = form.elements.find(element => element.id === active.id);
    
    if (activeElementData) {
      setActiveElement(activeElementData);
      setIsDragging(true);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    setActiveElement(null);
    setIsDragging(false);
    
    if (over && active.id !== over.id) {
      const oldIndex = form.elements.findIndex(element => element.id === active.id);
      const newIndex = form.elements.findIndex(element => element.id === over.id);
      
      moveElement(oldIndex, newIndex);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    // Only deselect if clicking on the canvas itself, not on a form element
    if ((e.target as HTMLElement).closest('[data-element-id]') === null) {
      setSelectedElementId(null);
    }
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
      elevation={0}
      sx={{ 
        height: '100%', 
        backgroundColor: '#f5f5f5',
        borderRadius: 1,
        p: 2,
        overflowY: 'auto',
      }}
      onClick={handleCanvasClick}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          {form.settings.title || 'Untitled Form'}
        </Typography>
        {form.settings.description && (
          <Typography variant="body1" color="text.secondary">
            {form.settings.description}
          </Typography>
        )}
      </Box>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
        <SortableContext
          items={form.elements.map(element => element.id)}
          strategy={verticalListSortingStrategy}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: getGridTemplateColumns(),
              gap: 2,
              minHeight: '200px',
            }}
          >
            {form.elements.length === 0 ? (
              <Box
                sx={{
                  gridColumn: '1 / -1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 4,
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  border: '2px dashed rgba(0, 0, 0, 0.2)',
                  borderRadius: 1,
                  minHeight: '200px',
                }}
              >
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Your form is empty
                </Typography>
                <Typography variant="body1" color="text.secondary" align="center">
                  Click on elements from the left panel to add them to your form
                </Typography>
              </Box>
            ) : (
              form.elements.map((element, index) => (
                <DraggableElement
                  key={element.id}
                  element={element}
                  index={index}
                />
              ))
            )}
          </Box>
        </SortableContext>
        
        <DragOverlay>
          {activeElement ? (
            <DraggableElement
              element={activeElement}
              index={-1}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </Paper>
  );
};