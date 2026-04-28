const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// conexión Mongo
mongoose.connect("mongodb://mongo:27017/logs")
  .then(() => console.log("Mongo conectado"))
  .catch(err => console.log(err));

// modelo
const LogSchema = new mongoose.Schema({
  action: String,
  user: String,
  data: Object,
  created_at: { type: Date, default: Date.now }
});

const Log = mongoose.model("Log", LogSchema);

// endpoint raíz
app.get('/', (req, res) => {
  res.send('Node funcionando');
});

// ?? endpoint real de logs
app.post('/log', async (req, res) => {
  try {
    const log = new Log(req.body);
    await log.save();
    res.json({ message: "(Log guardado) " });
  } catch (error) {
    res.status(500).json({ error: "Error guardando log" });
  }
});

app.get('/logs/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const logs = await Log.find({ "data.id": Number(productId) })
      .sort({ _id: -1 });

    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo logs" });
  }
});

app.listen(3001, () => {
  console.log("Log service corriendo en 3001");
});