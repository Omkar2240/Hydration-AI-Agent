const DEV_BACKEND_URL = "http://localhost:8000";

export default function getBackendBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.trim();

  if (envUrl) {
    return envUrl.replace(/\/+$/, "");
  }

  if (process.env.NODE_ENV !== "production") {
    return DEV_BACKEND_URL;
  }

  throw new Error("NEXT_PUBLIC_BACKEND_URL is required in production.");
}
