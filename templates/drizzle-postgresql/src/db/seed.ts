import { db } from "./index";
import { users } from "./schema";

async function main() {
  console.log("Start seeding...");

  // Create a sample user
  await db
    .insert(users)
    .values({
      email: "test@example.com",
      name: "Test User",
    })
    .onConflictDoNothing();

  console.log("Created user");

  console.log("Seeding finished.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
