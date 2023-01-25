export const countries = [
  {
    Id: 1,
    CountryName: 'INDIA'
  }
].map((item) => ({ ...item, id: item.Id, label: item.CountryName }));

export const REGION_HEADER_LABELS = {
  COUNTRY: 'Country',
  STATE: 'State',
  CITY: 'City',
  DISTRICT: 'District'
};
