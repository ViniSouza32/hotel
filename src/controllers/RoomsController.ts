import { Booking } from "../models/Booking";
import { Room } from "../models/Room";
import PromptSync from "prompt-sync";

const prompt = PromptSync();

export class RoomsCotroller {
  async listRooms() {
    let rooms = await Room.find();
    console.table(rooms);
    return;
  }

  async createRoom() {
    let number: string = prompt("Numero: ");
    let type: string = prompt("Tipo: ");
    let capacity: number = Number(prompt("Capacidade: "));
    let price: number = Number(prompt("Preço: "));

    let room: Room = await Room.create({
      number,
      type,
      capacity,
      price,
    }).save();

    console.log(`Room ID ${room.id} criada com sucesso!`);
  }

  async editRoom() {
    let id: number = Number(prompt("Qual o ID?"));
    let room: Room | null = await Room.findOneBy({ id: id });

    if (room) {
      room.number = prompt(`Numero ${room.number}`);
      room.type = prompt(`Tipo ${room.type}`);
      room.capacity = Number(prompt(`Capacidade ${room.capacity}`));
      room.price = Number(prompt(`Document ${room.price}`));
      await room.save();
    }
    console.log("Quarto atualizado com sucesso!");
  }

  async deleteRoom() {
    let id: number = Number(prompt("Qual o ID?"));
    let result = await Room.delete({ id: id });
    if (result.affected && result.affected > 0) {
      console.log("Cliente deletado com sucesso!");
    } else {
      console.log(`id: ${id} não encotrado`);
    }
  }
}
