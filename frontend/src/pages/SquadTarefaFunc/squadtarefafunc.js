import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import api from '../../service/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import './squadtarefafunc.css';
import {format} from 'date-fns';
import formatarDataBr from '../../utils/formatarDataBr';
import Modal from '@material-ui/core/Modal';
import { toast } from 'react-toastify';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#303030",
    boxShadow: "2px 2px 33px 0px rgba(0,0,0,0.32)",
    borderRadius: "20px",
    display: 'flex',
    width: "100%",
    color: "#7A57EA"
  }, 
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: "#303030",
    boxShadow: "-1px 4px 16px 2px rgba(0,0,0,0.48)",
    padding: theme.spacing(2, 4, 3),
    outline: 0,
    borderRadius: "3px"
  },
  formEdit: {
    display: "flex",
    flexDirection: "column",
    padding: "10px"
  },
  formDel: {
    display: "flex",
    padding: "16px",
    marginTop: "5px",
    justifyContent: "space-between"
  }
}));

function getModalStyle() {
  
  return {
    top: `${40}%`,
    left: `${55}%`,
    transform: `translate(-${50}%, -${50}%)`,
  };
} 


const SquadTarefaFunc = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [squadTarefa, setSquadTarefa] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [open, setOpen] = useState(false);

  const [id_squadtarefa, setIdSquadTarefa] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (id_squadtarefa) => {
    setIdSquadTarefa(id_squadtarefa);
    setOpen(true);
  };

  
  const ExcluirSquadTarefa = async (e) => {
      e.preventDefault();
      console.log("IdSquadTarefa: ", id_squadtarefa);
      const response = await api.delete(`/squadtarefausuario/${id_squadtarefa}`);

      if(response.status === 200) {
        toast.success(response.data.mensagem);
        setSquadTarefa(squadTarefa.filter((t) => {
            return t.id_squadtarefa !== id_squadtarefa;
        }));
        handleClose();
      }

  };
  
  const ListarSquadTarefa = async () => {    
    const response = await api.get(`/squadtarefausuario?page=${page}`);

    if(response.status === 200) {
      setSquadTarefa(squadTarefa.concat(response.data));
      setTotalPage(response.headers['x-total-count']);     
    }

  };    
  
  const fetchMoreData = () => {
    setTimeout(() => {  

      if(page < totalPage) {          
          setPage(page + 1);
      }

      if(squadTarefa.length >= totalPage) {
        setHasMore(false);
      }

      ListarSquadTarefa();
    
    }, 800);

  };

  const bodyExcluir = (
    <div style={modalStyle} className={classes.paper}>
      <h2 style={{color: "#7A57EA", marginBottom: "11px", textAlign: "center"}} id="simple-modal-title">Tem certeza que você deseja excluir?</h2>
      <div id="simple-modal-description">
          <form className={classes.formDel} onSubmit={ExcluirSquadTarefa} >
                <button style={{marginTop: "35px"}} className="btn_sim" type="submit">Sim</button>
                <button style={{marginTop: "35px"}} className="btn_nao" onClick={() => handleClose()}>Não</button>
          </form>
      </div>
    </div>
  );

  
  
  useEffect(() => {  
    (async () => {
      
      const response = await api.get(`/squadtarefausuario?page=${page}`);

      if(response.status === 200) {
        setSquadTarefa(squadTarefa.concat(response.data));
        setTotalPage(response.headers['x-total-count']);
        setPage(page + 1);     
      };

    })();
  
  }, []);

  return (
    <div className="contentSquads">
        <h1 className="titleSquads">Tarefas das Squads</h1>        
        <div className={classes.root}>        
        {     
              <InfiniteScroll
                dataLength={squadTarefa.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={ squadTarefa.length > 0 ? <h4 style={{textAlign: "center", color: "#FE963D"}}>Carregando....</h4> : ""}
                endMessage={
                  squadTarefa.length > 0 ?
                    <h1 style={{textAlign: 'center', color: "#FE963D", marginBottom: "15PX"}}>
                      <b>Fim das tarefas!</b>
                    </h1> 
                  : ""
                }
              >
                <div className="cardSquadTarefa">
                  {   
                      squadTarefa.length > 0 ?
                        squadTarefa && squadTarefa.map((t, y) => {                
                          return <div className="cardSquadTarefaContent" key={y}>
                                    <div className="headerTarefa"> 
                                      <p className="titleTarefaContent">{t.tarefa_nome }</p>
                                      <div className="squadIcon">
                                          <CreateRoundedIcon style={{cursor:'pointer'}} 
                                              onClick={() => {                                              
                                                handleOpen(t.id_squadtarefa);
                                              }}
                                          />
                                          <DeleteRoundedIcon style={{marginLeft:"15px", cursor:'pointer'}} 
                                              onClick={() => {
                                                handleOpen(t.id_squadtarefa);
                                              }}
                                          />
                                      </div>                                    
                                    </div>
                                    <div className="tarefaContent">
                                        <ul className="ulContent">
                                            <li><span>Descrição: </span>{t.tarefa_descricao}</li>
                                            <li><span>Projeto: </span>{t.projeto ? t.projeto : "Não atribuido"}</li>
                                            <li><span>Squad: </span>{t.squad}</li>
                                            <li><span>Prazo: </span>{formatarDataBr(format(new Date(t.prazo), "yyyy-MM-dd"))}</li>
                                            <li><span>Hora Estimada: </span>{t.hora_estimada ? t.hora_estimada : "Sem hora estimada"}hr</li>
                                        </ul>
                                    </div>
                                 </div>
                        })
                      : <h1 style={{color: "#7A57EA", margin: "auto", textAlign: "center"}}>Squads sem tarefas</h1>
                    }
                </div>
              </InfiniteScroll>                   
               
              
          }
        
        </div> 
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {
                    bodyExcluir
                }
            </Modal>
        </div>       
    </div>
  );
}
export default SquadTarefaFunc;