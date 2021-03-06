import React, {useEffect, useState} from 'react';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import LocalDiningRoundedIcon from '@material-ui/icons/LocalDiningRounded';
import TransferWithinAStationRoundedIcon from '@material-ui/icons/TransferWithinAStationRounded';
import EmojiPeopleRoundedIcon from '@material-ui/icons/EmojiPeopleRounded';
import {Card} from '@material-ui/core/';
import {format} from 'date-fns';
import CardContent from '@material-ui/core/CardContent';
import api from '../../service/api';
import Botao from '../../components/Botao/Botao';
import {parseJWT} from '../../service/parseJWT';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './ponto.css';
import { toast } from 'react-toastify';


const useStyles = makeStyles((theme)=>({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none !important'
      }
}))

export default function Ponto(){
    const [ponto,setPonto] = useState([]);
    const [tarefalist,setTarefalist] = useState([]);
    const [open, setOpen] = useState(false);
    const [checkTarefa, setCheckTarefa] = useState([]);
    const [desc,setDesc] = useState("");
    const [botao, setBotao] = useState("");
    const [mensagem, setMensagem] = useState("");
    const classes = useStyles();
    
    
    const pontos = async () => {
       await api.get('/timesheet')
        .then(response => {
            setPonto(response.data);
        })
    }

    const tarefas = async () => {
        let x 
        await api.get("/usuariotarefa")
        .then(response => {
            setTarefalist(response.data);
          x  = response.data
        })
        if(x.length > 0){
            setBotao("block");
            setMensagem("none");
        }
        else{
            setBotao("none");
            setMensagem("block");
        }
        
    }
    
    useEffect(()=>{
        pontos();
        tarefas();
        
    },[]);

    
    const handleOpen = (index) => {
        setOpen(true);
        setDesc(tarefalist[index].descricao);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const batePonto = async () =>{
        await api.put('/timesheet')
        .then(response => {
            pontos();
        })
        
    }

    const handleCheck = (evento,id_tarefa) => {
        let x = [...checkTarefa];

       if(evento.target.checked === true){
        x = [...checkTarefa,id_tarefa];
        setCheckTarefa(x);
       } 
       else{
           let index = x.findIndex((k) => {
               return k === id_tarefa;
           });

           x.splice(index,1);

           setCheckTarefa(x);
           
       }

    }


    const confirmar =  () => {
        checkTarefa.map(async (tarefa) =>{
           const response = await api.put(`/concluirtarefa/${tarefa}`,{'entregue':true});

           if(response.status === 200){
               toast.success(response.data.mensagem);
               tarefas();
           }
        })
        
    }

    const detalhes =(
      
        <Card style={{borderRadius:'20px',marginTop:'20px' }} >
            <CardContent style={{minWidth:'250px',display:'flex',justifyContent:'center',alignItems:'center'}} className="card">
                <p style={{color:'#FE963D', marginBottom:'20px', fontSize:'20px' }} >{desc}</p>
            </CardContent>
        </Card>
    )
    const tipoUsuario = parseJWT().id_tipousuario;
    return(
        <div className="container">
            <p style={{color:'#FE963D',fontWeight:'bold',fontSize:'40px',marginRight:"15%", marginTop:'20px'}}>Horários</p>
             {
            ponto && ponto.map((ponto) => {
                let x = format(new Date(),"yyyy-dd-MM");
                let y = format(new Date(ponto.data_ponto),"yyyy-dd-MM");
                if(y === x) {         
                    return <Card style={{borderRadius:'20px',marginTop:'20px', minHeight:'300px', minWidth:'535px' }} key={ponto.id_timesheet}>
                        <CardContent style={{minWidth:'535px',minHeight:'300px'}} className="card">
                            <div>
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <span style={{marginBottom:'20px',color:'#FE963D', marginRight: "5px"}}><WorkRoundedIcon style={{fontSize:'30px'}}/></span>
                                    <p style={{color:'#FE963D', marginBottom:'20px',justifySelf:'center',fontSize:'20px'}}>
                                        {ponto.entrada}
                                    </p>
                              </div>

                              <div style={{display:'flex',alignItems:'center'}}>
                                <span style={{marginBottom:'20px',color:'#FE963D', marginRight: "5px"}}><LocalDiningRoundedIcon style={{fontSize:'30px'}}/></span>
                                <p style={{color:'#FE963D', marginBottom:'20px',fontSize:'20px'}}>{ponto.almoco_ida}</p>
                              </div>
                              
                              <div style={{display:'flex',alignItems:'center'}}>
                                <span style={{marginBottom:'20px',color:'#FE963D', marginRight: "5px"}}><TransferWithinAStationRoundedIcon style={{fontSize:'30px'}}/></span>
                                <p style={{color:'#FE963D', marginBottom:'20px',fontSize:'20px'}}>{ponto.almoco_volta}</p>
                              </div>
                              
                              <div style={{display:'flex',alignItems:'center'}}>
                                <span style={{marginBottom:'20px',color:'#FE963D', marginRight: "5px"}}><EmojiPeopleRoundedIcon style={{fontSize:'30px'}}/></span>
                                <p style={{color:'#FE963D', marginBottom:'20px',fontSize:'20px'}}>{ponto.saida}</p>
                              </div>
                              <h1 style={{textAlign:'right'}}><Botao children="Ponto" funcao={batePonto}/></h1>
                            </div>

                            
                        </CardContent>
                    </Card>
                }
                else {
                    return <div key={ponto.id_timesheet}></div>
                }    
                
            })
        }
    
        <p style={{color:'#FE963D',fontWeight:'bold',fontSize:'40px',marginRight:"15%", marginTop:'20px'}}>Tarefas</p>
      
        <div style={{borderRadius:'20px',marginTop:'20px',minHeight:'150px'}} >
            
            <div style={{minWidth:'300px',maxWidth:'600px',minHeight:'100%'}} className="cardTarefa">
            <div style={{color:'#FE963D', marginBottom:'20px',fontSize:'20px', textAlign:'center', display:mensagem, margin:'50px' }}>Não há tarefas</div>
                {
                    parseJWT().id_tipousuario === 3 ?
                    
                    tarefalist && tarefalist.map((tarefalist,ind)=>{
                        let data = format(new Date(tarefalist.prazo),"dd/MM/yyyy")
                       return  <div className="tarefa" style={{cursor:'pointer'}} key={tarefalist.id_tarefa} >
                            
                            <div style={{color:'#FE963D', marginBottom:'20px',fontSize:'20px', textAlign:'center' }} onClick={(evento)=>handleOpen(ind)}>{ind+1}</div>
                            
                            <div style={{color:'#FE963D', marginBottom:'20px',fontSize:'20px', textAlign:'center' }} onClick={(evento)=>handleOpen(ind)}>{tarefalist.nome}</div>
                            
                            <div style={{color:'#7A57EA', textAlign:'center',fontSize:'20px'}} onClick={()=>handleOpen(ind)} >{data}</div>

                           
                            <div style={{marginTop:'13px', textAlign:'center'}} className="box">
                                <label >
                                <input type="checkbox"  onChange={(evento) => handleCheck(evento,tarefalist.id_tarefa)}/>
                                <span></span>
                                </label></div>
                           
                       </div>
                    }) : 
                    tarefalist && tarefalist.map((tarefalist,ind)=>{
                        let data = format(new Date(tarefalist.prazo),"dd/MM/yyyy");
                        return  <div className="tarefaGest" style={{cursor:'pointer'}} key={tarefalist.id_tarefa} >
                       
                           <div style={{color:'#FE963D', marginBottom:'20px',fontSize:'20px', textAlign:'center' }} onClick={(evento)=>handleOpen(ind)}>{tarefalist.nome}</div>
                            
                           <div style={{color:'#7A57EA', textAlign:'center',fontSize:'20px'}} onClick={()=>handleOpen(ind)} >{data}</div>
                           
                           <div style={{color:'#FE963D', textAlign:'center',fontSize:'20px' }} onClick={()=>handleOpen(ind)}>{tarefalist.funcionario}</div>
                           
                          
                       </div>
                      
                    })
                  
                }

                {
                    tipoUsuario === 3?
                    <div style={{marginLeft:'76%',marginTop:'80px', marginBottom:'10px',display:botao}}><Botao height="40px" children="Confirmar" funcao={confirmar}/></div>  : null
                }
            </div>
        </div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        {detalhes}
      </Modal>
    </div>       
    )
}