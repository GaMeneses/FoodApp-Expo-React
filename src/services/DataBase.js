import * as SQLite from 'expo-sqlite'; 

const databaseName = 'FoodApp.db';
const db = SQLite.openDatabase(databaseName);

export default db;
