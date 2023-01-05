import startServer from "./server";
import connectDb from "./connectdb";

const app = startServer();

app.listen(8100, async () => {
    console.log("server started on port 8100");
    await connectDb();
    }
);

export default app;
