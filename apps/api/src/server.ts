import app from './app.js'
const port = 8000

const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`✅ Server listening on port: ${port}`)
    })
  } catch (err) {
    console.error("❌ Server failed to start:", err);
    process.exit(1);
  }
}

startServer()