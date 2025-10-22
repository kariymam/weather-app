// Latitude must be in range of -90 to 90°
export interface IUserLocation {
  place_name: string;
  coordinates: number[]
  longitude: number
  latitude: number
}

export function UserLocation(input: unknown): IUserLocation {

    // Check if the string is formatted as [digit,digit]
    const regex = /^(-?\d+\.{1}\d+),{1}(-?\d+\.{1}\d+)$/gm
    const isFormatted = (val: unknown) => regex.test(String(val))

    // Check if the strings convert to numeric
    const isNumeric = (val: string) => {
        return !Number.isNaN(parseInt(val))
    }

    // Check if number is in range, latitude must be in range of -90 to 90°
    const isInRange = (val: number) => {
            return val >= -90 && val <= 90;
    }


    // Validations input strings
    function validate(value: unknown): asserts value is number[] {

        if (!isFormatted(value)) {
            throw Error('Failed validation')
        }
        if(isFormatted(value) && value !== typeof 'object'){
            const coordinates = Array.from([...String(value).split(',')]);

            const [latitude, longitude] = coordinates

            if(!isNumeric(latitude) || !isNumeric(longitude) || !isInRange(Number(latitude))){
                throw Error('Strings do not convert to number')
            }
        }
    }

    if (typeof input === 'string') {
        validate(input);
        input = Array.from([...String(input).split(',')]).map(val => parseFloat(val))
    } 
        
    if (Array.isArray(input) 
        && input.length === 2 
        && typeof input[0] === 'number' 
        && typeof input[1] === 'number'
    ){
        input = input as number[]
    }
    
    const [latitude, longitude] = input as number[]

    return {
            place_name: '',
            coordinates: [latitude, longitude],
            latitude,
            longitude
    };

}

