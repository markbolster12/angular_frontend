# --- build stage ---
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- runtime stage ---
FROM nginx:1.27-alpine AS runtime

COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist/first-app/browser /usr/share/nginx/html

# Where the backend is reachable from inside this container — override at `docker run`
# (-e BACKEND_HOST=... -e BACKEND_PORT=...) or via the k8s Deployment's env, see
# devops/frontend/deployment.yaml. Defaults match the backend's in-cluster Service name.
ENV BACKEND_HOST=goalsapp
ENV BACKEND_PORT=8080

EXPOSE 80
