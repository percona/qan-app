export class ColumnStateModel {
  name: string;
  value: boolean;

  constructor(column: any = {}, storedColumns: any = []) {
    const currentColumn = storedColumns.find(storedColumn => column === storedColumn.name);
    const columnValue = storedColumns.length && currentColumn ? currentColumn.value : true;
    this.name = column;
    this.value = columnValue;
  }
}
