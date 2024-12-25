const { MongoClient } = require("mongodb");

let dbClient;

const connectToDatabase = async () => {
    const mongoURI = process.env.MONGOURI;
    const poolSize = parseInt(process.env.MONGO_POOL_SIZE, 10) || 5;

    try {
        const client = new MongoClient(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: poolSize,
        });

        await client.connect();
        console.log("Connected to MongoDB!");

        dbClient = client; // Save client globally for reuse
        return client.db(); // Return the database object for operations
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
};

const getDatabaseClient = () => {
    if (!dbClient) {
        throw new Error("Database not initialized. Call connectToDatabase first.");
    }
    return dbClient;
};

// Graceful Shutdown
const gracefulExit = () => {
    if (dbClient) {
        dbClient.close(() => {
            console.log("MongoDB connection closed through app termination.");
            process.exit(0);
        });
    }
};

process.on("SIGINT", gracefulExit).on("SIGTERM", gracefulExit);

module.exports = { connectToDatabase, getDatabaseClient };
