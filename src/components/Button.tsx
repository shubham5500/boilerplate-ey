import React, { FC } from "react"

interface ButtonProps {
  type?: "submit" | "reset" | "button"
  onClick?: () => void
  disabled?: boolean
  classes?: string
  children?: React.ReactNode
  color?: string
}

const Button: FC<ButtonProps> = ({
  type,
  onClick,
  disabled,
  classes,
  color = 'primary',
  children,
}) => {
  let btnBackgroundColor;
  let btnBackgroundHoverColor;
  if (color === 'danger') {
    btnBackgroundColor = 'bg-rose-500'
    btnBackgroundHoverColor = 'hover:bg-rose-400'
  }

  if (color === 'primary') {
    btnBackgroundColor = 'bg-primary'
    btnBackgroundHoverColor = 'hover:bg-grey-400'
  }
  const buttonStyles = `
    rounded text-white p-2 transition-all ${
      disabled ? "bg-gray-300 cursor-not-allowed" : `${btnBackgroundColor} ${btnBackgroundHoverColor}`
    }
    ${classes}
  `

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonStyles}
    >
      {children}
    </button>
  )
}

export default Button
