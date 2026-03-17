import { TextValidator } from "../types/text-validator.type";

export const NumberStringValidator: TextValidator = (value: string) => {
  return isNaN(Number(value)) ? 'This field must be a number' : null;
}