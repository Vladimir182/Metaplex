import { FC } from "react";
import { ModalCloseButton } from "@chakra-ui/modal";
import { useEvent, useStore } from "effector-react";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import {
  $showStoreCongratulations,
  $store,
  setShowStoreCongratulations,
} from "state/store";

import { StoreCreateCongratulations } from "components/Modals/StoreCreateCongratulations";
import { ModalTemplate } from "components/Modals/template";

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
        h={mdUp ? "400px" : undefined}
        flexGrow={mdUp ? undefined : 1}
        onClose={() => show(false)}
      />
    </ModalTemplate>
  );
};
