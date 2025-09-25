import type { AsyncDataRequestStatus } from "#app";

export interface Geolocation {
	place_name: string | '';
	coordinates: {
		latitude: number | string;
		longitude: number | string;
	};
}

export type WeatherAPIResponse = {
	coordinates: string
	weather: {
		data: {
			coordinates: string[];
			current: {
				time: string;
				precipitation: number;
				temperature2m: number;
				isDay: number;
				apparentTemperature: number;
			}
			periods: openmeteoPeriod[];
			daily: openmeteoDay[];
			descriptions: WeatherDescriptions[];
			videoURL: string;
		},
		status: AsyncDataRequestStatus,
		// @ts-ignore -- Can't find type
		refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
	}
}


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

export type weathergovPeriods = {
  number: number,
  name: string,
  startTime: string,
  endTime: string,
  isDaytime: boolean,
  temperature: number,
  temperatureUnit: string,
  temperatureTrend?: string,
  probabilityOfPrecipitation: {
    unitCode: string,
    value: number
  }
  windSpeed: string,
  windDirection: string,
  icon: string,
  shortForecast: string,
  detailedForecast: string,
}

export type WeatherDescriptions = {
	icon: string[];
	cldURL: string;
	startTime: string,
	endTime: string,
	shortForecast: string,
	detailedForecast: string,
}

export type WeatherCodeObj = {
	day: { description: string; image: string };
	night: { description: string; image: string };
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

export type WeatherApiResponse = {
	coordinates: string;
	current: openmeteo['current'];
	periods: openmeteo['periods'];
	daily: openmeteo['daily'];
	alerts: [] | WeatherGovAlert[];
	descriptions: WeatherDescriptions[];
};

export type openmeteoPeriod = {
	time: string;
	temperature2m: number;
	apparentTemperature: number;
	precipitationProbability: number;
	showers: number;
	rain: number;
	snowfall: number;
	weather_code: number;
}

export type openmeteoDay = {
	time: string;
	weather_code: number;
	temperature_2m_max: number;
	apparent_temperature_max: number;
	temperature_2m_min: number;
	apparent_temperature_min: number;
	precipitation_probability_max: number;
	precipitation_hours: number;
}

export type openmeteo = {
	current: {
		time: string;
		temperature2m: number;
		precipitation: number;
		isDay: number;
		apparentTemperature: number;
	};
	periods: openmeteoPeriod[];
	daily: openmeteoDay[];
};

export interface WeatherGovAlert {
	'@id': string;
	'@type': string;
	'id': string;
	'areaDesc': string;
	'geocode': {
		SAME: string[];
		UGC: string[];
	};
	'affectedZones': string[];
	'references': {
		'@id': string;
		'identifier': string;
		'sender': string;
		'sent': string;
	}[];
	'sent': string;
	'effective': string;
	'onset': string;
	'expires': string;
	'ends': string;
	'status': string;
	'messageType': string;
	'category': string;
	'severity': string;
	'certainty': string;
	'urgency': string;
	'event': string;
	'sender': string;
	'senderName': string;
	'headline': string;
	'description': string;
	'instruction': string;
	'response': string;
	'parameters': {
		AWIPSidentifier: string[];
		WMOidentifier: string[];
		NWSheadline: string[];
		BLOCKCHANNEL: string[];
		VTEC: string[];
		eventEndingTime: string[];
		expiredReferences: string[];
	};
	'scope': string;
	'code': string;
	'language': string;
	'web': string;
	'eventCode': {
		SAME: string[];
		NationalWeatherService: string[];
	};
}
