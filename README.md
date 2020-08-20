# Angular Starter

## Features

Pages:

-   Login
-   Register
-   Confirm account
-   Forgot password
-   Edit profile, password, picture
-   List all users (see user information, delete user)
-   404 Not found
-   503 Unavailable

Services, pipes, guards:

-   Api (GET, POST, PATCH, DELETE request json or formData)
-   Toast (info, success, warning, error toast with translation)
-   Errors handler (catch errors from backend and show alert with/without redirection/logout)
-   Session (current user)
-   Storage (local storage)
-   Translate (detect default language, keep selected language, pipe)
-   Events publisher
-   Pipe local date (handle language wording of dates)
-   Connected guard, admin guard
-   Modal (text or component, with action & cancel button)

Components:

-   Loader (loader singleton if many requests)
-   Spinner (with label if no result)
-   Input text with label, icon, required, disabled, pattern, min/max length, error messages (type: text, email, password, textarea, checkbox)
-   Input file with label, icon, required, disabled, extensions check, size check, error messages
-   ❌ Select
-   Menu

Divers:

-   Lazy loading
-   Integration (grids, variables,...)
-   Handle differents environments (local, dev, staging, prod)
-   Alias for imports
-   Extract keys to translate in all files (ngx-translate-extract)
-   Check commit convention before commit (husky)
-   CI (Jira flow, deploy, env by feature, ❌ code quality,...)

## Commands

### Serve

| Environment     | Command               | API URL                                                         |
| --------------- | --------------------- | --------------------------------------------------------------- |
| **local**       | `ng serve -c local`   | <http://localhost:3000> |
| **development** | `ng serve -c dev`     | <http://localhost:3000> |
| **staging**     | `ng serve -c staging` | <http://localhost:3000> |
| **production**  | `ng serve -c prod`    | <http://localhost:3000> |

### Build

| Environment     | Command                 | API URL                                                         |
| --------------- | ----------------------- | --------------------------------------------------------------- |
| **development** | `yarn build -c dev`     | <http://localhost:3000> |
| **staging**     | `yarn build -c staging` | <http://localhost:3000> |
| **production**  | `yarn build -c prod`    | <http://localhost:3000> |

### Clean

`ng lint --fix`

### Export translation

`yarn translations`

On Windows you must specify each output destination individually:

in **package.json** :

```json
"scripts": {
  ...
  "translations": "ngx-translate-extract --output ./src/assets/i18n/en.json ..."
}
```

ngx-translate-extract --input ./src --output ./src/i18n/da.json ./src/i18n/en.json

## Alias

in **tsconfig.json** :

```json
"compilerOptions" : {
  ...
  "paths": {
    "@newAlias/*": [ "pathToFolder/*" ],
  }
}
```
