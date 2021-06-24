# React Webcam Barcode Scanner

This is a simple bare bones React component built in Typescript to provide a webcam-based barcode scanner using [react-webcam](https://github.com/mozmorris/react-webcam) and [@zxing/library](https://github.com/zxing-js/library). This component works on Computers and Mobile Devices with cameras (iOS 14 and above and Android Phones).

## Installation

```
yarn add react-webcam-barcode-scanner
```

## Usage in React:

A demo of the original repo can be found at: [https://barcode.phdash.com](https://barcode.phdash.com).

```jsx
import React from 'react';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

function App() {

  const [ data, setData ] = React.useState('Not Found');

  return (
    <>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) setData(result.text)
          else setData('Not Found')
        }}
        facingMode={'environment'}
        screenshotFormat={'image/jpeg'}
      />
      <p>{data}</p>
    </>
  )
}

export default App;
```

## Fork Info

This fork:
- add properties and typings for `facingMode` and `screenshotFormat` to component
- changes the image format from PNG to JPG for less intensive processing
- removes the request for microphone permissions
- adds cleanup to webcam capture interval
- upgrades dependencies

