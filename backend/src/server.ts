import express,{ Request , Response} from "express"
import { connectDB } from "../database/database"
import cookieParser from "cookie-parser"
import routes from "../routes";
import cors from "cors";

const port = 8080;
const app = express()

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
    methods: ['GET','POST','PATCH'],
    allowedHeaders: ["Content-Type","Authorization"]
}))

app.use(express.json())
app.use(cookieParser());
app.use("/api", routes);

// testing
app.get('/',(req:Request, res:Response)=>{
    res.send("Express + Typescript server")
})
app.listen(port, () => {
    try{
     console.log(`Server running at http://localhost:${port}`);
        connectDB();
    }catch(error){
        console.log("Failed to run the server" , error);
    }
})
