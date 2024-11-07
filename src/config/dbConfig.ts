import mongoose from 'mongoose';
const shardConfig = {
    shard0: "mongodb://shard1:27017/todos",
    shard1: "mongodb://shard2:27017/todos",
    shard2: "mongodb://shard3:27017/todos"
  };
  




// export const connectShardedDB = async () => {
//     try {
//       await mongoose.connect(process.env.MONGODB_URI!, {

//       });
//       console.log('Connected to sharded MongoDB cluster');
//     } catch (error) {
//       console.error('Sharded DB connection error:', error);
//     }
//   };
  