import React, { FC, useEffect, useState } from "react"

interface AlertProps {
  type: string
  text: string
}

const Alert: FC<AlertProps> = ({ type, text }) => {
  let alertConfig = {
    label: "",
    color: "gray-600",
  }
  if (type === "success") {
    alertConfig.label = "Success"
    alertConfig.color = "emerald-500"
  }
  if (type === "danger") {
    alertConfig.label = "Error"
    alertConfig.color = "red-500"
  }
  if (type === "warning") {
    alertConfig.label = "Warning"
    alertConfig.color = "yellow-400"
  }

  const getBgColor = `bg-${alertConfig.color}`
  const getTextColor = `text-${alertConfig.color}`

  const [visible, setVisible] = useState(!!text)

  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => {
        setVisible(false)
      }, 3000) // Hide the alert after 3 seconds
      return () => clearTimeout(timeout)
    }
  }, [])


  return (
    <div
      className={`z-[100] fixed top-4 right-0  text-white shadow-md transform ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      } transition-transform transition-opacity duration-300 ease-in-out flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md`}
    >
      <div className={`flex items-center justify-center w-12 ${getBgColor}`}>
        <svg
          className="w-6 h-6 text-white fill-current"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
        </svg>
      </div>

      <div className="px-4 py-2 -mx-3">
        <div className="mx-3">
          <span className={`font-semibold ${getTextColor}`}>
            {alertConfig.label}
          </span>
          <p className="text-sm text-gray-600">{text}</p>
        </div>
      </div>
    </div>
  )
}

export default Alert
// import React, { useState, useEffect } from 'react';

// const PopAlert = ({ message }) => {

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//         onClick={handleShowAlert}
//       >
//         Show Alert
//       </button>

//       <div
//         className={`fixed bottom-0 left-0 right-0 bg-blue-500 text-white px-4 py-3 shadow-md transform ${
//           visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
//         } transition-transform transition-opacity duration-300 ease-in-out`}
//       >
//         {message}
//       </div>
//     </div>
//   );
// };

// export default PopAlert;
