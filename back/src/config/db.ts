import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"
import { Property } from "../controllers/Property"
import { User } from "../controllers/Users"
import { Reservation } from "../controllers/reservations"

dotenv.config()


const db = new Sequelize("postgresql://neondb_owner:npg_O5kPbglLHT0p@ep-wild-paper-a83t1kqd-pooler.eastus2.azure.neon.tech/neondb?sslmode=require", {
  models: [User, Property, Reservation],
  logging: console.log,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
})

export default db
