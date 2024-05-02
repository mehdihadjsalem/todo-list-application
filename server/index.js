const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8888;
const { createYoga, createSchema } = require('graphql-yoga');
const { schema, resolvers } = require('./graphql/graphQL.js');


const cors = require('cors')
const bodyParser = require('body-parser');

async function runServer() {
  await mongoose.connect("mongodb://localhost:27017/todolistt")
}
runServer()

app.use(express.json());
app.use(cors())

app.use(bodyParser.json({ limit: "50mb", extended: false }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));

const yoga = createYoga({
  schema: createSchema({
    typeDefs: schema,
    resolvers
  })
})

app.use('/graphql', yoga)

app.listen(port, () => {
  console.log(`server running on port ${port}...`)
});

