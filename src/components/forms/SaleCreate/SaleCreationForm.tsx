import {
  FC,
  useEffect,
  useRef,
  useMemo,
  RefObject,
  MutableRefObject,
} from "react";
import {
  Flex,
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { Controller, useForm, FormProvider } from "react-hook-form";

import {
  ArtworkSummary,
  ArtworkSummaryProps,
} from "components/Artwork/ArtworkSummary";
import { SolanaIcon } from "components/Icons";
import { DateTimePicker } from "components/Datepicker/DateTimePicker";
import { MaximumSupply } from "../NftCreate/MaximumSupply";

export interface IForm {
  price: string;
  startDate: Date;
  piecesInOneWallet: number;
}

export interface SaleCreationFormProps {
  artworkSummary: ArtworkSummaryProps;
  onSubmit?(form: IForm): void;
  onUpdate(isValid: boolean): void;
  refForm?: RefObject<HTMLFormElement>;
  refTriggerValidationFn: MutableRefObject<(() => void) | null>;
}

export const SaleCreationForm: FC<SaleCreationFormProps> = ({
  artworkSummary,
  onUpdate,
  onSubmit,
  refForm,
  refTriggerValidationFn,
}) => {
  const methods = useForm<IForm>({
    mode: "onChange",
  });
  const { register, control } = methods;
  const minDate = useRef(new Date()).current;
  const maxMintsPerWallet =
    Number(artworkSummary.total) - Number(artworkSummary.edition);

  const { handleSubmit } = methods;
  const onSubmitHandle = useMemo(() => {
    if (!onSubmit) {
      return;
    }
    return handleSubmit((data) => onSubmit(data));
  }, [handleSubmit, onSubmit]);

  refTriggerValidationFn.current = () =>
    methods.trigger(["price", "startDate", "piecesInOneWallet"], {
      shouldFocus: true,
    });

  useEffect(() => {
    onUpdate(methods.formState.isValid);
  }, [methods.formState.isValid]);

  return (
    <Box>
      <FormProvider {...methods}>
        <Box mb={10}>
          <Heading variant="h3">Configure sale</Heading>
        </Box>

        <Flex
          as="form"
          flexDir="column"
          onSubmit={onSubmitHandle}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
          ref={refForm as any}
        >
          <Heading textTransform="uppercase" fontSize="sm" variant="h5" mb={4}>
            Membership token copies
          </Heading>
          <ArtworkSummary {...artworkSummary} w="full" mb={8} />

          <Heading textTransform="uppercase" fontSize="sm" variant="h5">
            Sell Price
          </Heading>
          <Text color="whiteAlpha.700" mb={4}>
            What price would you sell this for?
          </Text>
          <InputGroup mb={8}>
            <InputLeftElement
              pointerEvents="none"
              children={<SolanaIcon h="24px" w="24px" boxSize={9} p={1} />}
            />
            <InputRightElement
              pointerEvents="none"
              children={<Text>SOL</Text>}
            />
            <Input
              id="price"
              type="number"
              color="whiteAlpha.700"
              bg="whiteAlpha.50"
              pl={12}
              placeholder="Price"
              {...register("price", { required: true })}
            />
          </InputGroup>

          <MaximumSupply
            id="piecesInOneWallet"
            title="mints per wallet"
            description="Number of tokens user can mint per 1 wallet"
            defaultValue="1"
            min={1}
            max={maxMintsPerWallet}
          />

          <Heading textTransform="uppercase" fontSize="sm" variant="h5" mt={10}>
            Start Date
          </Heading>
          <Text color="whiteAlpha.700" mb={4}>
            When would you like your sale to start?
          </Text>
          <InputGroup mb={12}>
            <Controller
              control={control}
              render={({ field }) => (
                <DateTimePicker
                  minDate={minDate}
                  onChange={field.onChange}
                  flexGrow={1}
                />
              )}
              name="startDate"
            />
          </InputGroup>
        </Flex>
      </FormProvider>
    </Box>
  );
};
