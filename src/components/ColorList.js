// Library imports
import React, { useState } from "react";

// Utility imports
import axiosWithAuth from '../helpers/axiosWithAuth';

// Component imports
import EditMenu from './EditMenu';

// Empty default values
const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // State for editing  and color being edited status
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  // Helper functions
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();

    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res);
        updateColors(colors.map(color => (
          color.id === colorToEdit.id ? colorToEdit : color
        )));
        setEditing(false);
        setColorToEdit(initialColor);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        console.log(res);
        updateColors(colors.filter(item => item.id !== color.id));
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

    </div>
  );
};

// Default export
export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.