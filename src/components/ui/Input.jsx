import React from 'react';

const Input = React.forwardRef(({ 
  label, 
  error, 
  className = '', 
  ...props 
}, ref) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full px-3 py-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
