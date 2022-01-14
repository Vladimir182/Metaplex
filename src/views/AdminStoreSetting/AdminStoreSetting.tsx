import { Link } from "@chakra-ui/react";
import { StoreCreateForm } from "components/forms/StoreCreateForm";
import { FC } from "react";
import { useLocalState } from "./AdminStoreSetting.state";
import { InfiniteProgress } from "components/modals/InfiniteProgress";
import { useParams } from "react-router-dom";

export const AdminStoreSetting: FC = () => {
  const { storeId } = useParams();
  if (!storeId) {
    throw new Error("Must use :storeId in route");
  }
  const { form, submitForm, progressMeta } = useLocalState({ storeId });
  return (
    <StoreCreateForm
      onSubmit={submitForm}
      title="My Storefront"
      actionButtonName="Update Store"
      defaultValues={form ?? undefined}
    >
      <>
        Need help?
        <Link href="#"> Read our storefront guide.</Link>
      </>
      <InfiniteProgress
        isOpen={progressMeta.isOpen}
        title={progressMeta.title}
        subtitle={progressMeta.subtitle}
      />
    </StoreCreateForm>
  );
};
