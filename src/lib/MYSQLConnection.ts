import { Connection, ConnectionConfig } from "mysql";

export class MYSQLConnection {
  private readonly connection: Connection;

  constructor(option: ConnectionConfig){
    const mysql = window.require('mysql');
    this.connection = mysql.createConnection(option);
    this.connection.connect();
  }

  async getDatabaseList(){
    const items: any = new Promise(r => {
      this.connection.query('SHOW DATABASES;', (res, rows) => r(rows));
    });

    return items;
  }

  async getTableList(database_name: string){
    const items: any = new Promise(r => {
      this.connection.query('SHOW TABLES FROM ' + database_name, (res, rows) => {
        r(rows);
      })
    })

    return items;
  }
}