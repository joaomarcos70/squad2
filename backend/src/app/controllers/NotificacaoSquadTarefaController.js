import db from '../../database/connection';
import NotificacaoSquadTarefa from '../models/NotificacaoSquadTarefa';
import formatarDataBr from '../../utils/formatarDataBr';

class NotificacaoSquadTarefaController {
    async index(req, res) {
        const notificacoes_squad = new Array();
        const id_usuario = req.idUsuario;
        const squadsUsuario = await db("squad_usuario").where({ id_usuario });

        if(!squadsUsuario) {
            return res.status(400).json({ mensagem: "Usuário não pertence a nenhuma squad!" });
        }   

        for(let id of squadsUsuario ) {
            const notificacoes = await NotificacaoSquadTarefa.find({
                squad: id.id_squad,
                lido: false
            })
            .sort({ createdAt: 'desc' })
            .limit(10);

            for(let notificacao of notificacoes) {
                notificacoes_squad.unshift(notificacao);
            }
            
        }

        const notificacoesSquadOrdenada = notificacoes_squad.sort((a,b) => {
            return b.createdAt - a.createdAt;
        })


        return res.json(notificacoesSquadOrdenada);
    }

    async store(req, res) {
        const { id_squad } = req.body

        const notificacao = await NotificacaoSquadTarefa.create({
            conteudo: `Você tem uma nova tarefa - ${formatarDataBr(new Intl.DateTimeFormat('pt-BR').format(new Date))}`,
            squad: id_squad,
        });

        return res.json(notificacao);

    }

    async update(req, res) {
        const notificacao = await NotificacaoSquadTarefa.findByIdAndUpdate(req.params.id, 
            { lido: true},
            { new: true}
        );

        return res.json(notificacao);
    }
}

export default new NotificacaoSquadTarefaController();