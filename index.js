const app = require("./api/index");
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`ECG API listening on port ${port}`));
