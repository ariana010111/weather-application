export interface WeatherUniqueQuery {
  cityName: string,
  tempType: string
}
export interface WeatherQueryModel extends QueryBase {
  filters: WeatherUniqueQuery

}

export interface QueryBase {
  appid: 'd1bb445f4030f9cc7a8cd9e1f6fd8a9b'
}
