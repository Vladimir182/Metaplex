import type {
  SystemStyleObject,
  SystemStyleInterpolation,
} from "@chakra-ui/theme-tools";
import { Input } from "./Input";

const sizes: Record<string, SystemStyleObject> = {
  xs: Input.sizes.xs.field ?? {},
  sm: Input.sizes.sm.field ?? {},
  md: Input.sizes.md.field ?? {},
  lg: Input.sizes.lg.field ?? {},
};

const variants: Record<string, SystemStyleInterpolation> = {
  outline: (props) => Input.variants.outline(props).field ?? {},
};

export const Textarea = {
  variants,
  sizes,
};
