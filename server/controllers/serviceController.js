const Service = require("../models/servicesModel");
const CustomError = require("../errors/customError");

exports.createService = async (req, res) => {
  const service = await Service.create({ ...req.body, user: req.user.userId });

  res.status(200).json({ status: "success", data: service });
};

exports.getAllService = async (req, res) => {
  const service = await Service.find({});

  res.status(200).json({ status: "success", data: service });
};

exports.getOneService = async (req, res) => {
  const { serviceId } = req.params;

  const service = await Service.findOne({ _id: serviceId });
  if (!serviceId) {
    throw new CustomError(`Service with id: ${serviceId} cannot be found`, 400);
  }

  res.status(200).json({ status: "Success", data: service });
};

exports.updateService = async (req, res) => {
  const { serviceId } = req.params;

  const service = await Service.findOneAndUpdate({ _id: serviceId }, req.body, {
    new: true,
  });

  if (!service) {
    throw new CustomError(`Service with id: ${serviceId} cannot be found`, 400);
  }

  res.status(200).json({ status: "Success", data: service });
};

exports.deleteService = async (req, res) => {
  const { serviceId } = req.params;

  const service = await Service.findOneAndDelete({ _id: serviceId });

  if (!service) {
    throw new CustomError(`Service with id: ${serviceId} cannot be found`, 400);
  }

  res.status(200).json({
    status: "success",
    message: `Service with id: ${serviceId} successfully deleted`,
  });
};
