"use client";

import css from "./Modal.module.css";

type Props = {
  children: React.ReactNode;
  onClose?: () => void;
};

const Modal = ({ children, onClose }: Props) => {
  const close = () => {
    if (onClose) onClose();
  };

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        {children}
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
