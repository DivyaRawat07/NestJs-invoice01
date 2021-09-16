import { CustomerService } from './../customer/customer.service';
import { DeleteModelInvoice, InvoiceModel } from './invoice.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInvoiceDTO } from './invoice.dto';

@Injectable()
export class InvoiceService {

  constructor(
    @InjectRepository(InvoiceModel)
    private invoiceRepository: Repository<InvoiceModel>,
    private customerService: CustomerService
  ) { }

  async create(invoice: CreateInvoiceDTO): Promise<InvoiceModel> {
    const customer = await this.customerService.findOne(invoice.customer);
    const subTotal = invoice.items.reduce((acc, curr) => {
      return acc + Number((curr.rate * curr.quantity).toFixed(2))
    }, 0)
    console.log("🚀 ~ file: invoice.service.ts ~ line 22 ~ InvoiceService ~ subTotal ~ subTotal", subTotal)

    const taxAmount = subTotal * Number((invoice.taxRate / 100).toFixed(2));
    console.log("🚀 ~ file: invoice.service.ts ~ line 24 ~ InvoiceService ~ create ~ taxAmount", taxAmount)
    const total = subTotal + taxAmount;
    console.log("🚀 ~ file: invoice.service.ts ~ line 26 ~ InvoiceService ~ create ~ total", total)
    const outstandingBalance = total;
    console.log("🚀 ~ file: invoice.service.ts ~ line 28 ~ InvoiceService ~ create ~ outstandingBalance", outstandingBalance)
    return this.invoiceRepository.save({
      ...invoice,
      customer,
      subTotal,
      taxAmount,
      total,
      outstandingBalance
    } as any);

  }

  findAll(): Promise<InvoiceModel[]> {
    return this.invoiceRepository.find();
  }

  async delete(id: string):Promise<DeleteModelInvoice> {
    const a =  this.invoiceRepository.delete({ id })
    if((await a).affected){
      return {status:200,message:'delete'}
    }
  }

  findByCustomer(id: string): Promise<InvoiceModel[]> {
    return this.invoiceRepository.createQueryBuilder("invoice")
      .where("invoice.customer = :id", { id })
      .getMany();
  }

  findOne(id: string): Promise<InvoiceModel> {
    return this.invoiceRepository.findOne(id);
  }
}
