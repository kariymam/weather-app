export type MapboxResponseFeature = {
  id: string,
  type: string,
  place_type: string[],
  relevance: number,
  properties: {
    mapbox_id: string,
    wikidata: string
  },
  text: string,
  place_name: string,
  bbox: number[],
  center: number[],
  geometry: {
    type: 'Point',
    coordinates: number[]
  }
  context?: Array<{
    id: string, mapbox_id: string, wikidata: string, short_code?: string, text?: string
  }>
}

export type MapboxResponse = {
  query: number[],
  features: MapboxResponseFeature[] | [],
  attribution: 'NOTICE: © 2025 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained.'
}