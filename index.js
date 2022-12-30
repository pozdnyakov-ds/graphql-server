const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const app = express();

// import { LogRocket } from 'logrocket';
// LogRocket.init('qrkcfp/graphql-server');
// LogRocket.identify('2903015@gmail.com', {
//     name: 'Dmitry Pozdnyakov',
//     email: '2903015@gmail.com'
//   });

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));
app.listen(2020, () => {
    console.log('now listening at port 2020');
});