import React from 'react'

interface SubmitButtonProps {
  isLoading: boolean
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading }) => {
  return (
    <button
      type="submit"
      className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      disabled={isLoading}
    >
      {isLoading ? 'Processing...' : 'Swap'}
    </button>
  )
}

export default SubmitButton
