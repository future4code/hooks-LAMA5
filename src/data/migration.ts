import { BaseDatabase } from "./BaseDatabase";

export class Migrations extends BaseDatabase {
  async run() {
    try {
      await this.up();
      console.log("MIGRATIONS UP");
    } catch (error) {
      await this.down();
      console.log("MIGRATIONS DOWN", error.message || error.sqlMessage);
    } finally {
      await this.close();
      console.log("MIGRATIONS CLOSE");
    }
  }

  async up() {
    await BaseDatabase.connection.raw(`
  CREATE TABLE IF NOT EXISTS BANDAS (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      music_genre VARCHAR(255) NOT NULL,
      responsible VARCHAR(255) UNIQUE NOT NULL 
      );
    `);

    await BaseDatabase.connection.raw(`
    CREATE TABLE IF NOT EXISTS SHOWS(
      id VARCHAR(255) PRIMARY KEY,
      week_day VARCHAR(255) NOT NULL,
      start_time INT NOT NULL,
      end_time INT NOT NULL,
      band_id VARCHAR(255) NOT NULL,
      FOREIGN KEY(band_id) REFERENCES BANDAS(id)
      );
    `);

    await BaseDatabase.connection.raw(`
    CREATE TABLE IF NOT EXISTS USUARIOS(
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
      );
      `);
  }
  async down() {    
    await BaseDatabase.connection.raw(`
    DROP TABLES BANDAS, SHOWS, USUARIOS;
    `)
  }
}
