import React from 'react';
import {WebView} from 'react-native-webview';
import {StatusBar} from 'react-native';

function App() {
  return (
    <>
      <StatusBar hidden />
      <WebView
        source={{uri: 'http://192.168.1.101:5000'}}
        ref={(ref) => {
          this.webView = ref;
        }}
        onError={() => {
          this.webView.reload();
        }}
      />
    </>
  );
}

export default App;
