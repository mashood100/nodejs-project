import express from 'express';
import EWeLink from 'ewelink-api';

const app = express();
app.use(express.json());

// Initialize eWeLink connection with getRegion
const initConnection = async () => {
  try {
    // Create connection directly without temp connection
    const connection = new EWeLink({
      email: 'nadim.khoury@arkenergy.ae',
      password: 'nadim@nadim',
      region: 'as',
      APP_ID: '1ohP6aE9RknXINoiy548T9c2XkUc9xhi',
      APP_SECRET: '9mBlZJdxzH5lBJrFnvOQP3f2T0x5wf3J'
    }as any);
    
    return connection;
  } catch (error) {
    console.error('Connection initialization error:', error);
    throw error;
  }
};

// Test route to make sure Express is working
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Devices route
app.get('/devices', async (req, res) => {
  try {
    const connection = await initConnection();
    
    const devices = await connection.getDevices();
    console.log(devices);
    res.json(devices);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch devices' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
