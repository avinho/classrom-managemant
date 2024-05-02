import { SQLiteDBConnection } from '@capacitor-community/sqlite';

export abstract class Repository<TEntity> {
  db!: SQLiteDBConnection;

  abstract get tableName(): string;

  abstract mapToDbFields(entity: TEntity): any;

  async add<T extends TEntity>(value: T) {
    try {
      const fields = this.mapToDbFields(value);
      const columns = Object.keys(fields).join(', ');
      const placeholders = Object.keys(fields)
        .map(() => '?')
        .join(', ');
      this.db.beginTransaction();
      const sql = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *;`;
      const query = this.db.run(sql, Object.values(fields), true, 'all');
      this.db.commitTransaction();
      const result: T = await (await query).changes?.values?.[0];
      return result;
    } catch (error: any) {
      this.db.rollbackTransaction();
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
      const result = await this.db.run(sql, values);

      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async remove(id: number) {
    try {
      const sql = `DELETE FROM ${this.tableName} WHERE id = ?;`;
      const result = await this.db.run(sql, [id]);

      return result.changes;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getById(id: number) {
    try {
      const sql = `SELECT * FROM ${this.tableName} WHERE id = ?;`;
      const result = (await this.db.query(sql, [id])).values?.[0];
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAll() {
    try {
      const sql = `SELECT * FROM ${this.tableName};`;
      const result = await this.db.query(sql);

      return result.values;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
