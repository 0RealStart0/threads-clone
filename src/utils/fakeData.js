import { faker, fakerKO } from "@faker-js/faker";

export function makeRandomUser() {
  const username = faker.internet.email().split("@")[0];
  const email = username + "@gmail.com";
  const fullName = faker.person.fullName();
  const bio = faker.person.bio();
  const link = faker.internet.url();

  return { username, email, fullName, bio, link };
}
