export enum Season {
  All = 'all',
  Fall = 'fall',
  FallInterim = 'fall_interim',
  WinterInterim = 'winter_interim',
  Winter = 'winter',
  Spring = 'spring',
  Summer = 'summer',
  FullYear = 'full_year',
}

export const translatedSeason = [
  {value: Season.All, label: 'All', key: 0},
  {value: Season.Fall, label: 'Fall', key: 1},
  {value: Season.FallInterim, label: 'Fall interim', key: 2},
  {value: Season.WinterInterim, label: 'Winter interim', key: 3},
  {value: Season.Winter, label: 'Winter', key: 4},
  {value: Season.Spring, label: 'Spring', key: 5},
  {value: Season.Summer, label: 'Summer', key: 6},
  {value: Season.FullYear, label: 'Full year', key: 7},
];
