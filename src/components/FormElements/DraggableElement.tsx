import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Paper, Box, Typography, IconButton } from '@mui/material';
import { Delete, DragIndicator, Settings } from '@mui/icons-material';
import { FormElement } from '../../types/form-builder';
import { useFormStore } from '../../store/formStore';
import { ElementIcon } from './ElementIcons';
import { renderFormElement } from './FormElementRenderer';

interface DraggableElementProps {
  element: FormElement;
  index: number;
  isPreview?: boolean;
}

export const DraggableElement: React.FC<DraggableElementProps> = ({ 
  element, 
  index,
  isPreview = false
}) => {
  const { 
    selectedElementId, 
    setSelectedElementId, 
    removeElement,
    isDragging
  } = useFormStore();
  
  const isSelected = selectedElementId === element.id;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isThisElementDragging,
  } = useSortable({
    id: element.id,
    disabled: isPreview,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isThisElementDragging ? 0.5 : 1,
    zIndex: isThisElementDragging ? 1000 : 1,
    gridColumn: `span ${element.columnSpan}`,
  };

  const handleSelect = () => {
    if (!isPreview) {
      setSelectedElementId(isSelected ? null : element.id);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeElement(element.id);
  };

  return (
    <Box 
      ref={setNodeRef} 
      style={style}
      sx={{ 
        gridColumn: `span ${element.columnSpan}`,
        position: 'relative',
      }}
    >
      <Paper
        elevation={isSelected && !isPreview ? 4 : 1}
        sx={{
          p: 2,
          borderRadius: 1,
          cursor: isPreview ? 'default' : 'pointer',
          border: isSelected && !isPreview ? '2px solid #2196f3' : 'none',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: isPreview ? 1 : 3,
          },
          position: 'relative',
        }}
        onClick={handleSelect}
      >
        {!isPreview && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              p: 0.5,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: isSelected ? 'rgba(33, 150, 243, 0.1)' : 'transparent',
              borderTopLeftRadius: 1,
              borderTopRightRadius: 1,
              transition: 'all 0.2s ease',
              visibility: isSelected || isDragging ? 'visible' : 'hidden',
            }}
          >
            <IconButton
              size="small"
              {...attributes}
              {...listeners}
              sx={{ cursor: 'grab', '&:active': { cursor: 'grabbing' } }}
            >
              <DragIndicator fontSize="small" />
            </IconButton>
            
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ElementIcon type={element.type} fontSize="small" />
                {element.type}
              </Typography>
              
              <IconButton size="small" onClick={handleDelete}>
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        )}
        
        <Box sx={{ pt: isPreview ? 0 : 2 }}>
          {renderFormElement(element, isPreview)}
        </Box>
      </Paper>
    </Box>
  );
};