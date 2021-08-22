/* eslint-disable no-console */
/* eslint-disable import/extensions */
import express, { json } from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import { createServer } from 'http';
import fs from 'fs';
import { Server, Socket} from 'socket.io';
import routerProductos from './routes/productos_routes';
import productos from './models/productos';
import usuarios from './models/usuarios';
import formatoMensaje from './models/mensajes';

// Servidor
const PORT = 8080;
const app = express();

const hbs = handlebars({
  extname: 'hbs',
  defaultLayout: path.resolve(__dirname, '../views/layouts/index.hbs'),
  layoutsDir: path.resolve(__dirname, '../views/layouts'),
  partialsDir: path.resolve(__dirname, '../views/partials'),
});

app.engine('hbs', hbs);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, '../views'));

const server = createServer(app);

const io = new Server(server);

server.listen(PORT, () => {
  console.log(`Levantado en el puerto ${PORT}`);
  console.log('Creado con ts')
});

server.on('error', (err) => {
  console.error('Hubo un error:', err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(
  '/scripts',
  express.static(path.resolve(__dirname, '../node_modules/handlebars/dist'))
);

app.use(routerProductos);

// const persistencePath = path.resolve(
//   __dirname,
//   './persistence/mensajes-archivados.txt'
// );

io.on('connection', (socket: Socket) => {
  console.log(socket.id);
  socket.on('agregado-usuario', (u) => usuarios.addUsuario(socket.id, u));

  socket.on('agregado-mensaje', (m) => {
    const id = socket.id
    const usuario = usuarios.getUsuario(id).email;
    const mensaje = formatoMensaje(usuario, m);
    fs.appendFileSync(
      './persistence/mensajes-archivados.txt',
      JSON.stringify(mensaje)
    );
    io.emit('procesado-mensaje', mensaje);
  });

  socket.on('agregado-producto', (p) => {
    const producto = productos.addProducto(p.title, p.price, p.thumbnail);
    io.emit('procesado-producto', producto);
  });
});
