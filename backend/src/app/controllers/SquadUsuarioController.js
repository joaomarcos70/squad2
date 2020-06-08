import db from '../../database/connection';

class SquadUsuarioontroller {
    async store(req, res) {
        const tipoUsuario = req.tipoUsuario;
        const { id_squad, id_usuario } = req.body;

        if(tipoUsuario === 3) {
            return res.status(401).json({ error: "Não autorizado!"});
        }
        
        if(!(id_squad && id_usuario)) {
            return res.status(400).json({ error: "Squad e usuário são obrigatórios!"});
        }

        // Iremos verificar se o usuário já pertence a squad que foi passada
        const usuarioPertenceSquad = await db("squad_usuario")
            .select("usuario.nome as nome", "squad.nome as squad")
            .join("usuario", { "usuario.id_usuario" : "squad_usuario.id_usuario" })
            .join("squad", { "squad.id_squad" :  "squad_usuario.id_squad" })
            .where({
                "squad_usuario.id_squad" : id_squad,
                "squad_usuario.id_usuario" : id_usuario
            })
            .first();
        
        if(usuarioPertenceSquad) {
             return res.status(400).json({ 
                 error: 
                    `O funcionário ${usuarioPertenceSquad.nome} já pertence a squad ${usuarioPertenceSquad.squad}.`
            });
        }

        try {
            const novoUsuarioSquad = await db("squad_usuario").insert({
                id_squad,
                id_usuario
            });

            if(novoUsuarioSquad) {
                return res.json({ mensagem: "Usuário foi incluindo a squad com sucesso!"});
            }
            
        } catch (error) {
            return res.status(400).json({ error: "Erro ao incluir usuário a squad!" });
        }

    }

    async update(req, res) {
        const tipoUsuario = req.tipoUsuario;
        const { id_squad, id_usuario } = req.body;

        if(tipoUsuario === 3) {
            return res.status(401).json({ error: "Não autorizado!"});
        }
        
        if(!(id_squad && id_usuario)) {
            return res.status(400).json({ error: "Squad e usuário são obrigatórios!"});
        }

        const existeUsuarioSquad = await db("squad_usuario")
        .select("*")        
        .where({
            "squad_usuario.id_squad" : id_squad,
            "squad_usuario.id_usuario" : id_usuario
        })
        .first();

        if(!existeUsuarioSquad) {
            return res.status(400).json({ error: "Usuário ou squad não encontrado!"});
        }

        try {
            const usuario_editado = await db('squad_usuario')
            .where({
                "squad_usuario.id_squad" : id_squad,
                "squad_usuario.id_usuario" : id_usuario
            })
            .update({
                id_squad,
                id_usuario
            });
            
            console.log(usuario_editado)

            if(usuario_editado) {
                return res.json({error: "Alteração realizada com sucesso!"});
            }
            
        } catch (error) {
            return res.status(500).json({error: "Erro interno no servidor."});
        }

        return res.json({});
    }
}

export default new SquadUsuarioontroller();