import { TextValidator } from "../types/text-validator.type";

export const NonEmptyStringValidator: TextValidator = (value: string) => {
  return value.trim() ?  null : 'This field cannot be empty';
};