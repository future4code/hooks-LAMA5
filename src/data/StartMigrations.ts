import { Migrations } from "./migration";

new Migrations().run()
.then(()=>console.log("Migrations executado com sucesso"))
.catch(error => console.log(error));