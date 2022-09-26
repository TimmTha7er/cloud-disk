import { AxiosError } from "axios"

export interface IError extends AxiosError {
  msg?: string;
}