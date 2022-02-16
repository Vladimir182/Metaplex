import React, { useState, useCallback, useEffect } from "react";

import { ModalTemplate } from "components/modals/template";
import { TransactionFailure } from "components/modals/TransactionFailure";

import { useLocalState } from "../../state";

export const ErrorModal: React.FC = () => {
  const { error } = useLocalState();

  const [open, setOpen] = useState(!!error);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    setOpen(!!error);
  }, [error]);

  return (
    <ModalTemplate isOpen={open} onClose={handleClose} bodyProps={{ p: 0 }}>
      <TransactionFailure bodyText={error?.message} onDismiss={handleClose} />
    </ModalTemplate>
  );
};
