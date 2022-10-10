import React, { useEffect, useRef } from "react";

export const InputWithLabel = ({
  onInputChange,
  searchTerm,
  children,
  type,
  id,
  isFocused,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        type={type}
        onChange={onInputChange}
        value={searchTerm}
        ref={inputRef}
      />
    </>
  );
};
