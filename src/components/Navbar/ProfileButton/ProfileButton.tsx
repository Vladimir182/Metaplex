import { WalletMultiButton } from "components/smart/Wallet";

import { Link } from "react-router-dom";
import { Person } from "components/Person";
import { PersonButton } from "components/buttons/PersonButton";

export interface ProfileButtonProps {
  user?: React.ComponentProps<typeof Person> & { notifications?: number };
  linkTo?: string;
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({ user }) => {
  if (user) {
    return <PersonButton {...user} variant="ghost" as={Link} to="/profile" />;
  }

  return <WalletMultiButton />;
};
