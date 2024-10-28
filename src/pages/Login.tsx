import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import * as S from './login.styled';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignInFormData {
  name?: string;
  email: string;
  password: string;
}

const signUpSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

const signInSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const [signIn, toggle] = useState(true);
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [error, setError] = useState<string>('');

  const signUpForm = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema)
  });

  const signInForm = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema)
  });

  const onSignUp = async (data: SignUpFormData) => {
    try {
      const success = await signup(data.name, data.email, data.password);
      if (success) {
        toggle(true); // Switch to sign in form
        signUpForm.reset(); // Reset form
        setError('');
      } else {
        setError('Email already exists');
      }
    } catch (error) {
      setError('Registration failed');
    }
  };

  const onSignIn = async (data: SignInFormData) => {
    try {
      const success = await login(data.email,  data.password);
      if (success) {
        navigate('/home');
        setError('');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Login failed');
    }
  };

  return (
    <S.Container>
      <S.SignUpContainer signinIn={signIn}>
        <S.Form onSubmit={signUpForm.handleSubmit(onSignUp)} autoComplete='off'>
          <S.Title>Create Account</S.Title>
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
          <S.Input 
            {...signUpForm.register('name')}
            type="text" 
            placeholder="Name" 
          />
          {signUpForm.formState.errors.name && (
            <S.ErrorMessage>{signUpForm.formState.errors.name.message}</S.ErrorMessage>
          )}
          <S.Input 
            {...signUpForm.register('email')}
            type="email" 
            placeholder="Email" 
          />
          {signUpForm.formState.errors.email && (
            <S.ErrorMessage>{signUpForm.formState.errors.email.message}</S.ErrorMessage>
          )}
          <S.Input 
            {...signUpForm.register('password')}
            type="password" 
            placeholder="Password" 
          />
          {signUpForm.formState.errors.password && (
            <S.ErrorMessage>{signUpForm.formState.errors.password.message}</S.ErrorMessage>
          )}
          <S.Input 
            {...signUpForm.register('confirmPassword')}
            type="password" 
            placeholder="Confirm Password" 
          />
          {signUpForm.formState.errors.confirmPassword && (
            <S.ErrorMessage>{signUpForm.formState.errors.confirmPassword.message}</S.ErrorMessage>
          )}
          <S.Button type="submit">Sign Up</S.Button>
        </S.Form>
      </S.SignUpContainer>

      <S.SignInContainer signinIn={signIn}>
        <S.Form onSubmit={signInForm.handleSubmit(onSignIn)}>
          <S.Title>Sign in</S.Title>
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
          <S.Input 
            {...signInForm.register('email')}
            type="email" 
            placeholder="Email" 
          />
          {signInForm.formState.errors.email && (
            <S.ErrorMessage>{signInForm.formState.errors.email.message}</S.ErrorMessage>
          )}
          <S.Input 
            {...signInForm.register('password')}
            type="password" 
            placeholder="Password" 
          />
          {signInForm.formState.errors.password && (
            <S.ErrorMessage>{signInForm.formState.errors.password.message}</S.ErrorMessage>
          )}
          
          <S.Button type="submit">Sign In</S.Button>
        </S.Form>
      </S.SignInContainer>

      <S.OverlayContainer signinIn={signIn}>
        <S.Overlay signinIn={signIn}>
          <S.LeftOverlayPanel signinIn={signIn}>
            <S.Title>Welcome Back!</S.Title>
            <S.Paragraph>
               Please login with your personal info.
            </S.Paragraph>
            <S.GhostButton onClick={() => {
              toggle(true);
              setError('');
            }}>Sign In</S.GhostButton>
          </S.LeftOverlayPanel>

          <S.RightOverlayPanel signinIn={signIn}>
            <S.Title>Hello, Friend!</S.Title>
            <S.Paragraph>
              Start your journey with us
            </S.Paragraph>
            <S.GhostButton onClick={() => {
              toggle(false);
              setError('');
            }}>Sign Up</S.GhostButton>
          </S.RightOverlayPanel>
        </S.Overlay>
      </S.OverlayContainer>
    </S.Container>
  );
};

export default Login;