import { BoxProps, Button, ButtonProps } from "@chakra-ui/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import ChokUiPagination from "@choc-ui/paginator";
import { fontSizes } from "theme/typography";
import { forwardRef } from "react";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";

interface Props extends BoxProps {
  currentPage: number;
  itemsPerPage: number;
  total: number;
  onPageChange: (page?: number) => void;
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  itemsPerPage,
  total,
  onPageChange,
  ...props
}) => {
  const { mdUp } = useCustomBreakpoints();

  const Prev = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
    <Button ref={ref} p={mdUp ? undefined : 1} {...props}>
      <MdKeyboardArrowLeft size={fontSizes["2xl"]} />
    </Button>
  ));
  const Next = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
    <Button ref={ref} p={mdUp ? undefined : 1} {...props}>
      <MdKeyboardArrowRight size={fontSizes["2xl"]} />
    </Button>
  ));
  const More = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
    <Button ref={ref} {...props}>
      ...
    </Button>
  ));

  const itemRender = (_?: number, type?: string) => {
    if (type === "prev") {
      return Prev;
    }
    if (type === "next") {
      return Next;
    }
    if (type === "backward" || type === "forward") {
      return More;
    }
  };

  return (
    <ChokUiPagination
      current={currentPage}
      onChange={onPageChange}
      pageSize={itemsPerPage}
      total={total}
      itemRender={itemRender}
      pageNeighbours={mdUp ? 1 : 0}
      paginationProps={{
        display: "flex",
        justifyContent: "flex-end",
        ...props,
      }}
      baseStyles={{ bg: "gray.700", color: "whiteAlpha.700" }}
      activeStyles={{ bg: "gray.600", color: "white" }}
      hoverStyles={{ bg: "gray.500", color: "white" }}
      size={mdUp ? "md" : "sm"}
    />
  );
};
