import { FC } from "react"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import { ObjectType } from "../interfaces/utilsInterface"

interface inputProps {
  id: string
  type?: string | 'text'
  label: string
  disabled?: boolean
  required?: boolean
  register: UseFormRegister<any>
  errors: ObjectType
  classes?: string
  validations?: any,
  children?: React.ReactNode,
}

const Input: FC<inputProps> = ({
  id,
  label,
  type = "text",
  disabled = false,
  register,
  required,
  errors,
  validations = {},
  classes = '',
  children,
}) => {
  
  return (
    <div className="relative w-full">
      <input
        {...register(id, { required, ...validations, })}
        type={type}
        id={id}
        disabled={disabled}
        className={`
            ${classes}
            peer
            w-full
            p-3
            pt-6
            mb-3
            font-light
            bg-white
            border-2
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            ${
              errors[id]
                ? "border-rose-500 focus:border-rose-500"
                : "border-neutral-300 focus:border-grey"
            }
        `}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={`
        absolute
        text-md
        duration-150
        -translate-y-3.5
        top-5
        left-3
        z-10
        origin-[0]
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${errors[id] ? "text-rose-500" : "text-zinc-400"}
      `}
      >
        {label}
      </label>
      {children}
     {errors[id]?.message && <div className="transition-all text-xs text-rose-500 -mt-2 mb-3">{errors[id]?.message || ''}</div>}
    </div>
  )
}

export default Input
