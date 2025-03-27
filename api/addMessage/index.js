const { CosmosClient } = require("@azure/cosmos");
const client = new CosmosClient(process.env.COSMOS_CONN_STRING);

module.exports = async function (context, req) {
  context.log("addMessage functie gestart");

  if (!req.body || !req.body.text) {
    context.res = {
      status: 400,
      body: "❗ 'text' is verplicht in JSON body"
    };
    return;
  }

  const item = {
    id: Date.now().toString(),
    text: req.body.text
  };

  try {
    context.log("Proberen te schrijven naar Cosmos...");
    const { resource } = await client
      .database("appdb")
      .container("messages")
      .items.create(item);

    context.res = {
      status: 201,
      body: resource
    };
  } catch (err) {
    context.log.error("❌ Fout bij toevoegen:", err.message);
    context.res = {
      status: 500,
      body: "❌ Er is iets misgegaan: " + err.message
    };
  }
};
