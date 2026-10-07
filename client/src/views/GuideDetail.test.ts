import { describe, it, expect, vi, beforeEach } from 'vitest'
import { cleanup, render, screen } from '@testing-library/vue'
import type { Guide } from '@utpost/shared'
import { get } from '../lib/api'
import GuideDetail from './GuideDetail.vue'

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

const renderView = (slug: string) =>
  render(GuideDetail, {
    props: { slug },
    global: { stubs: { RouterLink: { template: '<a><slot /></a>' } } },
  })

describe('GuideDetail', () => {
  beforeEach(() => {
    mockedGet.mockImplementation((path: string) => {
      if (path === '/guides/kebnekaise') {
        return Promise.resolve(guide({ title: 'Kebnekaise' }))
      } else if (path === '/guides/sodra-myrleden') {
        return Promise.resolve(
          guide({ id: 2, slug: 'sodra-myrleden', title: 'Södra Myrleden', region: 'Småland' }),
        )
      }
      return Promise.reject(new Error('API error'))
    })
  })

  it('shows the guides from the API', async () => {
    renderView('kebnekaise')
    expect(await screen.findByRole('heading')).toHaveTextContent('Kebnekaise')
    // i can't get rerender to work, so i'm using cleanup instead
    cleanup()
    renderView('sodra-myrleden')
    expect(await screen.findByRole('heading')).toHaveTextContent('Södra Myrleden')
  })

  it('shows an error when API fails', async () => {
    renderView('slug not found')
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Oops! Ett fel inträffade: API error',
    )
  })
})
