export type WeatherResponse = {
  current: {
    clouds: number,
    temp: number,
    weather: Array<{
      description: string,
      icon: string,
      id: number,
      main: string,
    }>
  }
}
