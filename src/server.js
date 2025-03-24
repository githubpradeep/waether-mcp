import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
    import { z } from 'zod';
    import { cities, findCities } from './weather-data.js';

    // Create an MCP server for weather information
    const server = new McpServer({
      name: "Weather Service",
      version: "1.0.0",
      description: "An MCP server providing weather information for cities around the world"
    });

    // Add a weather resource to get weather by city
    server.resource(
      "weather", 
      new ResourceTemplate("weather://{city}", { list: undefined }),
      async (uri, { city }) => {
        const cityLower = city.toLowerCase();
        if (!cities[cityLower]) {
          return {
            contents: [{
              uri: uri.href,
              text: `Weather information for ${city} not found.`
            }]
          };
        }
        
        const data = cities[cityLower];
        return {
          contents: [{
            uri: uri.href,
            text: `Weather in ${city.charAt(0).toUpperCase() + city.slice(1)} (${data.country}):
Temperature: ${data.temp}°F
Condition: ${data.condition}
Humidity: ${data.humidity}%`
          }]
        };
      }
    );
    
    // Add a "get weather" tool
    server.tool(
      "get_weather",
      { city: z.string().describe("The name of the city to get weather for") },
      async ({ city }) => {
        const cityLower = city.toLowerCase();
        if (!cities[cityLower]) {
          return {
            content: [{ 
              type: "text", 
              text: `Weather information for ${city} not found.` 
            }],
            isError: true
          };
        }
        
        const data = cities[cityLower];
        return {
          content: [{ 
            type: "text", 
            text: `Weather in ${city.charAt(0).toUpperCase() + city.slice(1)} (${data.country}):
Temperature: ${data.temp}°F
Condition: ${data.condition}
Humidity: ${data.humidity}%` 
          }]
        };
      },
      { description: "Get current weather information for a specific city" }
    );

    // Add a "list cities" tool
    server.tool(
      "list_cities",
      {},
      async () => ({
        content: [{ 
          type: "text", 
          text: `Available cities: ${Object.keys(cities).map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ')}` 
        }]
      }),
      { description: "List all available cities in the weather database" }
    );

    // Add a "search cities" tool
    server.tool(
      "search_cities",
      { query: z.string().describe("Partial name of the city to search for") },
      async ({ query }) => {
        const matches = findCities(query);
        
        if (matches.length === 0) {
          return {
            content: [{ 
              type: "text", 
              text: `No cities found matching "${query}".` 
            }]
          };
        }
        
        const citiesList = matches.map(city => 
          `${city.name.charAt(0).toUpperCase() + city.name.slice(1)} (${city.country}): ${city.temp}°F, ${city.condition}`
        ).join('\n');
        
        return {
          content: [{ 
            type: "text", 
            text: `Cities matching "${query}":\n${citiesList}` 
          }]
        };
      },
      { description: "Search for cities by partial name match" }
    );

    // Add a "get forecast" tool (mock data)
    server.tool(
      "get_forecast",
      { 
        city: z.string().describe("The name of the city to get forecast for"),
        days: z.number().min(1).max(7).default(3).describe("Number of days for forecast (1-7)")
      },
      async ({ city, days }) => {
        const cityLower = city.toLowerCase();
        if (!cities[cityLower]) {
          return {
            content: [{ 
              type: "text", 
              text: `Weather information for ${city} not found.` 
            }],
            isError: true
          };
        }
        
        const data = cities[cityLower];
        const forecast = [];
        
        // Generate mock forecast data
        for (let i = 0; i < days; i++) {
          const tempVariation = Math.floor(Math.random() * 10) - 5;
          forecast.push({
            day: i + 1,
            temp: data.temp + tempVariation,
            condition: ["Sunny", "Cloudy", "Rainy", "Partly Cloudy", "Clear"][Math.floor(Math.random() * 5)]
          });
        }
        
        const forecastText = forecast.map(day => 
          `Day ${day.day}: ${day.temp}°F, ${day.condition}`
        ).join('\n');
        
        return {
          content: [{ 
            type: "text", 
            text: `${days}-day forecast for ${city.charAt(0).toUpperCase() + city.slice(1)} (${data.country}):\n${forecastText}` 
          }]
        };
      },
      { description: "Get a multi-day weather forecast for a specific city" }
    );

    export { server };
