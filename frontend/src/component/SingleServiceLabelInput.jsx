const SingleServiceLabelInput = ({
  serviceLabelInput,
  register,
  handleCreatePriceSummary,
}) => {
  return (
    <label className="booking_form_label_checkbox">
      <input
        onChange={handleCreatePriceSummary}
        className="booking_form_input_checkbox"
        type="checkbox"
        {...register("services", {
          required: "Please select atleast one service",
        })}
        value={serviceLabelInput._id}
      />
      {serviceLabelInput.serviceName}
    </label>
  );
};

export default SingleServiceLabelInput;
