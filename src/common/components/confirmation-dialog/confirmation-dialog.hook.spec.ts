import { renderHook, act } from '@testing-library/react';
import { useConfirmationDialog } from "./confirmation-dialog.hook";
import { Lookup } from 'common/models';

describe('useConfirmationDialog', () => {
  it('should not show dialog when isOpen is false and it should show a dialog when isOpen is true and hide the modal when this is closed', () => {
    const { result } = renderHook(() => useConfirmationDialog());
    const item: Lookup = {
      id: '1',
      name: 'uno',
    }
    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.onOpenDialog(item);
    });
    
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.onClose();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('should delete a selected item when dialog is open an onAccept is clicked', () => {
    const itemWithValues:Lookup = {
      id: '1',
      name: 'name 1',
    };
    const itemEmpty:Lookup = {
      id: '',
      name: ''
    }

    const { result } = renderHook(() => useConfirmationDialog());

    expect(result.current.itemToDelete).toEqual(itemEmpty)

    act(() => {
      result.current.onOpenDialog(itemWithValues)
    })
    expect(result.current.itemToDelete).toEqual(itemWithValues);

    act(() => {
      result.current.onAccept();
    });
    expect(result.current.itemToDelete).toEqual(itemEmpty)
  });
});