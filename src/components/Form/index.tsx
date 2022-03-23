import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button } from '../Button';
import { ControlledInput } from '../ControlledInput';
import { Container } from './styles';
type FormData = {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

const schema = yup.object({
  name: yup.string().required('Informa o email'),
  email: yup.string().email('E-mail invalido').required('Informa o email'),
  password: yup.string().min(6, 'A password deve ter no minimo 6 digitos'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'As passwords não coecidem')
})


export function Form() {
  const { handleSubmit, control, formState } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const { errors } = formState

  function handleUserRegister(data: FormData) {
    
  }

  return (
    <Container>
      <ControlledInput
        icon="user"
        placeholder="Nome"
        name='name'
        control={control}
        error={errors.name}
      />
      <ControlledInput
        icon="mail"
        placeholder="E-mail"
        name='email'
        control={control}
        error={errors.email}
        />
      <ControlledInput
        secureTextEntry
        icon="lock"
        placeholder="Senha"
        name='password'
        control={control}
        error={errors.password}
        />
      <ControlledInput
        secureTextEntry
        icon="lock"
        placeholder="Confirme a senha"
        name='passwordConfirm'
        control={control}
        error={errors.passwordConfirm}
        />

      <Button
        title="Cadastrar"
        onPress={handleSubmit(handleUserRegister)}
      />
    </Container>
  )
}