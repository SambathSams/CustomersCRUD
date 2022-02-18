const customerModel = require("../models/customers.model");

let customerController = {
    getData: async (req, res) => {
        try {
            const customerdata = await customerModel.find();
            res.status(200).send({
                data: customerdata
            });
            console.log("Customer datas fetched");

        } catch (error) {
            res.status(500).send({
                message: "Something went wrong",
                error: error
            });
            console.log(error);
        }
    },
    getDataById: async (req, res) => {
        try {
            const cust_id = req.params.id;
            const customerdata = await customerModel.findById(cust_id);
            if (customerdata) {
                res.status(200).send({
                    isFound: true,
                    data: customerdata
                });
            }
            else {
                res.status(200).send({
                    isFound: false,
                    message: "ID not found"
                });
            }

            console.log("Customer data fetched");

        } catch (error) {
            res.status(500).send({
                message: "Something went wrong",
                error: error
            });
            console.log(error);
        }
    },
    createData: async (req, res) => {
        try {
            const new_cust = req.body;
            const customerdata = await customerModel.create(new_cust);
            res.status(200).send({
                message: "Data created successfully",
                data: customerdata
            });
            console.log("Customer data created");
        } catch (error) {
            if(error.name === "ValidationError"){
                res.status(500).send({
                    error: "Invalid input parameters",
                    message: error.message
                });
            }
            else{
                res.status(500).send({
                    message: "Something went wrong",
                    error: error
                });
            }
            console.log(error);
        }
    },
    updateDataById: async (req, res) => {
        try {
            const cust_id = req.params.id;
            const update_cust = req.body;
            const customerdata = await customerModel.findByIdAndUpdate(cust_id, { $set: update_cust });
            res.status(200).send({
                message: "Data updated successfully",
                data: customerdata
            });
            console.log("Customer data updated");
        } catch (error) {
            if(error.name === "CastError"){
                res.status(500).send({
                    error: "Invalid input parameters",
                    message: error.message
                });
            }
            else{
                res.status(500).send({
                    message: "Something went wrong",
                    error: error
                });
            }
            
            console.log(error);
        }
    },
    deleteDataById: async (req, res) => {
        try {
            const cust_id = req.params.id;
            const customerdata = await customerModel.findOneAndRemove({
                _id: cust_id
            });
            if(customerdata){
                res.status(200).send({
                    message: "Deleted successfully",
                    data: customerdata
                });
                console.log("Customer data deleted");
            }
            else{
                res.status(200).send({
                    message: "No data found"
                });
                console.log("No customer to delete");
            }
            
        } catch (error) {
            res.status(500).send({
                message: "Something went wrong",
                error: error
            });
            console.log(error);
        }
    },
};

module.exports = customerController;