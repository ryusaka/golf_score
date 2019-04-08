import * as React from 'react'
import * as QRCode from 'qrcode.react'

interface Props {
  value: string
  size?: number
}
const QR: React.FunctionComponent<Props> = (props) => {
  if (!props.value) return null
  return (
    <QRCode value={props.value} size={props.size || 256} />
  )
}

export default QR