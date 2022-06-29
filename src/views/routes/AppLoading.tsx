import { FC } from "react";

import { Layout } from "components/Layout";
import { LoaderComponent } from "components/Modals/InfiniteProgress/LoaderComponent";

export const AppLoading: FC<{ title?: string }> = ({
  title = "Loading store",
}) => (
  <Layout>
    <LoaderComponent darkBg title={title} />
  </Layout>
);
