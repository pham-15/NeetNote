import React from 'react'

const Spinner = () => {
  return (
    <div
    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
    style={{ borderColor: '#fbbf24', borderRightColor: 'transparent' }}
    role = "status">
    </div>
  )
}

export default Spinner