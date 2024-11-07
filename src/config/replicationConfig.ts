import mongoose from 'mongoose';

const replicaSetConfig = {
  replicas: [
    'mongodb://primary:27017',
    'mongodb://secondary1:27017',
    'mongodb://secondary2:27017'
  ],
  replicaSet: 'todoReplicaSet'
};

export const connectReplicaSet = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      replicaSet: replicaSetConfig.replicaSet,
      readPreference: 'secondary'
    });
    console.log('Connected to MongoDB replica set');
  } catch (error) {
    console.error('Replica set connection error:', error);
  }
};
