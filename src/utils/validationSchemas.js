import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Introduce un correo electrónico válido').required('El correo electrónico es obligatorio'),
  password: Yup.string().required('La contraseña es obligatoria'),
});

export const registerSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Debe ser un nombre de al menos 3 caracteres').required('El nombre es obligatorio'),
  lastName: Yup.string().min(3, 'Debe ser un apellido de al menos 3 caracteres').required('El apellido es obligatorio'),
  email: Yup.string().email('Introduce un correo electrónico válido').required('El correo electrónico es obligatorio'),
  password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
  Dni: Yup.string()
    .matches(/^\d{8}$/, 'El DNI debe tener exactamente 8 números')
    .required('El DNI es obligatorio'),
});
