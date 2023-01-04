import { sequelize } from "./sequelize";
import { V0_FEED_MODELS } from "./controllers/v0/model.index";

async function connectDb () {
    await sequelize.addModels(V0_FEED_MODELS);

    console.debug("Initialize database connection...");
    
    await sequelize.sync();
}

export default connectDb;