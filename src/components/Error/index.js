import React from 'react'

const Error = ({err}) =>
  err ? (
    <span>
      { err.code === 'auth/invalid-email' || err.code === 'email' ? 'Correo inválido'
         : err.code === 'auth/wrong-password' ? 'Contraseña inválida'
         : err.code === 'auth/user-not-found' ? 'Usuario no existe'
         : err.error === 'No encontrado' ? 'Usuario no existe'
         : err.detail === 'No encontrado' ? 'Usuario no existe'
         : err.code === 'firstname' ? 'Ingresa tus nombres'
         : err.code === 'lastname' ? 'Ingresa tus apellidos'
         : err.code === 'reemail' ? 'Correos no coinciden'
         : err.code === 'repassword' ? 'Contraseñas no coinciden'
         : err.code === 'auth/weak-password' ? 'La contraseña debe tener al menos 6 caracteres'
         : err.code === 'auth/network-request-failed' || err.code === 'network' ? 'Problemas de conexión'
         : err.code === 'auth/account-exists-with-different-credential' ? 'Ya existe una cuenta con el mismo correo con diferentes credenciales. Inicia sesión usando un proveedor asociado a esa dirección de correo'
         : err.code === 'networkError' ? 'Problemas de conexión'
         : err.code === 'termsNotAccepted' ? 'Debes aceptar los Términos y Condiciones.'
         : err.nonFieldError ? err.nonFieldError
         : 'Error inesperado'
       }
    </span>
  )
  : null

export default Error
