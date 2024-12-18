import React from 'react';
import FormGrid from './RegistrationFormGrid'

const FormFields = ({ formData, handleChange, error, inputStyles }) => {
  return (
    <FormGrid
      formData={formData}
      error={error}
      handleChange={handleChange}
      inputStyles={inputStyles}
    />
  );
};

export default FormFields;