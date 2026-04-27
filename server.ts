import { createServer } from "http";
import next from "next";
const dev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT;

const app = next({ dev });
declare global {
  namespace NodeJS {
    interface Process {
      noDeprecation?: boolean;
    }
  }
}

if (dev) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
  process.noDeprecation = true;
}

const handle = app.getRequestHandler();


app.prepare().then(() => {
  const server = createServer( async (req, res) => {
    try {
      await handle(req, res);
    } catch (err) {
      console.error("Next.js handle error:", err);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    }
  });



  server.listen(PORT, () => {
    console.log(`🔒 Server running at https://localhost:${PORT}`);
  });
});
