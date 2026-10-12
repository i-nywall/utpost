import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import type { Guide } from '@utpost/shared'
import GuideCard from './GuideCard.vue'

const guide = (overrides: Partial<Guide>): Guide => ({
  id: 1,
  slug: 'kebnekaise',
  title: 'Kebnekaise',
  region: 'Lappland',
  difficulty: 'svår',
  length_km: 18,
  body_html: '<p>Sveriges tak</p>',
  hero_image: null,
  published: true,
  author_id: 1,
  updated_at: '2026-09-01T00:00:00.000Z',
  ...overrides,
})

const renderCard = (g: Guide) =>
  render(GuideCard, {
    props: { guide: g },
    global: { stubs: { RouterLink: { template: '<a><slot /></a>' } } },
  })

describe('GuideCard', () => {
  it('does not render scripts or event handlers from body_html (debt #21)', () => {
    const { container } = renderCard(
      guide({
        body_html: '<img src="x" onerror="alert(1)"><script>alert(2)</script><p>Hej</p>',
      }),
    )

    expect(container.querySelector('script')).toBeNull()
    expect(container.querySelector('[onerror]')).toBeNull()
  })
})
