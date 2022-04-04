
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Input from '../../shared/Components/FormElements/Input';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH} 
    from '../../shared/util/validators.js';

import {useForm} from '../../shared/hooks/SignUpFrom-hook';
import Button from '../../shared/Components/FormElements/Button';
import Modal from '../../shared/Components/UIElements/Modal';
import auth_image from '../../assets/images/authorization.svg';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './SignInModal.css';


const SignInModal = (props) => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const {error, sendRequest} = useHttpClient();
    const [close, setClose] = useState(false);
    const [formState, inputHandler] = useForm({
        email: {
          value: '',
          isValid: false
        },
        password: {
          value: '',
          isValid: false
        } 
      },false);

      
      const authSubmitHandler = async (e) => {
        e.preventDefault();
        try {
          const responseData = await sendRequest(
            'http://localhost:5000/api/users/login',
            'POST',
            JSON.stringify({
              email: formState.inputs.email.value,
              password: formState.inputs.password.value
            }),
            {
              'Content-Type': 'application/json'
            }
          );
          console.log('logged in')
          auth.login(responseData.userId, responseData.token)
          setClose(true)
          navigate('/'); 
        } catch (err) {}
        
      }
      
      return (  <Modal
            show={props.show && !close}
            CloseonClick={props.close}
            title="Авторизация"
            errorSignIn={error ? "Не верная почта или пароль" : ""}
            image= {auth_image}
            signupbtn={
            <Link className="tosignup" to="/signup">Зарегистрироваться</Link>
            }
            footeronClick= {props.footer}
        >
        
          <Input
            className="input-auth"
            id='email'
            element="input"
            type="email"
            labelplaceholder ="Электронная почта"
            placeholderclassName={formState.inputs.email.isValid ? "placeholderclass isvalid" : "placeholderclass"}
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
            errorTextclassName="errortext"
            labelclassName="labelclass"
            initialValue={formState.inputs.email.value}
            initialValid={formState.inputs.email.isValid}
            
          />
          <div className='password_wrapper auth_password'>
              <Input
                className="input-auth"
                id='password'
                element="input"
                labelplaceholder ="Пароль"
                placeholderclassName={formState.inputs.password.isValid ? "placeholderclass isvalid" : "placeholderclass"}
                type="password"
                validators={[VALIDATOR_MINLENGTH(8)]}
                errorTextclassName="errortext"
                errorText="Пароль должно быть не менее восьми символов"
                onInput={inputHandler}
                labelclassName="labelclass"
              />
              <Button onClick={props.forgetpassword} className="forget_password">Забыли?</Button>
                                      
          </div>
          <Button 
            className="header__btn-auth"
            type="submit"
            onClick={authSubmitHandler}
            inverse disabled={!formState.inputs.password.isValid}>
            Войти
          </Button>

      </Modal>
      )
};

export default SignInModal;