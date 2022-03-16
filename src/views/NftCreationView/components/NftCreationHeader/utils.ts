import { FileType } from "components/MediaTypeSelector";
import { NewItemSidebarEnum } from "../NewItemSidebar";

interface INftCreationHeaderText {
  label?: string;
  title?: string;
  subtitle?: string[];
}
export const getTextSelector = (
  step: NewItemSidebarEnum,
  metadataCategory: FileType
): INftCreationHeaderText => {
  switch (step) {
    case NewItemSidebarEnum.MEDIA_TYPE:
      return {};
    case NewItemSidebarEnum.CREATE:
      return metadataCategory === FileType.VIDEO
        ? {
            label: "VIDEO",
            title: "Create new Membership token",
            subtitle: [
              "We recommend an video of at least under 10 MB.",
              "You can upload a MP4.",
            ],
          }
        : {
            label: "VIDEO",
            title: "Create new Membership token",
            subtitle: [
              "We recommend an video of at least under 10 MB.",
              "You can upload a MP4.",
            ],
          };
    case NewItemSidebarEnum.PREVIEW:
      return {
        title: "Preview your Membership token",
      };
    default:
      return {};
  }
};
