export type Difficulty = 'lätt' | 'medel' | 'svår'

export interface Guide {
  id: number
  slug: string
  title: string
  region: string
  difficulty: Difficulty
  length_km: number
  body_html: string
  hero_image: string | null
  published: boolean
  author_id: number | null
  updated_at: string
}

export interface User {
  id: number
  email: string
  display_name: string
  role: 'member' | 'editor'
  created_at: string
}

export interface TourLog {
  id: number
  tour_id: number
  recorded_at: string
  lat: number
  lon: number
  elevation_m: number | null
  heart_rate: number | null
  note: string | null
}

export interface Photo {
  id: number
  tour_id: number
  filename: string
  width: number
  height: number
  created_at: string
}

export interface Tour {
  id: number
  user_id: number
  guide_id: number | null
  title: string
  started_at: string
  distance_m: number
  notes: string | null
}

/** GET /api/tours */
export interface TourWithRelations extends Tour {
  user: User
  guide: Guide | null
  photos: Photo[]
  logs: TourLog[]
}

/** GET /api/tours/:id */
export interface TourDetail extends Tour {
  logs: TourLog[]
  photos: Photo[]
}

/** POST /api/auth/login */
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  // API:et skickar för närvarande även password_hash.
  // TypeScript tar inte bort extra fält. Hanteras separat i M8.
  user: User
}

/** Felsvar från API:et */
export interface ApiError {
  error: string
}