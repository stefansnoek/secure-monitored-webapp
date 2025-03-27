const { CosmosClient } = require("@azure/cosmos");
const client = new CosmosClient(process.env.COSMOS_CONN_STRING);

module.exports = async function (context, req) {
  const items = await client.database("appdb").container("messages").items.readAll().fetchAll();
  context.res = { body: items.resources };
};
