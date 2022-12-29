import {useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import "./Home.css"
import {auth} from "../../firebaseCenection"
import {signInWithEmailAndPassword} from "firebase/auth"

export default function Home() {
    const [email,setEmail] = useState("")
    const [password,setpassword] = useState("")
    let navigate = useNavigate()

   async function handleLogin(e){
        e.preventDefault()
        if(email !== "" && password !== ""){
           await signInWithEmailAndPassword(auth,email,password)
           .then(()=>{
            
              navigate("/admin",{replace:true})

              .catch(()=>{
                console.log("Erro ao fazer login!")
              })
           })
        }else{
            alert("Preencha os campos")
        }
    }

    return(
      <div className="home-container">
        <h1>Lista de tarefas</h1>
        <span>Gerencie Sua agenda de forma fácil</span>
        <form className="form" onSubmit={handleLogin}>
            <input type="text" placeholder="Digite seu email..." 
            value={email} onChange={e=>setEmail(e.target.value)}>
            </input>
            <input type="password" placeholder="********" autoComplete="false"
            value={password} onChange={e=>setpassword(e.target.value)}>
            </input>
            
            <button type="submit">Acessar</button>
            <Link className="button-link" to="/register">Não possui uma conta? Cadastre-se</Link>
        </form>
      </div>
    )
  
  }