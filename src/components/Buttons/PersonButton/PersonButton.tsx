import { forwardRef } from "react";
import { Avatar, Badge, Button } from "@chakra-ui/react";
import { getPersonName } from "utils/getPersonName";

import type { PersonProps } from "components/DataDisplay/Person";

export interface PersonButtonProps
  extends PersonProps,
    React.ComponentProps<typeof Button> {
  notifications?: number;
}

export const PersonButton = forwardRef<HTMLButtonElement, PersonButtonProps>(
  ({ name, address, avatarUrl, notifications, ...props }, ref) => (
    <Button
      ref={ref}
      leftIcon={
        <>
          {notifications && (
            <Badge variant="solid" mr={2}>
              {notifications}
            </Badge>
          )}
          <Avatar size="sm" src={avatarUrl} />
        </>
      }
      variant="ghost"
      {...props}
    >
      {getPersonName({ name, address })}
    </Button>
  )
);
