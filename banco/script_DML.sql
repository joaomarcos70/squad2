/*
	Script de DML Para teste
*/

USE fcamara;

-- tipo_usuario
INSERT INTO tipo_usuario(nivel) VALUES('adm'),('gestor'),('funcionario');
SELECT * FROM tipo_usuario;

-- cargo
INSERT INTO cargo(nome) VALUES
('Abastecedor de Linha de Produção'),
('Abastecedor de Máquinas'),
('Acabador de Embalagens'),
('Açougueiro'),
('Acrilista'),
('Acupunturista'),
('Aderecista'),
('Adesivador'),
('Adestrador'),
('Administrador'),
('Administrador de Contratos'),
('Administrador de Dados'),
('Administrador de E-commerce'),
('Administrador de Empresas'),
('Administrador de Sistemas'),
('Administrador Financeiro'),
('Administrador Hospitalar'),
('Administrador Predial'),
('Administrativo de Obras'),
('Advogado'),
('Advogado Administrativo'),
('Advogado Ambientalista'),
('Advogado Cível'),
('Advogado Consumerista'),
('Advogado Criminalista'),
('Advogado de Contratos'),
('Advogado de Propriedade Intelectual'),
('Advogado Eleitoral'),
('Advogado Empresarial'),
('Advogado Imobiliário'),
('Advogado Securitário'),
('Advogado Societário'),
('Advogado Trabalhista'),
('Advogado Tributarista'),
('Afiador de Ferramentas'),
('Agente de Aeroporto'),
('Agente de Cargas'),
('Agente de Segurança'),
('Agente de Serviços'),
('Agente de Viagens'),
('Agente Funerário'),
('Agricultor Urbano'),
('Ajudante de Caldeiraria'),
('Ajudante de Carga e Descarga'),
('Ajudante de Carpinteiro'),
('Ajudante de Churrasqueiro'),
('Ajudante de Despachante Aduaneiro'),
('Ajudante de Encanador'),
('Ajudante de Estamparia'),
('Ajudante de Fundição'),
('Ajudante de Funilaria'),
('Ajudante de Instalação'),
('Ajudante de Lubrificação'), 
('Analista de Mercado'),
('Analista de Merchandising'),
('Analista de Métricas'),
('Analista de Mídia'),
('Analista de Mídia Online'),
('Analista de Mídias Sociais'),
('Analista de MIS'),
('Analista de Monitoramento'),
('Analista de Negócios'),
('Analista de Negócios de TI'),
('Analista de Operações'),
('Analista de Outsourcing'),
('Analista de Ouvidoria'),
('Analista de Patrimônio'),
('Analista de PCM'),
('Analista de PCP'),
('Analista de Pesquisa de Mercado'),
('Analista de Planejamento'),
('Analista de Planejamento Estratégico'),
('Analista de Planejamento Financeiro'),
('Analista de Pós-venda'),
('Analista de Prevenção de Perdas'),
('Analista de Pricing'),
('Analista de Processos'),
('Analista de Processos e Qualidade'),
('Analista de Processos Gerenciais'),
('Analista de Processos Industriais'),
('Analista de Produção'),
('Analista de Produto'),
('Analista de Projetos'),
('Analista de Publicidade e Propaganda'),
('Analista de QSMS'),
('Analista de Sistema de Gestão Integrada'),
('Analista de Sistemas'),
('Analista de Sistemas .NET'),
('Analista de Sistemas COBOL'),
('Analista de Sistemas Delphi'),
('Analista de Sistemas ERP'),
('Analista de Sistemas Java'),
('Analista de Sistemas Linux'),
('Analista de Sistemas Mainframe'),
('Analista de Sistemas Microsiga'),
('Analista de Sistemas Oracle'),
('Analista de Sistemas PHP'),
('Analista de Sistemas PL SQL'),
('Analista de Sistemas SharePoint'),
('Analista de Sistemas SQL'),
('Analista de Sistemas Web'),
('Analista Pedagógico'),
('Analista Planejamento e Orçamento'),
('Analista Programador'),
('Analista Programador .NET'),
('Analista Programador ADVPL'),
('Analista Programador Android'),
('Analista Programador ASP.NET'),
('Analista Programador C#'),
('Analista Programador C++'),
('Analista Programador Cobol'),
('Analista Programador Delphi'),
('Analista Programador Front-end'),
('Analista Programador Java'),
('Analista Programador Mainframe'),
('Analista Programador Oracle'),
('Analista Programador PHP'),
('Analista Programador PL SQL'),
('Analista Programador Progress'),
('Analista Programador Protheus'),
('Analista Programador SharePoint'),
('Analista Programador SQL'),
('Analista Programador VB6'),
('Analista Programador Web'),
('Analista Programador WebSphere'),
('Aprendiz na área de Informática'),
('Programador Oracle'),
('Programador PHP'),
('Programador PL SQL'),
('Programador PowerBuilder'),
('Programador Progress'),
('Programador Protheus'),
('Programador Python'),
('Programador QlikView'),
('Programador Ruby on Rails'),
('Programador SAP'),
('Programador SharePoint'),
('Programador SOA'),
('Programador SQL'),
('Programador Trainee'),
('Programador Visual'),
('Programador Visual Basic'),
('Programador Visual FoxPro'),
('Programador Web');

SELECT * FROM cargo;

-- status_usuario
INSERT INTO status_usuario(tipo) VALUES('ativo'),('inativo'),('ferias');
SELECT * status_usuario

-- usuario
INSERT INTO usuario(nome, email, senha, cpf, id_tipousuario, id_cargo, id_status) 
VALUES('administrador', 'adm@adm.com', '123', '00000000000', 1, 1, 1);
SELECT * FROM usuario;









