import { app } from "./application/express/express";
import { getBackendPort } from "./environment";

const port = getBackendPort();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
