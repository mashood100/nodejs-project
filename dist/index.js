"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
// mongoose.set('strictQuery', false);
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use('/api/todos', todoRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
mongoose_1.default.connect("mongodb+srv://mashooduser1:mashooduser1@cluster0.uemlqdp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
