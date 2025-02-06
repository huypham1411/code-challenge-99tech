import React from 'react'

interface InputFieldProps {
  label: string
  name: string
  type?: string
  readOnly?: boolean
  [key: string]: unknown
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  readOnly,
  type = 'text',
  ...props
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={props.name} className="font-semibold">
        {label}
      </label>
      <input
        id={props.name}
        type={type}
        {...props}
        readOnly={readOnly}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

export default InputField
