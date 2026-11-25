import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import { render, screen } from '@testing-library/vue'
import { useQuery } from '@urql/vue'
import type { ToursQuery } from '@/gql/graphql'
import ToursView from './ToursView.vue'

// Vi mockar urql: useQuery skickar ingen fråga, utan ger tillbaka det tillstånd testet bestämmer.
vi.mock('@urql/vue', () => ({ useQuery: vi.fn() }))
const mockedUseQuery = vi.mocked(useQuery)

type TourItem = ToursQuery['tours'][number]

// Typen kommer från codegen – samma form som frågan i ToursView, inget handskrivet.
const tour = (overrides: Partial<TourItem> = {}): TourItem => ({
  id: '1',
  title: 'Everest Expedition',
  distanceM: 20000,
  user: { displayName: 'Adrian' },
  guide: { title: 'Mount Everest' },
  photos: [],
  ...overrides,
})

const mockQuery = (state: { data?: ToursQuery; fetching?: boolean; error?: Error }) =>
  mockedUseQuery.mockReturnValue({
    data: ref(state.data),
    fetching: ref(state.fetching ?? false),
    error: ref(state.error),
  } as unknown as ReturnType<typeof useQuery>)

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
  it('shows tour data from the API', async () => {
    mockQuery({ data: { tours: [tour()] } })

    renderView()

    expect(await screen.findByText('Everest Expedition')).toBeInTheDocument()
    expect(screen.getByText('Adrian')).toBeInTheDocument()
    expect(screen.getByText('Mount Everest')).toBeInTheDocument()
    expect(screen.getByText('20 km')).toBeInTheDocument()
  })

  it('shows a dash when a tour has no guide', async () => {
    mockQuery({ data: { tours: [tour({ guide: null })] } })

    renderView()

    expect(await screen.findByText('Everest Expedition')).toBeInTheDocument()
    expect(screen.getByText('-')).toBeInTheDocument()
  })

  it('shows loading state while the query is pending', () => {
    mockQuery({ fetching: true })

    renderView()

    expect(screen.getByText('Laddar turer...')).toBeInTheDocument()
  })

  it('shows an error when the query fails', async () => {
    mockQuery({ error: new Error('API error') })

    renderView()

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Oops! Ett fel inträffade: API error',
    )
  })
})
