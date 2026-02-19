
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import 'dotenv/config'

const databaseUrl = process.env.USE_LOCAL_DB === "true" && process.env.LOCAL_DATABASE_URL
    ? process.env.LOCAL_DATABASE_URL
    : process.env.DATABASE_URL

const pool = new Pool({ connectionString: databaseUrl })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    const products = await prisma.product.findMany({
        select: {
            id: true,
            name: true,
            slug: true,
            status: true
        }
    })
    console.log('PRODUCTS:', JSON.stringify(products, null, 2))
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
