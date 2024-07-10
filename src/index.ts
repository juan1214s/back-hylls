import "reflect-metadata"
import app from "./app"
import { AppDataSource } from "./db"

async function main(){
    try {
        await AppDataSource.initialize();//arranca la conexion de la base de datos
        console.log(`La conexion de la base de datos fue exitosa`);
        app.listen(3000);//numero del puerto q escucha
        console.log(`El servidor esta corriendo en el puerto ${3000}`);
    } catch (error) {
        console.error('Se presento un error en la conexion a la base de datos');
        console.error(error)
    }
 
}

main()