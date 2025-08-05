export interface Geolocation {
	place_name: string | '';
	coordinates: {
		latitude: number | string;
		longitude: number | string;
	};
}

export type WeatherApiResponse = {
	location: Geolocation;
	current: any;
	periodsByHour: any[];
	periodsByDay: any[];
	alerts: any[];
};

export interface GeolocationNavigatorError {
	name: string;
	code: number;
	message: string;
}

export interface UserGeolocation {
	location: Geolocation;
	navigator: {
		isError: boolean;
		error?: GeolocationNavigatorError | undefined;
	};
}

export type MapboxResponseFeature = {
	id: string;
	type: string;
	place_type: string[];
	relevance: number;
	properties: {
		mapbox_id: string;
		wikidata: string;
	};
	text: string;
	place_name: string;
	bbox: number[];
	center: number[];
	geometry: {
		type: 'Point';
		coordinates: number[];
	};
	context?: Array<{
		id: string; mapbox_id: string; wikidata: string; short_code?: string; text?: string;
	}>;
};

export type MapboxResponse = {
	query: number[];
	features: MapboxResponseFeature[] | [];
	attribution: 'NOTICE: © 2025 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained.';
};

export interface WeatherGovGeoJson {
  '@context'?: [
    string,
    {
      '@version': string
      wx: string;
      '@vocab': string;
    }
  ];
  type?: 'FeatureCollection';
  geometry?: { type: 'Polygon', coordinates: [number, number] },
  properties?: {
        units: 'us',
        forecastGenerator: 'BaselineForecastGenerator',
        generatedAt: string,
        updateTime: string,
        validTimes: string,
        elevation: object[],
        periods: WeatherGovPeriods[]
      },
  features?: [
    {
      id: string,
      type: 'Feature',
      geometry: null,
      properties?: WeatherGovAlert;
    }],
  title?: string;
  updated?: string;
}

export type WeatherGovPeriods = {
	number: number;
	name: string;
	startTime: string;
	endTime: string;
	isDaytime: boolean;
	temperature: number;
	temperatureUnit: string;
	temperatureTrend?: string;
	probabilityOfPrecipitation: {
		unitCode: string;
		value: number;
	};
	windSpeed: string;
	windDirection: string;
	icon: string;
	shortForecast: string;
	detailedForecast: string;
};

export interface WeatherGovAlert {
  '@id': string;
  '@type': string;
  id: string;
  areaDesc: string;
  geocode: {
    SAME: string[];
    UGC: string[];
  };
  affectedZones: string[];
  references: {
    '@id': string;
    identifier: string;
    sender: string;
    sent: string;
  }[];
  sent: string;
  effective: string;
  onset: string;
  expires: string;
  ends: string;
  status: string;
  messageType: string;
  category: string;
  severity: string;
  certainty: string;
  urgency: string;
  event: string;
  sender: string;
  senderName: string;
  headline: string;
  description: string;
  instruction: string;
  response: string;
  parameters: {
    AWIPSidentifier: string[];
    WMOidentifier: string[];
    NWSheadline: string[];
    BLOCKCHANNEL: string[];
    VTEC: string[];
    eventEndingTime: string[];
    expiredReferences: string[];
  };
  scope: string;
  code: string;
  language: string;
  web: string;
  eventCode: {
    SAME: string[];
    NationalWeatherService: string[];
  };
}

export interface OpenmeteoResponse {
	latitude: number;
	longitude: number;
	timezone: string;
	current: {
		time: string;
		temperature2m: number;
		rain: number;
		apparentTemperature?: number;
		precipitation?: number | null | undefined | Float32Array<ArrayBufferLike>;
	};
	periods: OpenmeteoResponsePeriod[];
};

export type WeathergovResponse = {
		forecast: WeatherGovProperties;
		forecastHourly: WeatherGovProperties;
		alerts: [] | WeatherGovAlert[];
	};

export type OpenmeteoResponsePeriod = {
	time: string;
	temperature2m: number;
	apparentTemperature?: number;
	precipitationProbability?: number;
  showers: number;
  rain: number;
  snowfall: number;
};

export type WeatherGovProperties = {
	units: string;
	forecastGenerator: 'BaselineForecastGenerator' | 'HourlyForecastGenerator';
	generatedAt: string;
	updateTime: string;
	validTimes: string;
	elevation: object[];
	periods: WeatherGovPeriods[];
};

export type WeatherSources = {
	openmeteo: OpenmeteoResponse;
	weathergov: WeathergovResponse;
};
