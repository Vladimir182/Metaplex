export enum SupplyType {
  LIMITED,
  UNLIMITED,
}

export const SupplyTypesMap = [
  {
    value: SupplyType.UNLIMITED,
    label: "Unlimited",
  },
  {
    value: SupplyType.LIMITED,
    label: "Limited",
  },
];

export const MAXIMUM_SUPPLY_DEFAULT = "10000";
