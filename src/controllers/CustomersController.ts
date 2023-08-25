import { Customer } from "../models/Customer";
import PromptSync from "prompt-sync";

const prompt = PromptSync();

export class CustomersCotroller {
  async list() {
    let customers = await Customer.find();
    console.table(customers);
    return;
  }

  async create() {
    let name: string = prompt("Nome: ");
    let email: string = prompt("Email: ");
    let phone: string = prompt("Telefone: ");
    let document: string = prompt("Documento: ");

    let customer: Customer = await Customer.create({
      name,
      email,
      phone,
      document,
      //da pra omitir o segundo email pq o nome é igual, se for diferente não da
    }).save();

    console.log(`Cliente ID ${customer.id} criando com sucesso!`);
  }

  async edit() {
    let id: number = Number(prompt("Qual o ID?"));
    let customer: Customer | null = await Customer.findOneBy({ id: id });

    if (customer) {
      customer.name = prompt(`Nome ${customer.name}`);
      customer.email = prompt(`Email ${customer.email}`);
      customer.phone = prompt(`Telefone ${customer.phone}`);
      customer.document = prompt(`Document ${customer.document}`);
      await customer.save();
    }
    console.log("Cliente atualizado com sucesso!");
  }

  async delete() {
    let id: number = Number(prompt("Qual o ID?"));
    let result = await Customer.delete({ id: id });
    if (result.affected && result.affected > 0) {
      console.log("Cliente deletado com sucesso!");
    } else {
      console.log(`id: ${id} não encotrado`);
    }
  }
}
