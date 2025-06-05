# username checker

## Description

username checker is a web application designed to check public repo by owner username. The app provides a simple interface and ui interactive.

## Tech Stack

- **Main Tech:** React.js, axios (for fetch)
- **Styling:** Tailwindcss
- **Testing:** vitest

## How to Run

1. **Clone the repository:**

```bash
git clone https://github.com/fadilkun45/username-checker.git
```

2. **Start the App:**

```bash
bun install
bun run dev
```

3. Open your browser and go to `http://localhost:5173`.

## Run Tests

for testing you can use run

```bash
bunx vitest
```

## API Documentation

This application uses the [GitHub REST API](https://docs.github.com/en/rest) to fetch public repositories by username.

### Endpoint Used

```
GET https://api.github.com/users/{username}/repos
```

- Replace `{username}` with the GitHub username you want to check.
- Returns a list of public repositories for the specified user.

### Example Request

```bash
curl https://api.github.com/users/octocat/repos
```

### Example Response

```json
[
  {
    "id": 1296269,
    "name": "Hello-World",
    "full_name": "octocat/Hello-World",
    "html_url": "https://github.com/octocat/Hello-World",
    ...
  },
  ...
]
```

For more details, see the [GitHub API documentation](https://docs.github.com/en/rest/reference/repos#list-repositories-for-a-user).
