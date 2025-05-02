import * as DialogPrimitives from '@radix-ui/react-dialog';
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ReactNode } from 'react';
import styles from './modal.module.css';

export type ModalProps = Readonly<{
  children?: ReactNode;
  trigger?: ReactNode;
}>

export const Modal = (props: ModalProps) => {
  return (
    <DialogPrimitives.Root modal>
      {
        props.trigger &&
        <DialogPrimitives.Trigger asChild>
          {
            props.trigger
          }
        </DialogPrimitives.Trigger>
      }
      {/* Portal is used to ensure that the dialog content is rendered at the end of the <body> element — outside the usual React component hierarchy. */}
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