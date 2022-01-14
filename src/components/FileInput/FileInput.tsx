import { Button, Flex, FlexProps, Input } from "@chakra-ui/react";

import { forwardRef } from "react";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";

interface Props extends FlexProps {
  actionText: string;
  action: () => void;
  disabled?: boolean;
}

export const FileInput = forwardRef<HTMLInputElement, Props>(
  ({ actionText, action, disabled, ...props }, ref) => {
    const { mdUp } = useCustomBreakpoints();

    const touchingCornerRadius = mdUp ? 0 : undefined;
    const buttonCornerRadius = mdUp ? "xl" : undefined;

    return (
      <Flex direction={mdUp ? "row" : "column"} align="stretch" {...props}>
        <Input
          ref={ref}
          disabled={disabled}
          bg="whiteAlpha.50"
          color="whiteAlpha.700"
          _placeholder={{ color: "whiteAlpha.700" }}
          placeholder="http://example.io"
          borderTopRightRadius={touchingCornerRadius}
          borderBottomRightRadius={touchingCornerRadius}
          mb={mdUp ? 0 : 4}
        />
        <Button
          onClick={action}
          variant="tertiary"
          h={mdUp ? "unset" : undefined}
          size={mdUp ? undefined : "lg"}
          disabled={disabled}
          borderTopLeftRadius={touchingCornerRadius}
          borderBottomLeftRadius={touchingCornerRadius}
          borderTopRightRadius={buttonCornerRadius}
          borderBottomRightRadius={buttonCornerRadius}
          px={5}
        >
          {actionText}
        </Button>
      </Flex>
    );
  }
);
