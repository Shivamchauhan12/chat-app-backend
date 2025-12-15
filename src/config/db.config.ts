import { PrismaClient } from "@prisma/client/extension";
import { log } from "console";

const Prisma = new PrismaClient({
    log:["error","query"]
});

export default Prisma;

