import { PrismaClient } from "@prisma/client";
import eventsData from "../src/data/events.json" with { type: "json" };
import userData from "../src/data/users.json" with { type: "json" };
import categoryData from "../src/data/categories.json" with { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { events } = eventsData;
  const { users } = userData;
  const { categories } = categoryData;

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: {
        id:category.id,
        name: category.name,
      },
    });
  }

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  for (const event of events) {
    await prisma.event.upsert({
      where: { id: event.id },
      update: {},
      create: {
        id: event.id,
        title: event.title,
        description: event.description,
        startTime: event.startTime,
        endTime: event.endTime,
        location: event.location,
        image: event.image,
        categoryIds: {
          connect: event.categoryIds.map((id) => ({ id })),
        },
        createdBy: {
          connect: { id: event.createdBy },
        },
      },
    });
  }


}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });