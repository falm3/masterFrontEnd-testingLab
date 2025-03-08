import React from 'react';
import { render, screen, fireEvent, } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

const mockFnOnAccept = jest.fn()
const mockFnOnClose = jest.fn()

const propsDialog =  {
  isOpen: true,
  onAccept: mockFnOnAccept,
  onClose: mockFnOnClose,
  title: 'Título del diálogo',
  labels: {
    closeButton: 'Cerrar',
    acceptButton: 'Aceptar'
  },
  children: <div>Contenido del diálogo.</div>
};

describe('test confirmation-dialog.component.tsx', () => {
  describe('isOpen es true', () => {
    it('should call onAccept when I click on the button with Aceptar label', () => {
      mockFnOnClose.mockClear();
      mockFnOnAccept.mockClear();
  
      render(<ConfirmationDialogComponent {...propsDialog} />);
      const botona = screen.getByText(propsDialog.labels.acceptButton);
  
      expect(propsDialog.onAccept).toHaveBeenCalledTimes(0);
  
      fireEvent.click(botona);
  
      expect(propsDialog.onAccept).toHaveBeenCalledTimes(1);
    });
  
    it('should call onAccept when I click on the button whith Cerrar label', () => {
      mockFnOnClose.mockClear();
      mockFnOnAccept.mockClear();
  
      render(<ConfirmationDialogComponent {...propsDialog} />);
      const botonb = screen.getByText(propsDialog.labels.closeButton);
  
      expect(propsDialog.onClose).toHaveBeenCalledTimes(0);
  
      fireEvent.click(botonb);
  
      expect(propsDialog.onClose).toHaveBeenCalledTimes(1);
    }); 
  
    it('should have the text when the dialog is opened', () => {
      render(<ConfirmationDialogComponent {...propsDialog} />);
    
      expect(screen.getByText(propsDialog.title)).toBeInTheDocument();
      expect(screen.getByText('Contenido del diálogo.')).toBeInTheDocument();
    });
  });

  describe('shold have the text when isOpen is false', () => {
    it('debe tener los siguientes textos...', () => {
      propsDialog.isOpen = false;
      render(<ConfirmationDialogComponent {...propsDialog} />);
    
      expect(screen.queryByText(propsDialog.title)).toBeNull();
      expect(screen.queryByText('Contenido del diálogo.')).not.toBeInTheDocument();
    });
  });
})