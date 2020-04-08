import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { browserDBInstance } from './browser';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  dbInstance: any;
  SQL_DB_NAME = 'OnielDB';
  
  constructor(public sqlite: SQLite, private platform: Platform) {
    this.init();
  }

  async init() {
    if (!this.platform.is('cordova')) {
      let db = window.openDatabase(this.SQL_DB_NAME, '1.0', 'DEV', 5 * 1024 * 1024);
      this.dbInstance = browserDBInstance(db);
    } else {
      this.dbInstance = await this.sqlite.create({
        name: this.SQL_DB_NAME,
        location: 'default'
      });
    }
  }

}
