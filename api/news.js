export default async function handler(req, res) {
  const url = `${process.env.VITE_BASE_URL}${
    req.query.endpoint
  }?${new URLSearchParams(req.query).toString()}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.VITE_API_KEY}` },
  });

  const data = await response.json();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(response.status).json(data);
}
