import React, { Component } from 'react';
import FileUpload from 'components/FileUpload';

class App extends Component {
  render() {
    return (
      <div>
        <h2> File upload </h2>
        <FileUpload />
      </div>
    );
  }
}

export default App;
