import {PrismaClient} from "@prisma/client";

const prismaClientSingletion = ()=>{
  return new PrismaClient();
}

type PrismaClientSingletion = ReturnType<typeof prismaClientSingletion>

const globalForPrisma = globalThis as unknown as {
  prisma:PrismaClientSingletion | undefined;
}

const prisma = globalForPrisma ?? prismaClientSingletion();

export default prisma;

if(process.env.NODE_ENV !== 'production'){
  globalForPrisma.prisma = prisma;
}