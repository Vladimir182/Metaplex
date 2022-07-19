import React, {
  ChangeEvent,
  ClipboardEvent,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";
import { Input, StyleProps } from "@chakra-ui/react";
import { isWalletValid } from "views/NftCreationView/components/NftCreate/utils";

import { WalletAddress } from "../WalletAddress";

interface Props extends StyleProps {
  cropSize?: number;
  isInvalid?: boolean;
  name: string;
  onBlur?: () => void;
  value: string;
  onChange: (value: string) => void;
  isOwner?: boolean;
  placeholder?: string;
  isDisabled?: boolean;
}

export const WalletInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      cropSize,
      value = "",
      onChange,
      isOwner = false,
      isInvalid,
      name,
      onBlur,
      placeholder,
      isDisabled,
      ...props
    },
    ref
  ) => {
    const { setFocus } = useFormContext();

    const [isFocused, setFocusState] = useState(false);
    const [isInputMode, setIsInputMode] = useState(true);
    const [innerValue, setInnerValue] = useState(value);

    useEffect(() => {
      setInnerValue(value);
    }, [value]);

    useEffect(() => {
      if (value && !isFocused) {
        setIsInputMode(false);
      }
    }, [isFocused, value]);

    const onKeyPresHandler = (ev: KeyboardEvent<HTMLInputElement>) => {
      if (ev.key === "Enter" && isWalletValid(ev.currentTarget.value)) {
        ev.preventDefault();
        setIsInputMode(false);
      }
    };

    const onBlurHandler = () => {
      onBlur?.();
      setFocusState(false);

      if (innerValue !== "" && isWalletValid(innerValue)) {
        setIsInputMode(false);
      }
    };

    const onFocusHandler = () => {
      setFocusState(true);
    };

    const onChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
      const val = ev.currentTarget.value;

      setInnerValue(val);
      onChange(val);
    };

    const onPasteHandler = (ev: ClipboardEvent<HTMLInputElement>) => {
      const val = ev.clipboardData.getData("text");
      onChange(val);

      if (isWalletValid(val)) {
        setInnerValue(val);
        setIsInputMode(false);
      }
    };

    const onClickHandler = () => {
      if (!isDisabled) {
        setIsInputMode(true);
        setTimeout(() => setFocus(name), 0);
      }
    };

    return isInputMode ? (
      <Input
        isInvalid={isInvalid}
        name={name}
        value={innerValue}
        onChange={onChangeHandler}
        onKeyPress={onKeyPresHandler}
        onBlur={onBlurHandler}
        onFocus={onFocusHandler}
        onPaste={onPasteHandler}
        ref={ref}
        placeholder={placeholder}
        {...props}
      />
    ) : (
      <WalletAddress
        address={innerValue}
        avatarSize="sm"
        cropSize={cropSize}
        enableCopying
        layerStyle="base"
        h={14}
        onClick={onClickHandler}
        isOwner={isOwner}
        {...props}
      />
    );
  }
);
