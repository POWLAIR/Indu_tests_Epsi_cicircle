# Next.js + Jest

This example shows how to configure Jest to work with Next.js.

This includes Next.js' built-in support for Global CSS, CSS Modules and TypeScript. This example also shows how to use Jest with the App Router and React Server Components.

> **Note:** Since tests can be co-located alongside other files inside the App Router, we have placed those tests in `app/` to demonstrate this behavior (which is different than `pages/`). You can still place all tests in `__tests__` if you prefer.

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-jest&project-name=with-jest&repository-name=with-jest)

## How to Use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example with-jest with-jest-app
```

```bash
yarn create next-app --example with-jest with-jest-app
```

```bash
pnpm create next-app --example with-jest with-jest-app
```

## Running Tests

```bash
npm test
```

```bash
yarn test
```

```bash
pnpm test
```

## Docker Support

### Using Docker Compose (Recommended)

To run the application in development mode with hot reload:

```bash
docker compose up app
```

To run the tests:

```bash
docker compose run test
```

To run in production mode:

```bash
docker compose up prod
```

To stop all containers:

```bash
docker compose down
```

### Using Docker Directly

To build the Docker image for development:

```bash
docker build --target development -t nextjs-jest-app:dev .
```

To build the Docker image for production:

```bash
docker build --target production -t nextjs-jest-app:prod .
```

### Running the Container

For development (with hot reload):

```bash
docker run -p 3000:3000 -v $(pwd):/app nextjs-jest-app:dev npm run dev
```

For production:

```bash
docker run -p 3000:3000 nextjs-jest-app:prod
```

### Running Tests in Docker

```bash
docker run nextjs-jest-app:dev npm test
```

The application uses a multi-stage Dockerfile with three stages:

- `development`: For development and testing with all dependencies
- `builder`: For building the application
- `production`: Optimized production image with minimal dependencies

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).
