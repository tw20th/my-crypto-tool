import React from 'react'
import GlossaryTooltip from '@/components/ui/GlossaryTooltip'
import glossary from '@/lib/data/glossary.json'

export function highlightGlossaryTerms(text: string): React.ReactNode[] {
  const elements: React.ReactNode[] = []
  let remaining = text

  while (remaining.length > 0) {
    let found = false

    for (const entry of glossary) {
      const term = entry.term
      const index = remaining.indexOf(term)

      if (index !== -1) {
        if (index > 0) {
          elements.push(remaining.slice(0, index))
        }

        elements.push(
          <GlossaryTooltip
            key={`${term}-${index}`}
            description={entry.description}
          >
            {term}
          </GlossaryTooltip>
        )

        remaining = remaining.slice(index + term.length)
        found = true
        break
      }
    }

    if (!found) {
      elements.push(remaining)
      break
    }
  }

  return elements
}
