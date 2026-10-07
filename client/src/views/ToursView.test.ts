import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/vue'
import type { TourWithRelations } from '@utpost/shared'
import ToursView from './ToursView.vue'
import { get } from '../lib/api.ts'

vi.mock('../lib/api', () => ({ get: vi.fn() }))
const mockedGet = vi.mocked(get)

const tour = (overrides: Partial<TourWithRelations>): TourWithRelations => ({
  id: 1,
  user_id: 1,
  guide_id: 1,
  title: 'Everest Expedition',
  started_at: '2026-09-01T10:00:00.000Z',
  distance_m: 20000,
  notes: null,
  user: {
    id: 1,
    email: 'test@example.com',
    display_name: 'Adrian',
    role: 'member',
    created_at: '2026-08-01T00:00:00.000Z',
  },
  guide: {
    id: 1,
    slug: 'mounteverest',
    title: 'Mount Everest',
    region: 'Himalayas',
    difficulty: 'svår',
    length_km: 18,
    body_html: '<p>Mount Everest</p>',
    hero_image: null,
    published: true,
    author_id: 1,
    updated_at: '2026-09-01T00:00:00.000Z',
  },
  photos: [],
  logs: [],
  ...overrides,
})

const renderView = () =>
  render(ToursView, {
    global: {
      stubs: {
        RouterLink: {
          template: '<a><slot /></a>',
        },
      },
    },
  })

describe('ToursView', () => {
  beforeEach(() => {
    mockedGet.mockResolvedValue([
      tour({
        id: 1,
        title: 'Everest Expedition',
        distance_m: 20000,
      }),
    ])
  })

  it('shows tour data from the API', async () => {
    renderView()

    expect(await screen.findByText('Everest Expedition')).toBeInTheDocument()
    expect(screen.getByText('Adrian')).toBeInTheDocument()
    expect(screen.getByText('Mount Everest')).toBeInTheDocument()
    expect(screen.getByText('20 km')).toBeInTheDocument()
  })

  it('shows a dash when a tour has no guide', async () => {
    mockedGet.mockResolvedValue([
      tour({
        guide_id: null,
        guide: null,
      }),
    ])

    renderView()

    expect(await screen.findByText('Everest Expedition')).toBeInTheDocument()
    expect(screen.getByText('-')).toBeInTheDocument()
  })

  it('shows loading state while the API request is pending', () => {
    mockedGet.mockReturnValue(new Promise(() => {}))

    renderView()

    expect(screen.getByText('Laddar turer...')).toBeInTheDocument()
  })

  it('shows an error when API fails', async () => {
    mockedGet.mockRejectedValue(new Error('API error'))

    renderView()

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Oops! Ett fel inträffade: API error',
    )
  })
})
