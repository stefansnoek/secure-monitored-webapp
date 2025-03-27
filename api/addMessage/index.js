const { CosmosClient } = require("@azure/cosmos");
const client = new CosmosClient(process.env.COSMOS_CONN_STRING);

module.exports = async function (context, req) {
  const data = req.body;
  if (!data || !data.text) {
    context.res = {
      status: 400,
      body: "Verplicht veld: text"
    };
    return;
  }

  const item = {
    id: Date.now().toString(),
    text: data.text
  };

  try {
    const { resource } = await client
      .database("appdb")
      .container("messages")
      .items.create(item);

    context.res = {
      status: 201,
      body: resource
    };
  } catch (err) {
    context.log.error("Fout bij toevoegen:", err.message);
    context.res = {
      status: 500,
      body: "Er is iets misgegaan"
    };
  }
};
