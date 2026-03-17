import { TextValidator } from "./text-validator.type";

export interface FormTextField {
  name: string,
  label: string,
  defaultValue: string,
  validators: Array<TextValidator>,
}