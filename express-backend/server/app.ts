import express, { Request, Response } from 'express';
import userRoutes from '../route/route';

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Restaurant Management App');
});

app.get('/health', (req: Request, res: Response) => {
    res.send('healthy');
});

export default app;
