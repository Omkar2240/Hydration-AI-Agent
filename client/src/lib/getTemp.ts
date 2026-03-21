// export default async function getCity(lat: number, lng: number) {
//   const res = await fetch(
//     `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
//   );
//   const data = await res.json();
//   console.log(data);

//   const address = data.address.city;

//   return address;
// }

// gets the current temperature 
export default async function getTemperature(lat: number, lng: number) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
  );
  const data = await res.json();

  return data.current_weather.temperature;
}