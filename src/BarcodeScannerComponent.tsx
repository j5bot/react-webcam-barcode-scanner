import React from 'react'
import { BrowserMultiFormatReader, Result } from '@zxing/library'
import Webcam from 'react-webcam'
import { ValueOf } from './types'

export const FacingMode = {
  ENVIRONMENT: 'environment',
  USER: 'user'
} as const
export type FacingMode = ValueOf<typeof FacingMode>;

export const ScreenshotFormat = {
  JPG: 'image/jpeg',
  PNG: 'image/png',
  WEBP: 'image/webp'
} as const
export type ScreenshotFormat = ValueOf<typeof ScreenshotFormat>;

export type BarcodeScannerComponentProps = {
  width: number;
  height: number;
  onUpdate: (arg0: unknown, arg1?: Result) => void;
  screenshotFormat?: ScreenshotFormat;
  facingMode?: FacingMode;
};

export const BarcodeScannerComponent = ({
  width,
  height,
  onUpdate,
  screenshotFormat= ScreenshotFormat.JPG,
  facingMode = FacingMode.ENVIRONMENT
}: BarcodeScannerComponentProps): React.ReactElement => {
  const webcamRef = React.useRef(null)
  const codeReader = new BrowserMultiFormatReader()

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef?.current?.getScreenshot()
      if (imageSrc) {
        codeReader.decodeFromImage(undefined, imageSrc).then(result => {
          onUpdate(null, result)
        }).catch((err) => {
          onUpdate(err)
        })
      }
    },
    [codeReader, onUpdate]
  )

  React.useEffect(() => {
    const id = setInterval(capture, 100)
    return () => clearInterval(id)
  }, [])

  return (
    <Webcam
      width={width}
      height={height}
      ref={webcamRef}
      screenshotFormat={screenshotFormat}
      videoConstraints={{
        facingMode
      }}
      audioConstraints={false}
    />
  )
}

export default BarcodeScannerComponent
