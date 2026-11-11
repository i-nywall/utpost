import DataLoader from 'dataloader'

const byId = (rows, ids) => {
  const map = new Map(rows.map((row) => [row.id, row]))
  return ids.map((id) => map.get(id) ?? null)
}

const groupBy = (rows, key, ids) => {
  const map = new Map()
  for (const row of rows) {
    if (!map.has(row[key])) map.set(row[key], [])
    map.get(row[key]).push(row)
  }
  return ids.map((id) => map.get(id) ?? [])
}

export const createLoaders = ({ query, mongoFind }) => ({
  user: new DataLoader(async (ids) =>
    byId((await query('select * from users where id = any($1)', [ids])).rows, ids),
  ),
  guide: new DataLoader(async (ids) =>
    byId((await query('select * from guides where id = any($1)', [ids])).rows, ids),
  ),
  photos: new DataLoader(async (tourIds) =>
    groupBy(
      (await query('select * from photos where tour_id = any($1) order by id', [tourIds])).rows,
      'tour_id',
      tourIds,
    ),
  ),
  logs: new DataLoader(async (tourIds) => {
    const docs = await mongoFind('tours', { tour_id: { $in: tourIds } }, { tour_id: 1, logs: 1 })
    const map = new Map(docs.map((d) => [d.tour_id, d.logs]))
    return tourIds.map((id) => map.get(id) ?? [])
  }),
})
