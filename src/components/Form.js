import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateField, resetForm } from "../features/formSlice";
import RegistrationForm from "./RegistrationForm";
import SuccessForm from "./SuccessForm";
import CircularProgress from '@mui/material/CircularProgress'; // Importar el spinner

const Form = ({ onBack }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [aztlanID, setAztlanID] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carga

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ name, value }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.birth_date || !formData.weight || !formData.academy || !formData.experience || !formData.belt) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const API_URL = "https://vjfpbq4jbiz5uyarfu7z7ahlhi0xbhmi.lambda-url.us-east-1.on.aws";

    if (!validateForm()) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setLoading(true); // Activar el spinner

    try {
      const response = await fetch(`${API_URL}/participants`, { // Usamos la variable API_URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          birth_date: formData.birth_date,
          weight: formData.weight,
          academy: formData.academy,
          experience: formData.experience,
          belt: formData.belt,
          payment_proof: formData.payment_proof || "", // Campo extra con valor nulo por defecto
          email: formData.email,
        }),
      });

      setLoading(false); // Desactivar el spinner

      if (response.ok) {
        const data = await response.json();
        setAztlanID(data.aztlan_id);
        dispatch(resetForm());
        setSuccess(true);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error al enviar los datos, inténtalo de nuevo.");
      }
    } catch (error) {
      setLoading(false); // Desactivar el spinner
      setError("Error al enviar los datos, inténtalo de nuevo.");
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", textAlign: "center", marginTop: "0rem" }}>
      {loading ? (
        <CircularProgress size={50} /> 
      ) : success ? ( 
        <SuccessForm
          aztlanID={aztlanID} onBack={onBack}
        />
      ) : (
        <RegistrationForm
          formData={formData}
          handleChange={handleChange}
          error={error}
          success={success}
          handleSubmit={handleSubmit}
          onBack={onBack}
        />
      )}
    </div>
  ); 
};

export default Form;