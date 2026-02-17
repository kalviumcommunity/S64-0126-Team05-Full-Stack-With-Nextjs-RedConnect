import Cookies from "js-cookie";

export const fetcher = async (url: string) => {
  const token = Cookies.get("auth_token");
  
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    let errorBody = "";
    const contentType = res.headers.get("content-type");
    
    try {
      if (contentType?.includes("application/json")) {
        const errorData = await res.json();
        errorBody = errorData.error || errorData.message || "";
      } else {
        errorBody = await res.text();
      }
    } catch {
      // If parsing fails, use generic error
      errorBody = "";
    }

    throw new Error(
      `Failed to fetch data from ${url} (Status: ${res.status}) - ${errorBody || "Unknown error"}`
    );
  }

  return res.json();
};
