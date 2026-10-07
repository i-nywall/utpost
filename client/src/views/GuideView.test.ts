import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/vue'
import type { Guide } from '@utpost/shared'
import GuidesView from './GuideView.vue'
import { get } from '../lib/api'

vi.mock('../lib/api', () => ({ get: vi.fn() }))
const mockedGet = vi.mocked(get)

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

const renderView = () =>
  render(GuidesView, { global: { stubs: { RouterLink: { template: '<a><slot /></a>' } } } })

describe('GuidesView', () => {
  beforeEach(() => {
    mockedGet.mockResolvedValue([
      guide({ id: 1, title: 'Kebnekaise', region: 'Lappland' }),
      guide({ id: 2, slug: 'sodra-myrleden', title: 'Södra Myrleden', region: 'Småland' }),
    ])
  })

  it('shows the guides from the API', async () => {
    renderView()
    expect(await screen.findByText('Kebnekaise')).toBeInTheDocument()
    expect(screen.getByText('Resultat: 2 av 2')).toBeInTheDocument()
  })
})
