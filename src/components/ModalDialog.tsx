import { DialogActions, DialogContent, Divider, ModalClose } from '@mui/joy';
import Modal from '@mui/joy/Modal';
import ModalDialog, { ModalDialogProps } from '@mui/joy/ModalDialog';
import * as React from 'react';
import { Transition } from 'react-transition-group';

interface ModalDialogCustomProps extends ModalDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    children?: React.ReactNode;
    head?: string | React.ReactNode;
    actions?: React.ReactNode;
}

export default function ModalDialogCustom(props: ModalDialogCustomProps) {
    const {
        open
        , setOpen
        , children
        , actions
        , head
        , sx
        , ...rest
    } = props;

    return (
        <Transition in={open} timeout={400}>
            {(state: string) => (
                <Modal
                    keepMounted
                    open={!['exited', 'exiting'].includes(state)}
                    onClose={() => setOpen(false)}
                    slotProps={{
                        backdrop: {
                            sx: {
                                opacity: 0,
                                backdropFilter: 'none',
                                transition: `opacity 400ms, backdrop-filter 400ms`,
                                ...{
                                    entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                                    entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                                }[state],
                            },
                        },
                    }}
                    sx={{
                        visibility: state === 'exited' ? 'hidden' : 'visible',
                    }}
                >
                    <ModalDialog
                        sx={{
                            opacity: 0,
                            transition: `opacity 300ms`,
                            ...{
                                entering: { opacity: 1 },
                                entered: { opacity: 1 },
                            }[state],
                            ...sx,
                        }}
                        {...rest}
                    >
                        <ModalClose />
                        {head}
                        <Divider />
                        <DialogContent>
                            {children}
                        </DialogContent>
                        {actions && <DialogActions>
                            {actions}
                        </DialogActions>}
                    </ModalDialog>
                </Modal>
            )}
        </Transition>
    );
}
