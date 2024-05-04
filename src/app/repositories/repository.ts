import { Injectable, inject } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { StorageService } from '../database/storage.service';

@Injectable({
  providedIn: 'root',
})
export abstract class Repository<TEntity> {
  private db: SQLiteDBConnection = inject(StorageService).retrieveDb();

  abstract get tableName(): string;

  abstract mapToDbFields(entity: TEntity): any;

  async add<T extends TEntity>(value: T) {
    try {
      const fields = this.mapToDbFields(value);
      const columns = Object.keys(fields).join(', ');
      const placeholders = Object.keys(fields)
        .map(() => '?')
        .join(', ');
      const sql = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *;`;
      const query = this.db.run(sql, Object.values(fields), true, 'all');
      const result: T = await (await query).changes?.values?.[0];
      return result;
    } catch (error: any) {
      throw Error(error.message);
    }
  }

  async update<T extends TEntity>(id: number, value: T) {
    try {
      const fields = this.mapToDbFields(value);
      const updates = Object.keys(fields)
        .map((key) => `${key} = ?`)
        .join(', ');

      const sql = `UPDATE ${this.tableName} SET ${updates} WHERE id = ? RETURNING *;`;
      const values = [...Object.values(fields), id];
      const result = (await (
        await this.db.run(sql, values)
      ).changes?.values?.[0]) as T;

      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // TODO: Add deletion logic
  async remove(id: number) {
    try {
      const sql = `DELETE FROM ${this.tableName} WHERE id = ?;`;
      await this.db.run(sql, [id], true);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getById<T extends TEntity>(id: number) {
    try {
      const sql = `SELECT * FROM ${this.tableName} WHERE id = ?;`;
      const result: T | undefined = (await this.db.query(sql, [id]))
        .values?.[0];
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAll<T extends TEntity>() {
    try {
      const sql = `SELECT * FROM ${this.tableName};`;
      return (await this.db.query(sql)).values as T[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async exists(id: number): Promise<boolean> {
    try {
      const sql = `SELECT EXISTS(SELECT 1 FROM ${this.tableName} WHERE id = ?);`;
      const result: { exists: boolean } = (await this.db.query(sql, [id]))
        .values?.[0];
      return result.exists;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
