import mongoose from 'mongoose';

declare global {
  let mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private isConnected: boolean = false;

  private constructor() {
    // Constructor privado para Singleton
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async connect(): Promise<typeof mongoose> {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable');
    }

    try {
      if (this.isConnected) {
        console.log('Using existing database connection');
        return mongoose;
      }

      const connection = await mongoose.connect(MONGODB_URI, {
        bufferCommands: false
      });

      this.isConnected = true;
      console.log('Database connected successfully');
      return connection;
    } catch (error) {
      console.error('Error connecting to database:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return;
    }

    try {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log('Database disconnected successfully');
    } catch (error) {
      console.error('Error disconnecting from database:', error);
      throw error;
    }
  }
}

// Exportar una función helper para usar el singleton
export async function connectDB(): Promise<typeof mongoose> {
  const db = DatabaseConnection.getInstance();
  return await db.connect();
}

export async function disconnectDB(): Promise<void> {
  const db = DatabaseConnection.getInstance();
  return await db.disconnect();
}
