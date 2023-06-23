const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function deleteAllUsers() {
  try {
    await prisma.eventType.deleteMany();
    console.log("All users deleted successfully.");
  } catch (error) {
    console.error("Error deleting users:", error);
  }
}
deleteAllUsers()
  .catch((error) => console.error(error))
  .finally(async () => {
    await prisma.$disconnect();
  });
