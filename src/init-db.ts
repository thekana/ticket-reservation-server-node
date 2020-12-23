import 'dotenv/config';
import { Connection, createConnection } from 'typeorm';
import { dbConnection } from './database';
import { logger } from './utils/logger';
import { UserEntity } from './entity/users.entity';
import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { UserRole } from './interfaces/model.interface';

let connection: Connection;

async function connectToDB() {
  try {
    connection = await createConnection(dbConnection);
    logger.info('🟢 The database is connected.');
  } catch (e) {
    logger.error(`🔴 Unable to connect to the database: ${e}.`);
    throw new Error('Failed to connect to the databases');
  }
}

async function createAdmin() {
  const adminUser = { username: 'admin', role: UserRole.ADMIN };
  const hashedPassword = await bcrypt.hash('password', 10);
  return await getRepository(UserEntity).insert({ ...adminUser, password: hashedPassword });
}

async function main() {
  await connectToDB();
  try {
    await createAdmin();
  } catch (e) {
    logger.warn(e.message);
  }
}

main()
  .then()
  .catch((e: Error) => {
    console.log(e);
    logger.error(e.message);
  })
  .finally(() => {
    if (connection) {
      connection.close().then(() => console.log('Connection close'));
    }
  });
