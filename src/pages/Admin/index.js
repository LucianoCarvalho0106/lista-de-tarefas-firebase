import "./Admin.css"
import {useEffect, useState} from "react"
import {signOut} from "firebase/auth"
import {auth,db} from "../../firebaseCenection"
import {addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
    deleteDoc,
    updateDoc
} from "firebase/firestore"
import { async, jsonEval } from "@firebase/util"

export default function Admin(){
    const [tarefaInput,setTarefaInput] = useState("")
    const [user,setUser] = useState({})
    const [tarefas,setTarefas]= useState([])
    const [edit,setEdit] = useState({})

    useEffect(()=>{
        async function loadTarefas(){
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))

            if(userDetail){
                const data = JSON.parse(userDetail)
                const tarefaRef = collection(db,"tarefas")
                const q = query(tarefaRef,orderBy("created","desc"),where("userUid", "==", data.uid))
                const onsub = onSnapshot(q,(snapshot)=>{
                    let lista= []

                    snapshot.forEach(doc=>{
                        lista.push({
                            id:doc.id,
                            tarefa:doc.data().tarefa,
                            useruid: doc.data().userUid
                        })
                    })
                    console.log(lista)
                    setTarefas(lista)

                })
            }
        }

        loadTarefas()
    },[])

    async function handleRegister(e){
        e.preventDefault()
        if(tarefaInput === ""){
            alert("Digite sua tarefa!")
            return;
        }

        if(edit.id){
            handleUpdateTarefa()
            return;
        }

        await addDoc(collection(db,"tarefas"),{
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user.uid
        })
        .then(()=>{
            console.log("tarefa registrada")
            setTarefaInput("")
        })
        .catch(error=>{
            console.log("Erro ao registrar " + error)
        })
    }

    async function handleLogout(){
      await signOut(auth)
      .then(()=>{
        alert("Usuário deslogado")
      })
    }
    async function deleteTarefa(id){
        const docRef = doc(db,"tarefas",id)
        await deleteDoc(docRef)

    }
    async function editTarefa(item){
        setTarefaInput(item.tarefa)
        setEdit(item)
    }

    async function handleUpdateTarefa(){
        const refDoc = doc(db,"tarefas",edit.id)
        await updateDoc(refDoc,{
            tarefa: tarefaInput
        })
        .then(()=>{
            console.log("Tarefa atualizada")
            setTarefaInput("")
            setEdit({})
        })
        .catch(()=>{
            console.log("Erro ao atualizar tarefa")
            setTarefaInput("")
            setEdit({})
        })
    }

    return(
        <div className="admin-container">
            <h1>Minhas tarefas</h1>
            <form className="form" onSubmit={handleRegister}>
                <textarea value={tarefaInput} onChange={e=>setTarefaInput(e.target.value)} placeholder="Digite sua tarefa">
                </textarea>
                {Object.keys(edit).length > 0 ? (<button className="btn-register" type='submit'>Editar Tarefa</button>) : <button className="btn-register" type='submit'>Registrar Tarefa</button>}
            </form>
        
            {
                tarefas.map(item=>{
                    return(
            <article className="list" key={item.id}>
                <p>{item.tarefa}</p>
                <div>
                    <button onClick={()=>editTarefa(item)}>Editar</button>
                    <button onClick={()=>deleteTarefa(item.id)} className="btn-delete">Concluir</button>
                </div>
            </article>
                    )
                })
            }

            <button onClick={handleLogout} className="btn-logout">Sair</button>
        </div>
    )
}