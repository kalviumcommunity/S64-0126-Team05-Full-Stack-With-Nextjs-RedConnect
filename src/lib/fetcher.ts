const parseErrorBody = async (res: Response) => {
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
    errorBody = "";
  }

  return errorBody;
};

const fetchWithAuth = async (url: string): Promise<Response> => {
  const res = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status !== 401) {
    return res;
  }

  const refreshResponse = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!refreshResponse.ok) {
    return res;
  }

  const retryRes = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return retryRes;
};

export const fetcher = async (url: string) => {
  const res = await fetchWithAuth(url);

  if (!res.ok) {
    const errorBody = await parseErrorBody(res);

    throw new Error(
      `Failed to fetch data from ${url} (Status: ${res.status}) - ${errorBody || "Unknown error"}`
    );
  }

  return res.json();
};
