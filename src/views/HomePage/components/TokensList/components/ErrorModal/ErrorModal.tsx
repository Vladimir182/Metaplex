import React, { useCallback, useEffect, useState } from "react";

import { ModalTemplate } from "components/Modals/template";
import { TransactionFailure } from "components/Modals/TransactionFailure";

import { useLocalState } from "../../state";

export const ErrorModal: React.FC = () => {
  const { error, resetError } = useLocalState();

  const [open, setOpen] = useState(!!error);

  const handleClose = useCallback(() => {
    resetError();
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
