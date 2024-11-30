<img src="assets/logo.webp" width=100 align=left style="border-radius: 20px;">

### `GymTracker`

<br>
<br>
<br>
<br>

**GymTracker** is a personal fitness web app designed to help users stay motivated and organized in their fitness journey. Whether you're a beginner or an experienced athlete, this app makes it easy to track your workout progress, set goals, and monitor performance over time. By logging exercises, sets, repetitions, and weights, you can get a clear picture of your growth and achievements.

## Getting Started

### Prerequisies

> Node.js and npm (for running the app locally).

### Installation

1. Clone the reposity:

```bash
git clone https://github.com/lipeaaraujo/GymTracker.git
cd GymTracker
```
### Running the API

1. Open the api folder

```bash
cd gym-tracker-api
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

Copy the `.env.example` file and rename it to `.env` in the api directory.

```bash
cp .env.example .env
```

Open the `.env` file and update the placeholder values with your specific credentials and configuration.

```bash
DATABASE_URL=your_database_url
PORT=4000
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

4. Start the development server with nodemon:

```bash
nodemon src/index.js
```

### Running the App

1. Open the app folder

```bash
cd gym-tracker-api
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

Copy the `.env.example` file and rename it to `.env` in the app directory.

```bash
cp .env.example .env
```

Open the `.env` file and update the placeholder values with your specific credentials and configuration.

```bash
REACT_APP_API_URL=http://localhost:4000
```

4. Start the development server:

```bash
npm start
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m "Add YourFeature"`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.