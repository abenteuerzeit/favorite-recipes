import React from "react";

const spinnerIconUrl = 'https://static-assets.codecademy.com/Courses/Learn-Redux/Recipes-App/icons/spinner.png'

export default function Spinner() {
  return (
    <img src={spinnerIconUrl} alt="Recipes are loading" className="spinner" />
  );
}
