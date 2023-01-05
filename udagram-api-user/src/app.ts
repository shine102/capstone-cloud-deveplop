import startServer from "./server";
import connectDb from "./connectdb";

const app = startServer();

app.listen(8080, async () => {
    console.log("server started on port 8080");
    await connectDb();
    }
);

export default app;
