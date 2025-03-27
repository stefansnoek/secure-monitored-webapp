const { CosmosClient } = require("@azure/cosmos");
const client = new CosmosClient(process.env.COSMOS_CONN_STRING);

module.exports = async function (context, req) {
  try {
    const { resources } = await client
      .database("appdb")
      .container("messages")
      .items.readAll()
      .fetchAll();

    context.res = {
      status: 200,
      body: resources
    };
  } catch (err) {
    context.log.error("Fout bij ophalen:", err.message);
    context.res = {
      status: 500,
      body: "Fout bij ophalen van data"
    };
  }
};
