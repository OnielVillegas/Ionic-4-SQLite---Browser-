import { Component } from '@angular/core';
import { SqliteService } from '../Controlador/sqlite.service';
import { promise } from 'protractor';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public row_data: any = [];
  public name_model: string = "";
  public table_name = "tabla";

  constructor(private sql: SqliteService, private alertController: AlertController) {
    this.createTable();
    this.getRows();
  }

  createTable() {
    this.sql.dbInstance.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_name + ' (pid INTEGER PRIMARY KEY, Name varchar(255))', []).then(
      () => { },
      error => console.log(error)
    );
  }

  getRows() {
    this.sql.dbInstance.executeSql("SELECT * FROM " + this.table_name, []).then(
      (res) => {
        this.row_data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            this.row_data.push(res.rows.item(i));
          }
        }
      },
      error => console.log(error)
    );
  }

  deleteRow(item) {
    const alert = this.alertController.create({
      header: 'Eliminado!',
      message: 'Se elimino el chango correctamente.',
      buttons: ['OK']
    });

    this.sql.dbInstance.executeSql("DELETE FROM " + this.table_name + " WHERE pid = " + item.pid, []).then(
      () => {
        alert.then(res=>res.present());
        this.getRows();
      },
        error => console.log(error)
      );
  }

  insertRow() {
    const alert = this.alertController.create({
      header: 'Exito!',
      message: 'Se Inserto el chango correctamente.',
      buttons: ['OK']
    });

    const alert1 = this.alertController.create({
      header: 'Error!',
      message: 'Agregar nombre del chango.',
      buttons: ['OK']
    });

    if (!this.name_model.length) {
      alert1.then(res=>res.present());
      return;
    }
    this.sql.dbInstance.executeSql('INSERT INTO ' + this.table_name + ' (Name) VALUES ("' + this.name_model + '")', []).then(
      () => {
        alert.then(res=>res.present());
        this.getRows();
      },
        error => console.log(error)
      );
  }

}
