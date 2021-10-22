import "dotenv/config";
import { serverHttp } from "./app";

serverHttp.listen(process.env.PORT || 3000, () => console.log(`🔥 Server is running on PORT ${process.env.PORT}`));