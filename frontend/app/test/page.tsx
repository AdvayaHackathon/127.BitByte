"use client";

import React, { useState } from "react";

const CheckboxListApp: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const items = ["Apple", "Banana", "Cherry"];

  const handleCheckboxChange = (item: string, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, item]);
    } else {
      setSelectedItems((prev) => prev.filter((i) => i !== item));
    }
  };

  return (
    <div>
      <h2>Pick Fruits:</h2>
      {items.map((item) => (
        <div key={item}>
          <input
            type="checkbox"
            onChange={(e) => handleCheckboxChange(item, e.target.checked)}
          />
          <label>{item}</label>
        </div>
      ))}

      <h3>Selected:</h3>
      <ul>
        {selectedItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default CheckboxListApp;
