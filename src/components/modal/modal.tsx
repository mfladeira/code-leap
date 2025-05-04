import * as DialogPrimitives from '@radix-ui/react-dialog';
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ReactNode } from 'react';
import styles from './modal.module.css';

export type ModalProps = Readonly<{
  children?: ReactNode;
  trigger?: ReactNode;
  open?: boolean;
}>

export const Modal = (props: ModalProps) => {
  return (
    <DialogPrimitives.Root modal open={props.open}>
      <DialogPrimitives.Portal>
        <DialogPrimitives.Overlay className={styles.DialogOverlay} />
        <DialogPrimitives.Content className={styles.DialogContent}>
          <VisuallyHidden>
            <DialogPrimitives.Title className={styles.DialogTitle}></DialogPrimitives.Title>
            <DialogPrimitives.Description></DialogPrimitives.Description>
          </VisuallyHidden>
          {
            props.children
          }
        </DialogPrimitives.Content>
      </DialogPrimitives.Portal>
    </DialogPrimitives.Root>
  )
}