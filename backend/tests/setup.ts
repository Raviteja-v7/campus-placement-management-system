import { beforeAll, beforeEach, afterAll } from "vitest";

import {
  clearDatabase,
  connectTestDB,
  disconnectTestDB,
} from "./helpers/db.js";

beforeAll(async () => {
  await connectTestDB();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await disconnectTestDB();
});