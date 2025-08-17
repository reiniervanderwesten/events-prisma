import { PrismaClient } from '@prisma/client'
import categoryData from '../data/categories.json' with { type: 'json' }
import eventData from '../data/events.json' with { type: 'json' }
import userData from '../data/users.json' with { type: 'json' }





const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })


async function main () {
  const { categories } = categoryData
  const {events}= eventData
  const { users } = userData
  


  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: category
    })
  }

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user
    })
  }

  // First destructure recordData


// Then loop through records
    for (const event of events) {
        await prisma.event.upsert({
            where: { id: event.id },
            update: {},
            create: event
        })
    }

  
  
    

  
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

