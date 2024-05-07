import { Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { DbnameVersionService } from './dbname-version.service';
import { SQLiteService } from './sqlite.service';
import { DataBaseUpgradeStatements } from './upgrades/database.upgrade.statements';

@Injectable()
export class StorageService {
  private databaseName: string = '';
  private DbUpdStmts: DataBaseUpgradeStatements =
    new DataBaseUpgradeStatements();
  private versionUpgrades;
  private loadToVersion;
  private db!: SQLiteDBConnection;

  constructor(
    private sqliteService: SQLiteService,
    private dbVerService: DbnameVersionService
  ) {
    this.versionUpgrades = this.DbUpdStmts.dabaseUpgrades;
    this.loadToVersion =
      this.versionUpgrades[this.versionUpgrades.length - 1].toVersion;
  }
  async initializeDatabase(dbName: string) {
    this.databaseName = dbName;
    // create upgrade statements
    await this.sqliteService.addUpgradeStatement({
      database: this.databaseName,
      upgrade: this.versionUpgrades,
    });
    // create and/or open the database
    this.db = await this.sqliteService.openDB(
      this.databaseName,
      false,
      'no-encryption',
      this.loadToVersion,
      false
    );
    this.dbVerService.set(this.databaseName, this.loadToVersion);
  }
  // retrieveConnection
  retrieveDb(): SQLiteDBConnection {
    return this.db;
  }
}
