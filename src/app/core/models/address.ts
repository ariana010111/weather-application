export interface IAddress {
  lat: number;
  lng: number;
  city: string;
  zip: string;
  country: string;
  streetNumber: string;
  street?: any;
  county: string;
  state: State;
}
interface State {
  name: string;
  code: string;
}
