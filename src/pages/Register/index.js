import {useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import {auth} from "../../firebaseCenection"
import {createUserWithEmailAndPassword,} from "firebase/auth"


export default function Register() {
    const [email,setEmail] = useState("")
    const [password,setpassword] = useState("")
    const navigate = useNavigate()

   async function handleRegister(e){
        e.preventDefault()
        if(email !== "" && password !== ""){
           await createUserWithEmailAndPassword(auth,email,password)
           .then(()=>{
              navigate("/admin",{replace:true})
           })
           .catch(()=>{
            console.log("Erro ao registrar usuário!")
           })
        }else{
            alert("Preencha os campos")
        }
    }

    return(
      <div className="home-container">
        <h1>Cadastre-se</h1>
        <span>Vamos criar sua conta!</span>
        <form className="form" onSubmit={handleRegister}>
            <input type="text" placeholder="Digite seu email..." 
            value={email} onChange={e=>setEmail(e.target.value)}>
            </input>
            <input type="password" placeholder="********" autoComplete="false"
            value={password} onChange={e=>setpassword(e.target.value)}>
            </input>
            
            <button type="submit">Cadastrar</button>
            <Link className="button-link" to="/">Já possui uma conta? Faça login!</Link>
        </form>
      </div>
    )
  
  }