const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

router.render = (req, res) => {
  let data = res.locals.data

//  DIRTY way to filter for NULL value for "ended" property.
    if (req._parsedOriginalUrl.query) {
    let queries = req._parsedOriginalUrl.query.split('&')
      if (queries[queries.length - 1] === "ended_is_null") {
        console.log("has the query");
        return res.send(data.filter(d => !d.ended));
      }
    }
  res.send(data)
};

server.use(router);

server.listen(3000, () => {
  console.log("JSON server running on port 3000");
});
