FROM node:22-bookworm-slim AS frontend
WORKDIR /app
COPY . ./
RUN npm ci --no-audit --no-fund
# GitHub web uploads may flatten src/ into repository root.
RUN if [ ! -f src/main.jsx ]; then mkdir -p src && for file in main.jsx style.css office-logic.js office-presets.json source-groups.js; do if [ -f "$file" ]; then mv "$file" src/; fi; done; fi \
    && test -f src/main.jsx \
    && test -f src/office-logic.js \
    && test -f src/source-groups.js
RUN npm run build

FROM python:3.12-slim
ENV DEPLOY_MODE=1 PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY --from=frontend /app/dist/ ./dist/
COPY *.py BDRIS_MASTER_GEO.json ./
USER nobody
CMD ["python", "-u", "server.py"]
