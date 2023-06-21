
# Book Search App

This is a book search application built with React and Apollo Server, allowing users to search for books using keywords and save their favorite books for future reference. The app has been refactored from a REST API to a GraphQL/Apollo Server implementation for improved performance and flexibility.

## Features

- Search books by keyword: Users can enter keywords in the search bar to find books related to their interests.
- Book details: Clicking on a book from the search results will display more information about the selected book, including its title, author, description, and cover image.
- User authentication: Users can sign up or log in to access additional features like saving books.
- Save books: Logged-in users can save books to their personal collection for later reference.
- Saved books page: Users can view their saved books on a separate page.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Apollo Server: A GraphQL server implementation that works seamlessly with Apollo Client.
- GraphQL: A query language for APIs that enables efficient data fetching and flexible data queries.
- Google Book Search API: An API provided by Google that allows searching and retrieving book information.

## Refactoring to GraphQL/Apollo Server

The app has been refactored to leverage GraphQL and Apollo Server, offering several benefits such as:

- Reduced data over-fetching: With GraphQL, you can specify exactly what data you need, avoiding unnecessary network traffic and reducing the payload size.
- Efficient batched requests: GraphQL allows you to batch multiple queries into a single request, minimizing the number of API calls required.
- Flexible queries: GraphQL's flexible nature enables clients to request data in a structure that matches their specific needs, eliminating the problem of over-fetching or under-fetching data.
- Real-time updates: Using subscriptions in GraphQL, you can easily enable real-time updates to keep the UI in sync with the server's data.

## Setup and Installation

1. Clone the repository: `git clone https://github.com/Anthony-A-Perez/bookSearch.git`
2. Navigate to the project directory: `cd booksearch`
3. Install dependencies: `npm install`
4. Set up the environment variables: Create a `.env` file in the root directory and provide the necessary environment variables.
5. Start the development server: `npm start`
6. Open your browser and visit `http://localhost:3000` to access the application.

Note: Make sure you have the required API credentials and update the environment variables accordingly.

## Configuration

In order to use the Google Book Search API and enable user authentication, you need to set up the following environment variables:

- `GOOGLE_BOOKS_API_KEY`: Your API key for accessing the Google Book Search API.
- `DATABASE_URL`: The connection URL for your database.
- `JWT_SECRET`: A secret key used for signing JSON Web Tokens (JWT) to authenticate users.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to submit a pull request.

## Deployment

<https://booksearch-ap-51482f35aef6.herokuapp.com/>

## Repository

<https://github.com/Anthony-A-Perez/bookSearch>
