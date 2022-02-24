export const getSaleText = (
  type: string
): { title: string; titleDesc: string } =>
  type === "primary"
    ? {
        title: "Primary Sale",
        titleDesc: "Define who will get % of the initial sale of tokens",
      }
    : {
        title: "Secondary Sale",
        titleDesc: "Define % of Royalty on secondary sale",
      };
