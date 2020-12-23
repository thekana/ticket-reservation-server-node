import 'dotenv/config';
import { Connection, createConnection } from 'typeorm';
import { dbConnection } from './database';
import { logger } from './utils/logger';
import { UserEntity } from './entity/users.entity';
import bcrypt from 'bcrypt';

let connection: Connection;

async function createAdmin() {
  try {
    connection = await createConnection(dbConnection);
    logger.info('🟢 The database is connected.');
  } catch (e) {
    logger.error(`🔴 Unable to connect to the database: ${e}.`);
    throw new Error('Failed to connect to the databases');
  }
  const adminUser = { username: 'admin', role: 'ADMIN' };
  const hashedPassword = await bcrypt.hash('password', 10);
  return await connection.getRepository(UserEntity).save({ ...adminUser, password: hashedPassword });
}

createAdmin()
  .then(r => {
    console.log(r);
    connection.close().then(() => console.log('Connection close'));
  })
  .catch((e: Error) => {
    console.log(e);
    logger.error(e.message);
    connection.close().then(() => console.log('Connection close'));
  });
