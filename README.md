# Weather MCP Server

    An MCP server providing weather information for cities around the world with search functionality.

    ## Features

    - Get current weather for specific cities
    - Search cities by partial name match
    - List all available cities
    - Get multi-day weather forecasts
    - Integration with MCP Inspector for testing

    ## Getting Started

    1. Install dependencies:
       ```
       npm install
       ```

    2. Run the server:
       ```
       npm run dev
       ```

    3. Test with MCP Inspector:
       ```
       npm run inspect
       ```

    ## Available Tools

    - `get_weather`: Get current weather for a specific city
    - `search_cities`: Search for cities by partial name match
    - `list_cities`: List all available cities in the database
    - `get_forecast`: Get a multi-day weather forecast for a city

    ## Available Resources

    - `weather://{city}`: Get weather information for a specific city
