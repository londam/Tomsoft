export default async function fetchDataFromServer(endpoint: string) {
  const apiUrl = import.meta.env.VITE_LUCEED_API_URL;
  const username = import.meta.env.VITE_LUCEED_USERNAME;
  const password = import.meta.env.VITE_LUCEED_PASSWORD;

  const apiUrlFinal = `${apiUrl}/${endpoint}`;

  try {
    const response = await fetch(apiUrlFinal, {
      method: "GET",
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.result[0];
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
}
