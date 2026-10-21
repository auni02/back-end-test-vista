// Kena line PERTAMA, load .env dulu sebelum sesiapa baca process.env. Letak bawah sikit, confirm undefined
import "dotenv/config";
import app from "./app";

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});