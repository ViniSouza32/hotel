import DB from "./db";
import PromptSync from "prompt-sync";
import { CustomersCotroller } from "./controllers/CustomersController";
import { RoomsCotroller } from "./controllers/RoomsController";
import { BookingsCotroller } from "./controllers/BookingsController";

const prompt = PromptSync();

async function main(): Promise<void> {
  await DB.initialize();

  menu();
}

main();

async function menu() {
  let customersController = new CustomersCotroller();
  let roomController = new RoomsCotroller();
  let bookingsController = new BookingsCotroller();

  let input: string = "";

  do {
    console.clear();
    console.log("1 - Listar cliente");
    console.log("2 - Cadastrar novo cliente");
    console.log("3 - Atualizar cliente");
    console.log("4 - Excluir cliente");
    console.log("5 - Listar quartos");
    console.log("6 - Cadastrar novo quarto");
    console.log("7 - Editar quarto");
    console.log("8 - Excluir quarto");
    console.log("9 - Listar Reservas");
    console.log("10 - Cadastrar nova reserva");
    console.log("11 - Editar reserva");
    console.log("12 - Excluir reserva");
    console.log("0 - Sair");
    input = prompt("Selecione a opção desejada: ");

    switch (input) {
      case "1":
        await customersController.list();
        break;
      case "2":
        await customersController.create();
        break;
      case "3":
        await customersController.edit();
        break;
      case "4":
        await customersController.delete();
        break;
      case "5":
        roomController.listRooms();
        break;
      case "6":
        roomController.createRoom();
        break;
      case "7":
        roomController.editRoom();
        break;
      case "8":
        roomController.deleteRoom();
        break;
      case "9":
        bookingsController.listBooking();
        break;
      case "10":
        bookingsController.createBooking();
        break;
      case "11":
        bookingsController.editBooking();
        break;
      case "12":
        bookingsController.deleteBooking();
        break;
      case "0":
        console.log("Saindo...");
        break;
      default:
        break;
    }

    prompt("Pressione enter para continuar");
  } while (input != "0");
}
