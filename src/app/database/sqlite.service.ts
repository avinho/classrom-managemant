import { Injectable } from '@angular/core';
import {
  CapacitorSQLite,
  CapacitorSQLitePlugin,
  SQLiteConnection,
  SQLiteDBConnection,
  capSQLiteUpgradeOptions,
} from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class SQLiteService {
  sqliteConn!: SQLiteConnection;
  isService: boolean = false;
  native: boolean = false;
  sqlitePlugin!: CapacitorSQLitePlugin;
  platform!: string;

  constructor() {}

  async init(): Promise<boolean> {
    this.platform = Capacitor.getPlatform();
    if (this.platform === 'ios' || this.platform === 'android') {
      this.native = true;
    }
    this.sqlitePlugin = CapacitorSQLite;
    this.sqliteConn = new SQLiteConnection(this.sqlitePlugin);
    this.isService = true;
    return true;
  }

  async initWebStore(): Promise<void> {
    try {
      await this.sqliteConn.initWebStore();
    } catch (err: any) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`initWebStore: ${err}`);
    }
  }

  async openDB(
    dbName: string,
    encrypted: boolean,
    mode: string,
    version: number,
    readonly: boolean
  ): Promise<SQLiteDBConnection> {
    let db: SQLiteDBConnection;
    let conn = (await this.sqliteConn.isConnection(dbName, readonly)).result;
    const retCC = (await this.sqliteConn.checkConnectionsConsistency()).result;
    if (conn && retCC) {
      db = await this.sqliteConn.retrieveConnection(dbName, readonly);
    } else {
      db = await this.sqliteConn.createConnection(
        dbName,
        encrypted,
        mode,
        version,
        readonly
      );
    }
    await db.open();
    return db;
  }

  async retrieveConnection(
    dbName: string,
    readonly: boolean
  ): Promise<SQLiteDBConnection> {
    return await this.sqliteConn.retrieveConnection(dbName, readonly);
  }

  async closeConnection(database: string, readonly?: boolean): Promise<void> {
    const readOnly = readonly ? readonly : false;
    return await this.sqliteConn.closeConnection(database, readOnly);
  }

  async addUpgradeStatement(options: capSQLiteUpgradeOptions): Promise<void> {
    await this.sqlitePlugin.addUpgradeStatement(options);
    return;
  }

  async saveToStore(db: string): Promise<void> {
    return await this.sqliteConn.saveToStore(db);
  }
}
