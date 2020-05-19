import { Connection, ConnectionConfig } from "mysql";

export class MYSQLConnection {
  private readonly connection: Connection;

  constructor(option: ConnectionConfig){
    const mysql = window.require('mysql');
    this.connection = mysql.createConnection(option);
    this.connection.connect();
  }

  async getTestConnection(option: ConnectionConfig){
    const mysql = window.require('mysql');
    const test: Connection = mysql.createConnection(option);
    const res = new Promise(r => {
      test.connect((err, res) => {
        console.log(err, res)
        if(err) return r(false)
        return r(true)
      })
    })

    return res;
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