import { Booking } from "../models/Booking";
import PromptSync from "prompt-sync";

const prompt = PromptSync();

export class BookingsCotroller {
  async listBooking() {
    let bookings = await Booking.find();
    console.table(bookings);
    return;
  }

  async createBooking() {
    let amount: number = Number(prompt("Quantidade (R$): "));
    let start_date: string = prompt("Data de Entrada: ");
    let end_date: string = prompt("Data de saída: ");

    let booking: Booking = await Booking.create({
      amount,
      start_date,
      end_date,
    }).save();

    console.log(`Cliente ID ${booking.id} criando com sucesso!`);
  }

  async editBooking() {
    let id: number = Number(prompt("Qual o ID?"));
    let booking: Booking | null = await Booking.findOneBy({ id: id });

    if (booking) {
      booking.amount = Number(prompt(`Quantidade (R$) ${booking.amount}`));
      booking.start_date = prompt(`Data de Entrada ${booking.start_date}`);
      booking.end_date = prompt(`Data de Entrada ${booking.end_date}`);
      await booking.save();
    }
    console.log("Reserva atualizado com sucesso!");
  }

  async deleteBooking() {
    let id: number = Number(prompt("Qual o ID?"));
    let result = await Booking.delete({ id: id });
    if (result.affected && result.affected > 0) {
      console.log("Reserva deletado com sucesso!");
    } else {
      console.log(`id: ${id} não encotrado`);
    }
  }
}
