import React, { Component } from "react";
import DarkModeContext from './DarkModeContext';
import { FaMoon, FaSun } from "react-icons/fa";

class DarkModeToggle extends Component {

  render() {
    return (
        <DarkModeContext.Consumer>
        {({ isDarkMode, toggleDarkMode }) => (
      <button
        className="bg-gray-200 dark:bg-gray-700 rounded-full p-2 ml-4"
        onClick={toggleDarkMode}
      >
        {isDarkMode ? (
          <FaMoon className="w-6 h-6 text-white" />
        ) : (
          <FaSun className="w-6 h-6 text-gray-800" />
        )}
      </button>
      )}
      </DarkModeContext.Consumer>
    );
  }
}

export default DarkModeToggle;
