import {Warning} from "phosphor-react"
import type { ComponentProps } from "react";

type CustomInputProps = ComponentProps<"input"> & {
  labelName: string;
  isFailure?: boolean;
  failureMessage?: string;
}

export function CustomInput({
  labelName,
  isFailure,
  failureMessage,
  ...rest
}: CustomInputProps) {
  return (
    <fieldset className=" group w-full flex flex-col gap-2">
      <label
        htmlFor="input-field"
        className={`text-xs group-focus-within:text-blue-base ${isFailure ? 'text-danger font-semibold' : 'text-gray-500 font-normal'}`}>
        {labelName}
      </label>
      <input
        type="text"
        className={`group-focus-within:ring-2 group-focus-within:ring-blue-base group-focus-within:border-blue-base w-full p-2 border rounded-md focus:outline-none ${isFailure ? "border-danger" : 'border-gray-300'}`}
        {...rest} />
      {
        isFailure && (
          <div className="flex flex-row gap-2">
            <Warning className="text-danger" />
            <span className="text-sm text-gray-500">{failureMessage}</span>
          </div>
        )
      }
    </fieldset>
  )
}