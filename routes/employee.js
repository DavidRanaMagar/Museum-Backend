const express = require('express');
const router = express.Router();
const {Employee, Sex, Address, Department, JobTitle, User} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const employee = await Employee.findAll(
            {
            include: [{
                model: Address,
                as: 'employeeAddress',
            }, {
                model: Sex,
                as: 'employeeGender',
            }, {
                model: Department,
                as: 'dept',
            }, {
                model: JobTitle,
                as: 'job',
            }, {
                model: User,
                as: 'employeeUser',
            }]
        }
        );
        console.log("Employees fetched:", employee);
        res.json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Employee'});
    }
});

//get by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await Employee.findByPk(id, {
            include: [{
                model: Address,
                as: 'employeeAddress',
            }, {
                model: Sex,
                as: 'employeeGender',
            }, {
                model: Department,
                as: 'dept',
            }, {
                model: JobTitle,
                as: 'job',
            }, {
                model: User,
                as: 'employeeUser',
            }]
        });
        res.json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an Employee'});
    }
});

// insert
router.post('/', async (req, res) => {
    const {
        firstName,
        lastName,
        dateOfBirth,
        hireDate,
        jobTitle,
        salary,
        phoneNumber,
        email,
        department,
        gender,
        employeeAddress,
        employeeUser
    } = req.body;

    const {
        streetAddress,
        city,
        state,
        postalCode,
        country
    } = employeeAddress;

    const {
        username,
        password,
        role,
        createdBy,
        updatedBy
    } = employeeUser;
    try {
        const [address] = await Address.findOrCreate({  // Use findOrCreate to check if the address exists or create a new one
            where: {
                streetAddress,
                city,
                state,
                postalCode,
                country
            },
            defaults: { streetAddress, city, state, postalCode, country }
        });
        const newUser = await User.create({
            username,
            password,
            role,
            createdBy,
            updatedBy
        });

        const employee = await Employee.create({
            firstName,
            lastName,
            dateOfBirth,
            hireDate,
            jobTitle,
            salary,
            phoneNumber,
            email,
            department,
            gender,
            updatedBy: newUser.updatedBy,
            createdBy: newUser.createdBy,
            address: address.addressID,  // Use the addressID from the created/found address
            userID: newUser.userID  // Use the userID from the created user
        });

        res.status(201).json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating a employee'});
    }
});

router.put('/:id', async (req, res) => {
    const {
        firstName,
        lastName,
        dateOfBirth,
        hireDate,
        jobTitle,
        salary,
        phoneNumber,
        email,
        department,
        gender,
        employeeAddress,
    } = req.body;

    const {
        streetAddress,
        city,
        state,
        postalCode,
        country
    } = employeeAddress;

    try {
        // Check if employee exists
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Check if address already exists
        let address = await Address.findOne({
            where: {
                streetAddress,
                city,
                state,
                postalCode,
                country
            }
        });

        // If address doesn't exist, create it
        if (!address) {
            address = await Address.create({
                streetAddress,
                city,
                state,
                postalCode,
                country
            });
        }

        // Update employee with the found or created addressID
        await employee.update({
            firstName,
            lastName,
            dateOfBirth,
            hireDate,
            jobTitle,
            salary,
            phoneNumber,
            email,
            department,
            gender,
            address: address.addressID,  // Use the addressID from the created/found address
        });

        res.status(200).json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while updating the employee' });
    }
});


//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({message: 'Employee not found'});
        }
        await employee.destroy();
        // Send success response
        res.json({message: `Employee with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Employee'});
    }
});

module.exports = router;