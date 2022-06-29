import { truncateInMiddle } from "utils/truncateInMiddle";

export const getPersonName = ({
  name,
  address,
}: {
  name?: string;
  address?: string;
}) => (name ? name : address && truncateInMiddle(address));
