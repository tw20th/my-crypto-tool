import { PropsWithChildren } from 'react'

type Props = {
  description: string
}

export default function GlossaryTooltip({
  description,
  children,
}: PropsWithChildren<Props>) {
  return (
    <span
      data-tooltip-id="glossary-tooltip"
      data-tooltip-content={description}
      style={{ textDecoration: 'underline dotted', cursor: 'help' }}
    >
      {children}
    </span>
  )
}
