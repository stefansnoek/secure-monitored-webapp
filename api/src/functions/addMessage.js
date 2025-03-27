const { CosmosClient } = require("@azure/cosmos");
const client = new CosmosClient(process.env.COSMOS_CONN_STRING);

module.exports = async function (context, req) {
  const data = req.body;
  if (!data.text) return context.res = { status: 400, body: "text verplicht" };

  const item = { id: Date.now().toString(), text: data.text };
  await client.database("appdb").container("messages").items.create(item);
  context.res = { status: 201, body: item };
};
