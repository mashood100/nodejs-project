import mongoose from 'mongoose';

export class TransactionService {
  static async executeTransaction(operations: Function[]) {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      for (const operation of operations) {
        await operation(session);
      }
      
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
