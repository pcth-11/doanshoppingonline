// withDarkMode.js

import React from 'react';
import { DarkModeConsumer } from './DarkModeContext';

const withDarkMode = (WrappedComponent) => {
  return class WithDarkMode extends React.Component {
    render() {
      return (
        <DarkModeConsumer>
          {({ darkMode, toggleDarkMode }) => (
            <WrappedComponent {...this.props} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          )}
        </DarkModeConsumer>
      );
    }
  };
};

export default withDarkMode;
