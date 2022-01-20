import { Link } from "@chakra-ui/react";
import { StoreCreateForm } from "components/forms/StoreCreateForm";
import { Layout } from "components/Layout";
import { InfiniteProgress } from "components/modals/InfiniteProgress";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ROUTES } from "routes";
import { useLocalState } from "./StoreCreate.state";

function goToSuccessPage(navigate: NavigateFunction) {
  navigate(ROUTES.home());
}

export const StoreCreate: React.FC = () => {
  const navigate = useNavigate();
  const { onSubmit, progressMeta } = useLocalState({
    goToSuccessPage,
    navigate,
  });

  return (
    <Layout narrow>
      <StoreCreateForm
        onSubmit={onSubmit}
        title="Create your store"
        actionButtonName="Create Store"
      >
        <>
          No technical setup or coding required. Takes less than 5 minutes.
          <Link href="#"> Learn more</Link>
        </>
      </StoreCreateForm>

      <InfiniteProgress
        isOpen={progressMeta.isOpen}
        title={progressMeta.title}
        subtitle={progressMeta.subtitle}
      />
    </Layout>
  );
};
