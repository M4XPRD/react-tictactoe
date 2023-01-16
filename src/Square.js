/* eslint-disable react/prop-types */
import React from 'react';

export default function Square(props) {
  const { value } = props;
  const { onClick } = props;
  return (
    <button
      type="button"
      className="square"
      onClick={onClick}
    >
      {value}
    </button>
  );
}
