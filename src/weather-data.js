// Mock weather data for various cities
    export const cities = {
      "new york": { temp: 72, condition: "Partly Cloudy", humidity: 65, country: "USA" },
      "london": { temp: 62, condition: "Rainy", humidity: 80, country: "UK" },
      "tokyo": { temp: 85, condition: "Sunny", humidity: 70, country: "Japan" },
      "sydney": { temp: 70, condition: "Clear", humidity: 55, country: "Australia" },
      "paris": { temp: 68, condition: "Cloudy", humidity: 75, country: "France" },
      "berlin": { temp: 65, condition: "Overcast", humidity: 72, country: "Germany" },
      "rome": { temp: 78, condition: "Sunny", humidity: 60, country: "Italy" },
      "madrid": { temp: 82, condition: "Clear", humidity: 45, country: "Spain" },
      "moscow": { temp: 45, condition: "Snowy", humidity: 85, country: "Russia" },
      "dubai": { temp: 95, condition: "Hot", humidity: 40, country: "UAE" },
      "singapore": { temp: 88, condition: "Thunderstorms", humidity: 90, country: "Singapore" },
      "cairo": { temp: 90, condition: "Sunny", humidity: 30, country: "Egypt" },
      "rio de janeiro": { temp: 80, condition: "Partly Cloudy", humidity: 75, country: "Brazil" },
      "toronto": { temp: 60, condition: "Cloudy", humidity: 70, country: "Canada" },
      "mexico city": { temp: 75, condition: "Partly Cloudy", humidity: 55, country: "Mexico" }
    };

    // Function to find cities by partial name match
    export function findCities(query) {
      if (!query) return [];
      
      const queryLower = query.toLowerCase();
      const matches = [];
      
      for (const city in cities) {
        if (city.includes(queryLower)) {
          matches.push({
            name: city,
            ...cities[city]
          });
        }
      }
      
      return matches;
    }
