import jsonServer from 'json-server';
import auth from 'json-server-auth';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.db = router.db; 

server.use(auth);

server.use(router);

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
