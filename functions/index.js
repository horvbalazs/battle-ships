const functions = require('firebase-functions');
const pluralize = require('pluralize')
const jsonServer = require('json-server')

const main = jsonServer.create();
const api = jsonServer.create();
const router = jsonServer.router('db.json', { foreignKeySuffix: 'Id' });
const middlewares = jsonServer.defaults();

router.render = function (req, res) {
  const path = req.url.replace(/\/$/, '');
  const resourceName = path.split('/')[1];
  const last = path.split('/').pop();
  const statusCode = res.statusCode;
  const json = {};

  if (statusCode < 400) {
    const key = resourceName === last ? resourceName : pluralize.singular(resourceName);
    json[key] = res.locals.data;
  }
  json.status = { code: statusCode };

  res.jsonp(json);
}

api.use(middlewares)
api.use(jsonServer.rewriter({
  "/:resource/:id/show": "/:resource/:id",
  "/posts/:category": "/posts?category=:category",
  "/articles\\?id=:id": "/posts/:id"
}))
api.use(router)

main.use('/api', api)

exports.main = functions.https.onRequest(main)
