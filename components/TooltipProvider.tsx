'use client'

import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

export default function TooltipProvider() {
  return (
    <Tooltip
      id="glossary-tooltip"
      place="top"
      style={{
        backgroundColor: '#333',
        color: '#fff',
        borderRadius: '6px',
        fontSize: '12px',
        padding: '6px 10px',
        maxWidth: '240px',
        whiteSpace: 'pre-wrap',
      }}
    />
  )
}
