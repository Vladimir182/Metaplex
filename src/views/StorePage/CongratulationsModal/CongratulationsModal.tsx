import {
  $showStoreCongratulations,
  $store,
  setShowStoreCongratulations,
} from "state/store";
import { useEvent, useStore } from "effector-react";

import { FC } from "react";
import { ModalCloseButton } from "@chakra-ui/modal";
import { ModalTemplate } from "components/modals/template";
import { StoreCreateCongratulations } from "components/modals/StoreCreateCongratulations";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";

interface Props {
  forceOpen?: boolean;
}

export const CongratulationsModal: FC<Props> = ({ forceOpen }) => {
  const store = useStore($store);
  const isOpen = useStore($showStoreCongratulations);
  const show = useEvent(setShowStoreCongratulations);
  const { mdUp } = useCustomBreakpoints();
  if (!store) {
    return null;
  }

  return (
    <ModalTemplate
      isOpen={forceOpen || isOpen}
      onClose={() => show(false)}
      header={<ModalCloseButton />}
      isCentered={true}
      size={mdUp ? "lg" : "full"}
      bodyProps={{ p: 0 }}
    >
      <StoreCreateCongratulations
        storeId={store.storeId ?? ""}
        storeName={store.name ?? ""}
        h={mdUp ? "400px" : undefined}
        flexGrow={mdUp ? undefined : 1}
        onClose={() => show(false)}
      />
    </ModalTemplate>
  );
};
