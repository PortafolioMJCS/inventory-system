import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Log from './models/Log';
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'docker'
    ? '.env.docker'
    : '.env.local'
});

const app = express();
app.use(cors());
app.use(express.json());

// conexión Mongo
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log("Mongo conectado"))
  .catch(err => console.log(err));

// endpoint raíz
app.get('/', (_req: Request, res: Response) => {
  res.send('Node funcionando');
});

// crear log
app.post('/log', async (req: Request, res: Response) => {
  try {
    const log = new Log(req.body);
    await log.save();

    res.json({ message: "Log guardado" });
  } catch (error) {
    res.status(500).json({ error: "Error guardando log" });
  }
});

// obtener logs por producto
app.get('/logs/:productId', async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const logs = await Log.find({ "data.id": Number(productId) })
      .sort({ _id: -1 });

    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo logs" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Log service corriendo en puerto ${process.env.PORT} TS`);
});