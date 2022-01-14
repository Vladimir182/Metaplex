import { Heading, HeadingProps } from "@chakra-ui/layout";

interface Props extends HeadingProps {
  title: string;
}

export const ArtworkTitle: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <Heading
      variant="h4"
      sx={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
      {...rest}
    >
      {title}
    </Heading>
  );
};
