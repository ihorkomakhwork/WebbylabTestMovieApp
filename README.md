## Getting Started

Run the container:
```bash
docker run -p 8000:8050 -e APP_PORT=8050  komigor/movies
```

## Architecture explanation
. The key project components and their responsibilities are:

-   **Controllers (`src/controllers`)**: Handle incoming HTTP requests, process input, interact with services, and send back HTTP responses. They act as the entry point for API requests. Now It'also contain the business logic of the application.
- - Main is `src/controllers/movies.ts` thats worsks wirh movie entity CRUD operations, import by file. etc


-   **Models (`src/models`)**: Define the data structures and relationships using Sequelize ORM. Each model corresponds to a table in the database and encapsulates data validation and database interactions.

-   **Routes (`src/routes`)**: Define the API endpoints and map them to the appropriate controller functions. This layer is responsible for routing HTTP requests to the correct handlers.

-   **Middleware (`src/middleware`)**: Functions that have access to the request and response objects, and the next middleware function in the application’s request-response cycle. They are used for tasks like authentication, error handling, and logging.
- - `src/middleware/authMiddleware.ts` is used for authentication check.

- - `src/middleware/errorHendlerMiddleware.ts` is used for centralized error handlig. 

-   **Utilities (`src/utils`)**: Provide helper functions and common utilities used across the application, such as database connection setup (`db.ts`), cryptographic functions (`crypto.ts`),Constant's(`constants`) ,and logging instance (`logger.ts`). 

Stack is:
-   Node.js
-   Express.js
-   Sequelize ORM
-   SQLite
-   Docker
-   TypeScript
-   Pino(logger)
-   JWT Auth
-   Bcrypt
-   ESLint
-   Prettier