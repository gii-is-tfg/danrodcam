import React,{useState} from 'react';

import './Login.css';

import logo from "../../logo.svg";

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import { envLoader } from '../../env/envLoader';

const apiUrl = "http://localhost:8080/api";

function Register() {

    const [form,setForm] = useState({
      "firstName":"",
      "lastName": "",
      "telephone": "",
      "user":{"username":"", "password":""}
    })

    const [error,setError] = useState(false);

    const [errorMsg,setErrorMsg] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
      }
  
  
    const handleChange = async e =>{

        if(e.target.name==='username' || e.target.name==='password'){
            setForm({...form,user:{...form.user,[e.target.name]: e.target.value}})
      
        } else {
            setForm({...form, [e.target.name] : e.target.value});
      }
  
      }


     
  
    const handleButton =(e) => {

        let url = apiUrl + "/register";

        if(validate(form)){
          axios.post(url,form)
          .then( response =>{
            if(response.status === 200){
              alert("Se ha registrado el usuario correctamente");
              window.location.replace('/login');
            }

        }).catch(error => {
          setError(true);
          setErrorMsg("El nombre de usuario ya existe");
        });
        
        }else{
          setError(true);
          setErrorMsg("La longitud de los campos debe ser mayor que 1");
        }
       
        
        
    }


      return(

            <React.Fragment>

              <div className="wrapper fadeInDown">
              <div id="formContent">
              
                <div className="fadeIn first">
                  <img src={logo} width="100px" alt="User Icon" />
                </div>

                <form onSubmit={handleSubmit}>
                  <input type="text"  className="fadeIn second" name="firstName" placeholder="Nombre" required onChange={handleChange}/>
                  <input type="text"  className="fadeIn second" name="lastName" placeholder="Apellidos" required onChange={handleChange}/>
                  <input type="text"  className="fadeIn second" name="telephone" placeholder="Telefono" required onChange={handleChange}/>
                  <input type="text"  className="fadeIn second" name="username" placeholder="Usuario" required onChange={handleChange}/>
                  <input type="password" className="fadeIn third" name="password" placeholder="Contraseña" required onChange={handleChange}/>
                  <input type="submit" className="fadeIn fourth" value="Registrarse" onClick={handleButton}/>
                </form>

            {error === true &&
              <div className="alert alert-danger" role = "alert">
                {errorMsg}
              </div>
            }
            </div>
            </div>


            </React.Fragment>



        )

}


function validate(props){
  if (props["firstName"].length > 1 && props["lastName"].length > 1 && props["telephone"].length > 1 && props.user["username"].length > 1 && props.user["password"].length > 1){
    return true;
    }else{
      return false;
    }
  }

export default Register;






