# DocumentsCompleted

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-rc.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically
reload if you change any of the source files.

## Deploying

Run `ng lint` to verify there are not any code style issues.

Run `ng test --single-run --code-coverage` to verify no code changes broke existing functionality.
Then view coverage report in `coverage/`.

Run `ng e2e` to verify the application still functions.

Run `ng github-pages:deploy --base-href /ESignSite/documents-completed/` to deploy.

Deployment is to GitHub pages at `https://stcu.github.io/ESignSite/documents-completed/`.

Ensure the Azure Function used to retrieve the completed documents, specified in
`completed-documents.service.ts`, allows CORS access from the deployment location.

