import { FC } from "react";
import { Layout } from "components/Layout";
import { Button, Center, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { VStack } from "@chakra-ui/layout";
import { ROUTES } from "routes";

interface Props {
  href?: string;
  hrefTitle?: string;
}

export const NotFountContent: FC<Props> = ({
  hrefTitle: linkTitle = "Go Home",
  href = ROUTES.home(),
  children,
}) => {
  return (
    <Center height="full">
      <VStack spacing={4}>
        <Heading variant="h1">{children || "Page was not found"}</Heading>
        <Button flexGrow={1} size="lg" as={Link} to={href}>
          {linkTitle}
        </Button>
      </VStack>
    </Center>
  );
};

export const NotFoundView: FC<Props> = ({ children, ...props }) => {
  return (
    <Layout>
      <NotFountContent {...props}>{children}</NotFountContent>
    </Layout>
  );
};
