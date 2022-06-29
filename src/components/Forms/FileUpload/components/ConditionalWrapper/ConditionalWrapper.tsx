interface ConditionalWrapperProps {
  children: React.ReactElement;
  wrap?: boolean;
  wrapper: (children: React.ReactElement) => JSX.Element;
}

export const ConditionalWrapper: React.FC<ConditionalWrapperProps> = ({
  wrap,
  wrapper,
  children,
}) => {
  return wrap ? wrapper(children) : children;
};
