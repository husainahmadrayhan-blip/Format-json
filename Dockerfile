FROM node:22-bookworm-slim AS frontend
WORKDIR /app
COPY . ./
RUN npm ci --no-audit --no-fund
# React source is uploaded directly to the repository root.
RUN test -f main.jsx && test -f style.css && test -f office-logic.js && test -f office-presets.json && test -f source-groups.js
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
