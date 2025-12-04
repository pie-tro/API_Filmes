import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
}));

mongoose.connect(process.env.MONGODB_URI, { dbName: 'Filmes' })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro na conexão:', err.message));
  
const filmeSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true, minlength: 1 },
    genero: { type: String, required: true, trim: true },
    ano_lancamento: { type: Number, required: true, min: 1880, max: 2100 },
    duracao_minutos: { type: Number, required: true, min: 1 },
    classificacao_indicativa: { type: Number, required: true, min: 0, max: 18 },
    assistido: { type: Boolean, default: false }
  },
  { collection: 'filmes', timestamps: true }
);

const Filme = mongoose.model('Filme', filmeSchema, 'Filmes');

app.get('/', (req, res) => res.json({ msg: 'API de Filmes rodando' }));

app.post('/filmes', async (req, res) => {
  try {
    const filme = await Filme.create(req.body);
    res.status(201).json(filme);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/filmes', async (req, res) => {
  const filmes = await Filme.find();
  res.json(filmes);
});

app.get('/filmes/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).json({ error: 'ID inválido' });

    const filme = await Filme.findById(req.params.id);
    if (!filme) return res.status(404).json({ error: 'Filme não encontrado' });

    res.json(filme);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/filmes/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).json({ error: 'ID inválido' });

    const filme = await Filme.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, 
      { new: true, runValidators: true }
    );

    if (!filme) return res.status(404).json({ error: 'Filme não encontrado' });

    res.json(filme);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/filmes/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).json({ error: 'ID inválido' });

    const filme = await Filme.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!filme) return res.status(404).json({ error: 'Filme não encontrado' });

    res.json(filme);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/filmes/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).json({ error: 'ID inválido' });

    const filme = await Filme.findByIdAndDelete(req.params.id);
    if (!filme) return res.status(404).json({ error: 'Filme não encontrado' });

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Servidor rodando em http://localhost:${process.env.PORT}`)
);

const diretorSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true, minlength: 1 },
    nacionalidade: { type: String, required: true, trim: true },
    data_nascimento: { type: Date, required: true },
    estilo: { type: String, required: true, trim: true },
    ativo: { type: Boolean, default: true }
  },
  { collection: 'diretor', timestamps: true }
);

const Diretor = mongoose.model('Diretor', diretorSchema, 'Diretores');

app.post('/diretor', async (req, res) => {
  try {
    const diretor = await Diretor.create(req.body);
    res.status(201).json(diretor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/diretor', async (req, res) => {
  const diretores = await Diretor.find();
  res.json(diretores);
});

app.get('/diretor/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).json({ error: 'ID inválido' });

    const diretor = await Diretor.findById(req.params.id);
    if (!diretor) return res.status(404).json({ error: 'Diretor não encontrado' });

    res.json(diretor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/diretor/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).json({ error: 'ID inválido' });

    const diretor = await Diretor.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!diretor) return res.status(404).json({ error: 'Diretor não encontrado' });

    res.json(diretor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/diretor/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).json({ error: 'ID inválido' });

    const diretor = await Diretor.findByIdAndDelete(req.params.id);
    if (!diretor) return res.status(404).json({ error: 'Diretor não encontrado' });

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
