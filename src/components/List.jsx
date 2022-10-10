import React from "react";
import { Item } from "./Item";

export const List = React.memo(({ list, onRemoveItem }) => {
  const handleRemoveItem = (objectID) => {
    onRemoveItem(objectID);
  };

  return (
    <>
      {list.map(({ objectID, ...item }) => (
        <ul key={objectID}>
          <Item {...item} />
          <span>
            <button
              type="button"
              onClick={() => handleRemoveItem(objectID)}
            >
              Remove
            </button>
          </span>
        </ul>
      ))}
    </>
  );
});
