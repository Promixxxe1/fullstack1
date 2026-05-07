import cron from "node-cron";
import axios from "axios";

// Run every 1 minute
cron.schedule("* * * * *", async () => {
  console.log("⏰ Running cron job:", new Date().toLocaleString());

  try {
    const response = await axios.get(
      "https://forever-backend-499s.onrender.com",
    );

    console.log("✅ Server refreshed successfully");
    console.log("Status:", response.status);
  } catch (error) {
    console.error("❌ Error refreshing server:");
    console.error(error.message);
  }
});

console.log("🚀 Cron job started...");
