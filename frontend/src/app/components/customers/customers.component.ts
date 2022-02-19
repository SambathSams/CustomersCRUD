import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: any;
  customerForm: boolean;
  isNewCustomer: boolean;
  newCustomer: any = {};
  editCustomerForm: boolean;
  editedCustomer: any = {};

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe(
      (res) => {
        console.log('Customers Fetched')
        this.customers = res.data;
      }, (error) => {
        console.log(error);
      });
  }

  showEditCustomerForm(customer) {
    if (!customer) {
      this.customerForm = false;
      return;
    }
    this.editedCustomer = customer;
    console.log(this.editedCustomer);
    this.editCustomerForm = true;
  }

  showAddCustomerForm() {
    // resets form if edited customer
    if (this.customers.length) {
      this.newCustomer = {};
    }
    this.customerForm = true;
    this.isNewCustomer = true;
  }

  saveCustomer() {
    if (this.isNewCustomer) {
      // add a new Customer
      this.customerService.createCustomer(this.newCustomer).subscribe(
        (res) => {
          if(res.error || !(res.data && res.data._id)) throw Error;
          this.getCustomers();
          console.log('New Customers Created');
        }, (error) => {
          console.log(error);
        });
    }
    this.customerForm = false;
  }

  updateCustomer() {
    this.customerService.updateCustomerbyId(this.editedCustomer._id, this.editedCustomer).subscribe(
      (res) => {
        if(res.error || !(res.data && res.data._id)) throw Error;
        this.getCustomers();
        console.log('Customers Updated')
      }, (error) => {
        console.log(error);
      });
    this.editCustomerForm = false;
    this.editedCustomer = {};
  }

  removeCustomer(customer) {
    this.customerService.deleteCustomerById(customer._id).subscribe(
      (res) => {
        if(res.error || !(res.data && res.data._id)) throw Error;
        console.log('Customers Updated');
        this.getCustomers();
      }, (error) => {
        console.log(error);
      });;
  }

  cancelEdits() {
    this.editedCustomer = {};
    this.editCustomerForm = false;
    this.getCustomers();
  }

  cancelNewCustomer() {
    this.newCustomer = {};
    this.customerForm = false;
    this.getCustomers();
  }

}
