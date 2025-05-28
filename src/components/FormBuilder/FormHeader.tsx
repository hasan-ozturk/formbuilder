import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Save,
  ViewCompact,
  Preview,
  Undo,
  Redo,
  MoreVert,
  PlayArrow,
} from '@mui/icons-material';
import { useFormStore } from '../../store/formStore';

export const FormHeader: React.FC<{
  onPreviewToggle: () => void;
  isPreview: boolean;
}> = ({ onPreviewToggle, isPreview }) => {
  const { form, saveForm, resetForm, updateSettings } = useFormStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [formTitle, setFormTitle] = React.useState(form.settings.title);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSave = () => {
    saveForm();
    handleMenuClose();
  };

  const handleReset = () => {
    resetForm();
    handleMenuClose();
  };

  const handleRenameClick = () => {
    setDialogOpen(true);
    handleMenuClose();
  };

  const handleRenameClose = () => {
    setDialogOpen(false);
  };

  const handleRenameConfirm = () => {
    updateSettings({ title: formTitle });
    setDialogOpen(false);
  };

  return (
    <>
      <AppBar 
        position="static" 
        color="default" 
        elevation={0}
        sx={{ 
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          bgcolor: 'background.paper',
        }}
      >
        <Toolbar variant="dense">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'medium' }}>
            {form.settings.title || 'Untitled Form'}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Save">
              <IconButton color="primary" onClick={handleSave}>
                <Save />
              </IconButton>
            </Tooltip>
            
            <Button
              variant={isPreview ? "outlined" : "contained"}
              startIcon={isPreview ? <ViewCompact /> : <Preview />}
              onClick={onPreviewToggle}
              color="primary"
              size="small"
              sx={{ mx: 1 }}
            >
              {isPreview ? 'Edit Mode' : 'Preview'}
            </Button>
            
            <Tooltip title="More options">
              <IconButton onClick={handleMenuOpen}>
                <MoreVert />
              </IconButton>
            </Tooltip>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleRenameClick}>
                Rename Form
              </MenuItem>
              <MenuItem onClick={handleReset}>
                Reset Form
              </MenuItem>
              <MenuItem disabled>
                Export as JSON
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Dialog open={dialogOpen} onClose={handleRenameClose}>
        <DialogTitle>Rename Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a new title for your form:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Form Title"
            fullWidth
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRenameClose}>Cancel</Button>
          <Button onClick={handleRenameConfirm} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};