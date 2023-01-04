import startServer from "./server";
import connectDb from "./connectdb";

const app = startServer();

app.listen(8101, async () => {
    console.log("server started on port 8101");
    await connectDb();
    }
);

export default app;
