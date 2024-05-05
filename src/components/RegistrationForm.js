// RegistrationForm.js
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, gql } from '@apollo/client';
import './styles.css'; // Импорт CSS

const schema = yup.object().shape({
  name: yup.string().required('Введите ваше имя'),
  email: yup.string().email('Введите корректный email').required('Введите ваш email'),
  password: yup.string().required('Введите пароль').min(6, 'Пароль должен содержать минимум 6 символов'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Пароли должны совпадать').required('Подтвердите пароль'),
});

const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    registerUser(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [registerUser, { loading, error, data }] = useMutation(REGISTER_USER);

  const onSubmit = async (formData) => {
    try {
      await registerUser({ variables: formData });
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };

  return (
    <div className="form-container"> {/*  */}
      <h2 className="form-title">Форма регистрации</h2> {/*  */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group"> {/* */}
          <label>Имя:</label>
          <input type="text" {...register('name')} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className="form-group"> {/*  */}
          <label>Email:</label>
          <input type="email" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="form-group"> {/*  */}
          <label>Пароль:</label>
          <input type="password" {...register('password')} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="form-group"> {/*  */}
          <label>Подтвердите пароль:</label>
          <input type="password" {...register('confirmPassword')} />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <button className="submit-button" type="submit" disabled={loading}>Зарегистрироваться</button> {/*  */}
      </form>
    </div>
  );
};

export default RegistrationForm;
