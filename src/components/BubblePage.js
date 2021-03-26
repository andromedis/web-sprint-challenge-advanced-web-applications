// Library imports
import React, { useEffect, useState } from "react";

// Utility imports
import axiosWithAuth from "../helpers/axiosWithAuth";

// Component imports
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  // State for list of colors
  const [colorList, setColorList] = useState([]);

  // Effect calls API to get colors when component mounts
  useEffect(() => {
    axiosWithAuth()
      .get(`/api/colors`)
      .then(res => {
        console.log(res);
        setColorList(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

// Default export
export default BubblePage;

//Task List:
//1. Make an axios call to retrieve all color data and push to state on mounting.
