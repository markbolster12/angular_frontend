# --- build stage ---
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
# npm ci enforces a byte-exact lockfile match, but this lockfile was generated on macOS —
# its optional/native deps (esbuild, lightningcss, etc.) don't cover Alpine's musl libc, so
# ci fails here even though the lockfile is fine on the host. npm install resolves whatever
# this platform actually needs; node_modules from this stage never ships (multi-stage build).
RUN npm install

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

# Makes nginx's stock entrypoint export NGINX_LOCAL_RESOLVERS (read from this container's
# own /etc/resolv.conf, i.e. the cluster's real DNS) for the `resolver` directive in
# nginx/default.conf.template — see the comment there for why this matters.
ENV NGINX_ENTRYPOINT_LOCAL_RESOLVERS=1

EXPOSE 80
