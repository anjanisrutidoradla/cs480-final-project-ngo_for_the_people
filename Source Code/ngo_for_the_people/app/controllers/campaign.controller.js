const db = require("../models");
const Campaign = db.campaigns;
const Op = db.Sequelize.Op;

// Create and Save a new Campaign
exports.create = (req, res) => {
    if (!req.body.campaign_id) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    
      // Create a Campaign
      const campaign = {
        campaign_id: req.body.campaign_id,
        campaign_name: req.body.campaign_name,
        campaign_details: req.body.campaign_details,
        campaign_location: req.body.campaign_location,
        campaign_employee_id: req.body.campaign_employee_id,
        campaign_budget: req.body.campaign_budget
      };
    
      // Save Campaign in the database
      Campaign.create(campaign)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating campaign."
          });
        });
};

// Retrieve all Campaign from the database.
exports.findAll = (req, res) => {
    const campaign_id = req.query.campaign_id;
    var condition = campaign_id ? { campaign_id: { [Op.like]: `%${campaign_id}%` } } : null;
    console.log(`condition`, condition)
    Campaign.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving campaigns."
        });
      });
  };

// Find a single Campaign with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Campaign.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Campaign with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving campaign with id=" + id
        });
      });
  };

// Update an Campaign by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Campaign.update(req.body, {
      where: { campaign_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Campaign was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Campaign with id=${id}. Maybe campaign was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Campaign with id=" + id
        });
      });
  };

// Delete an Campaign with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Campaign.destroy({
      where: { campaign_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Campaign was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Campaign with id=${id}. Maybe Campaign was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Campaign with id=" + id
        });
      });
  };
