export interface DatePickerProps {
  minDate: Date;
  date: Date;
  dateChange: (date: Date) => void;
}
