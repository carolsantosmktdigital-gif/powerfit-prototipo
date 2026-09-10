
const A="./assets/powerfit-logo.png";
const students=[
 {name:"Ana Souza",phone:"(21) 98765-4321",goal:"Emagrecimento",freq:"3x/semana",weight:"88 kg",status:"Ativo"},
 {name:"João Silva",phone:"(21) 97654-3210",goal:"Hipertrofia",freq:"3x/semana",weight:"78 kg",status:"Ativo"},
 {name:"Carla Mendes",phone:"(21) 98876-6655",goal:"Condicionamento",freq:"2x/semana",weight:"72 kg",status:"Ativo"},
 {name:"Marcos Lima",phone:"(21) 99999-1234",goal:"Reabilitação",freq:"2x/semana",weight:"91 kg",status:"Inativo"},
 {name:"Juliana Alves",phone:"(21) 98678-5544",goal:"Hipertrofia",freq:"3x/semana",weight:"69 kg",status:"Ativo"},
 {name:"Pedro Santos",phone:"(21) 97777-8899",goal:"Condicionamento",freq:"2x/semana",weight:"84 kg",status:"Ativo"}
];
let role=null, screen="home", toastTimer;

function app(){document.getElementById("app").innerHTML=role?renderShell():renderLogin()}
function renderLogin(){
 return `<div class="login"><div class="loginbox">
 <img src="${A}"><h1>STUDIO <span class="orange">POWER FIT</span></h1>
 <p>Protótipo navegável do sistema de gestão</p>
 <input class="input" placeholder="CPF ou e-mail"><input class="input" placeholder="Senha" type="password">
 <button class="btn primary" onclick="enter()">Entrar</button>
 <p style="margin-top:14px">Demonstração para avaliação dos sócios</p>
 <div class="choice">
  <button onclick="choose('student')">👤<br><b>Aluno</b></button>
  <button onclick="choose('teacher')">🏋️<br><b>Professor</b></button>
  <button onclick="choose('reception')">🖥️<br><b>Recepção / Gestão</b></button>
 </div></div></div>`
}
function choose(r){role=r;screen="home";app(); if(innerWidth<850) window.scrollTo(0,0)}
function enter(){if(!role) return; screen="home";app()}
function nav(s){screen=s;app()}
function renderShell(){
 const names={student:"Área do Aluno",teacher:"Área do Professor",reception:"Recepção / Gestão"};
 return `<div class="shell"><header class="top"><div class="brand"><img src="${A}"><b>STUDIO <span>POWER FIT</span></b></div><div class="role">${names[role]} · <a href="#" onclick="role=null;app();return false">Sair</a></div></header>
 <div class="layout"><aside class="sidebar">${sideNav()}</aside><main class="main">${content()}</main></div>
 <nav class="bottom">${bottomNav()}</nav></div>`
}
function sideNav(){
 const items=role==="student"?[
 ["home","⌂","Início"],["appointments","▣","Agendamentos"],["payments","▤","Pagamentos"],["evolution","↗","Minha evolução"],["profile","◉","Meu perfil"]]:
 role==="teacher"?[
 ["home","⌂","Minha agenda"],["students","♙","Alunos"],["evaluations","▣","Avaliações"],["search","⌕","Pesquisar aluno"],["profile","◉","Meu perfil"]]:
 [["home","⌂","Início"],["agenda","▣","Agenda"],["students","♙","Alunos"],["payments","▤","Pagamentos"],["teachers","♟","Professores"],["waitlist","⌛","Lista de espera"],["reports","▥","Relatórios"],["profile","◉","Minha conta"]];
 return items.map(x=>`<button class="nav ${screen===x[0]?'active':''}" onclick="nav('${x[0]}')">${x[1]} ${x[2]}</button>`).join("")
}
function bottomNav(){
 const items=role==="student"? [["home","Início"],["appointments","Agendamentos"],["payments","Pagamentos"]]:
 role==="teacher"? [["home","Agenda"],["students","Alunos"],["profile","Perfil"]]:
 [["home","Início"],["agenda","Agenda"],["students","Alunos"],["payments","Pagamentos"],["waitlist","Mais"]];
 return items.map(x=>`<button class="${screen===x[0]?'active':''}" onclick="nav('${x[0]}')">${x[1]}</button>`).join("")
}
function content(){
 if(role==="student") return student();
 if(role==="teacher") return teacher();
 return reception();
}
function header(title,sub=""){return `<div class="hero"><h1>${title}</h1><p>${sub}</p></div>`}
function student(){
 if(screen==="appointments") return studentAppointments();
 if(screen==="payments") return payments();
 if(screen==="evolution") return evolution();
 if(screen==="profile") return profile(students[0]);
 return `${header("Olá, João!","Bora para mais um treino?")}<div class="cards">
 <div class="card"><div class="label">Próximo treino</div><div class="metric" style="font-size:19px">Hoje · 18:00</div><span class="pill green">Confirmado</span></div>
 <div class="card"><div class="label">Frequência do mês</div><div class="metric">8/12</div><small>treinos realizados</small></div>
 <div class="card"><div class="label">Evolução</div><div class="metric">78 kg</div><small>peso atual</small></div>
 <div class="card"><div class="label">Desafio mensal</div><div class="metric">75%</div><small>3 de 4 semanas</small></div></div>
 <div class="grid2"><section class="section"><h2>Próximo treino</h2><div class="row"><div><b>25/04 · 18:00</b><br><small>Musculação · Professor definido pela academia</small></div><span class="pill green">Confirmado</span></div></section>
 <section class="section"><h2>Acesso rápido</h2><div class="actions"><button class="btn primary" onclick="nav('appointments')">Agendar treino</button><button class="btn" onclick="nav('evolution')">Ver evolução</button></div></section></div>`
}
function studentAppointments(){
 return `${header("Agendamentos","Musculação · escolha apenas data e horário")}
 <div class="tabs"><button class="tab active">Meus agendamentos</button><button class="tab" onclick="showSchedule()">Agendar</button></div>
 <section class="section"><div class="row"><div><b>Hoje, 25/04 · 18:00</b><br><small>Professor definido pela academia</small></div><span class="pill green">Confirmado</span><button class="btn" onclick="cancel()">Cancelar</button></div>
 <div class="row"><div><b>26/04 · 18:00</b><br><small>Você está em <b class="orange">3º lugar</b> · 5 pessoas aguardando</small></div><span class="pill yellow">Lista de espera</span></div></section>
 <div style="margin-top:14px" id="schedule"></div>`
}
function showSchedule(){
 document.getElementById("schedule").innerHTML=`<section class="section"><h2>Escolha o horário</h2><div class="notice">A agenda considera a capacidade dos professores e os agendamentos realizados pelos canais integrados.</div>
 ${["06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00"].map((t,i)=>`<div class="row"><b>${t}</b><span class="${i===1||i===5?'pill red':'pill green'}">${i===1||i===5?'LOTADO':(4-i%3)+" vagas"}</span>${i===1||i===5?`<button class="btn ghost" onclick="joinWait()">Entrar na lista</button>`:`<button class="btn primary" onclick="book('${t}')">Agendar</button>`}</div>`).join("")}</section>`
}
function book(t){showToast(`Treino de ${t} confirmado. Professor será definido pela academia.`)}
function joinWait(){showToast("Você entrou na lista de espera. Posição: 3º.")}
function cancel(){showModal("Cancelar treino","Deseja cancelar o treino de hoje às 18:00? A vaga será liberada conforme as regras da academia.","Sim, cancelar","Não",()=>showToast("Treino cancelado e vaga liberada."))}
function payments(){return `${header("Pagamentos","Acompanhe sua situação financeira")}
 <div class="card" style="border-color:#2bd477"><span class="pill green">Pagamento identificado com sucesso</span><div class="metric" style="font-size:20px">Mensalista · R$ 150,00</div><small>Vencimento: 10/05</small></div>
 <section class="section" style="margin-top:14px"><h2>Histórico</h2>${["10/04/2025","10/03/2025","10/02/2025"].map(d=>`<div class="row"><span>${d} · Mensalidade</span><span class="pill green">Identificado</span></div>`).join("")}</section>
 <div class="actions" style="margin-top:14px"><button class="btn">Enviar comprovante</button><button class="btn primary">Efetuar pagamento</button><button class="btn">Falar com a recepção</button></div>`
}
function evolution(){return `${header("Minha Evolução","Acompanhe seus resultados ao longo do tempo")}
 <div class="cards"><div class="card"><div class="label">Peso inicial</div><div class="metric">82 kg</div></div><div class="card"><div class="label">Peso atual</div><div class="metric">78 kg</div></div><div class="card"><div class="label">Diferença</div><div class="metric orange">-4 kg</div></div><div class="card"><div class="label">Frequência</div><div class="metric">67%</div></div></div>
 <section class="section"><h2>Histórico de avaliações</h2>${["10/04/2025 · 78 kg","10/01/2025 · 80 kg","10/10/2024 · 82 kg"].map(x=>`<div class="row"><span>${x}</span><button class="btn" onclick="showToast('Detalhes da avaliação exibidos.')">Ver detalhes</button></div>`).join("")}</section>`
}
function profile(s){return `${header("Meu Perfil","Dados pessoais e informações da sua conta")}
 <section class="section"><div class="person"><div class="avatar">JS</div><div><h2 style="margin:0">${s.name}</h2><small>Aluno · ${s.status}</small></div></div><div style="margin-top:16px">${["Telefone: "+s.phone,"E-mail: joao@email.com","CPF: 123.456.789-00","Endereço: Rua das Flores, 123","Profissão: Analista de Sistemas","Altura: 1,78 m","Peso: "+s.weight,"Objetivo: "+s.goal,"Modalidade: Mensalista"].map(x=>`<div class="row"><span>${x}</span><button class="btn">Editar</button></div>`).join("")}</div></section>`}

function teacher(){
 if(screen==="students") return `${header("Alunos","Consulte os alunos agendados e seu histórico")}<section class="section">${students.map(s=>`<div class="row"><div class="person"><div class="avatar">${s.name.split(" ").map(x=>x[0]).slice(0,2).join("")}</div><div><b>${s.name}</b><br><small>${s.goal} · ${s.freq}</small></div></div><button class="btn primary" onclick="studentView('${s.name}')">Ver perfil</button></div>`).join("")}</section>`
 if(screen==="evaluations") return `${header("Agendamentos de avaliação","Professor Coordenador")}
 <section class="section">${students.slice(0,4).map((s,i)=>`<div class="row"><div><b>${s.name}</b><br><small>${25+i}/04 · ${18+i}:00</small></div><span class="pill ${i===0?'green':'yellow'}">${i===0?'Confirmada':'Agendada'}</span></div>`).join("")}</section>`
 if(screen==="search") return `${header("Pesquisar aluno","Nome, CPF ou telefone")}<input class="input" placeholder="Digite para pesquisar..." oninput="filterStudents(this.value)"><div id="results" class="list">${studentRows()}</div>`
 if(screen==="profile") return profile(students[0]);
 return `${header("Minha Agenda","Hoje · alunos atribuídos a você")}<div class="cards"><div class="card"><div class="label">Alunos hoje</div><div class="metric">12</div></div><div class="card"><div class="label">Horários</div><div class="metric">6</div></div><div class="card"><div class="label">Presenças</div><div class="metric">10</div></div><div class="card"><div class="label">Avaliações</div><div class="metric">2</div></div></div>
 <section class="section"><h2>Agenda por horário</h2>${["08:00","09:00","10:00","14:00","18:00","19:00"].map((t,i)=>`<div class="row"><div><b>${t}</b><br><small>${2+i%3} alunos agendados</small></div><button class="btn primary" onclick="nav('students')">Ver alunos</button></div>`).join("")}</section>`
}
function studentRows(){return students.map(s=>`<div class="row"><div><b>${s.name}</b><br><small>${s.phone} · ${s.goal}</small></div><button class="btn" onclick="studentView('${s.name}')">Abrir</button></div>`).join("")}
function filterStudents(q){document.getElementById("results").innerHTML=studentRows().split("</div>").filter(x=>x.toLowerCase().includes(q.toLowerCase())).join("</div>")}
function studentView(name){const s=students.find(x=>x.name===name)||students[0]; showModal("Perfil do aluno",`<b>${s.name}</b><br><small>${s.goal} · ${s.freq} · ${s.weight}</small><hr><b>Constância</b><br>10 presenças · 2 faltas no mês<hr><b>Última avaliação</b><br>10/04/2025 · ${s.weight}`, "Registrar treino","Fechar",()=>showToast("Registro de treino salvo no protótipo."))}
function reception(){
 if(screen==="agenda") return agenda();
 if(screen==="students") return `${header("Alunos","Cadastro e acompanhamento")}<div class="actions" style="margin-bottom:12px"><input class="input" style="max-width:420px;margin:0" placeholder="Nome, CPF ou telefone"><button class="btn primary" onclick="showToast('Formulário de novo aluno aberto.')">+ Novo aluno</button></div><section class="section scroll"><table class="table"><thead><tr><th>Aluno</th><th>Telefone</th><th>Modalidade</th><th>Status</th><th>Ação</th></tr></thead><tbody>${students.map(s=>`<tr><td>${s.name}</td><td>${s.phone}</td><td>Mensalista</td><td><span class="pill ${s.status==="Ativo"?"green":"red"}">${s.status}</span></td><td><button class="btn" onclick="studentView('${s.name}')">Ver</button></td></tr>`).join("")}</tbody></table></section>`
 if(screen==="payments") return `${header("Pagamentos","Controle financeiro da recepção")}<div class="cards"><div class="card"><div class="label">Pendentes</div><div class="metric">4</div></div><div class="card"><div class="label">Comprovantes</div><div class="metric">2</div></div><div class="card"><div class="label">Identificados</div><div class="metric">28</div></div><div class="card"><div class="label">Inadimplentes</div><div class="metric">4</div></div></div><section class="section"><h2>Últimos pagamentos</h2>${students.map((s,i)=>`<div class="row"><span><b>${s.name}</b><br><small>${i%2?"Mensalidade":"Day Use"} · R$ ${i%2?"150,00":"20,00"}</small></span><span class="pill ${i<2?'yellow':'green'}">${i<2?'Pendente':'Identificado'}</span><button class="btn" onclick="showToast('Pagamento identificado e agendamento liberado.')">Ver</button></div>`).join("")}</section>`
 if(screen==="teachers") return `${header("Professores","Equipe e horários")}<div class="actions" style="margin-bottom:12px"><button class="btn primary" onclick="showToast('Cadastro de professor aberto.')">+ Novo professor</button></div><section class="section"><table class="table"><thead><tr><th>Professor</th><th>Tipo</th><th>Status</th><th>Horários</th></tr></thead><tbody>${["Carlos Lima","Mariana Costa","André Rocha","Patrícia Alves","Lucas Martins"].map((n,i)=>`<tr><td>${n}</td><td>${i===2||i===4?'Estagiário':'Professor'}</td><td><span class="pill ${i===3?'red':'green'}">${i===3?'Inativo':'Ativo'}</span></td><td>${6-i%3}</td></tr>`).join("")}</tbody></table></section>`
 if(screen==="waitlist") return `${header("Lista de Espera","Próximos horários com alunos aguardando")}<div class="notice">Horários que já passaram ou cujo início ocorrerá em até 30 minutos não aparecem na listagem principal. Eles permanecem disponíveis no histórico.</div><section class="section">${["25/04 · 19:00","25/04 · 20:00"].map((t,i)=>`<div class="card" style="margin-bottom:10px"><b>${t}</b><p class="label">${3-i} alunos aguardando</p>${students.slice(0,3-i).map((s,j)=>`<div class="row"><span>${j+1}º · ${s.name} · ${s.freq}</span><button class="btn ghost" onclick="whats('${s.name}')">Convocar</button></div>`).join("")}</div>`).join("")}</section>`
 if(screen==="reports") return `${header("Relatórios","Visão gerencial da operação")}<div class="cards"><div class="card"><div class="label">Ocupação média</div><div class="metric">72%</div></div><div class="card"><div class="label">Agendamentos</div><div class="metric">412</div></div><div class="card"><div class="label">Faltas</div><div class="metric">38</div></div><div class="card"><div class="label">Lista de espera</div><div class="metric">66</div></div></div><section class="section"><h2>Horários mais procurados</h2>${["19:00 · 83%","18:00 · 78%","20:00 · 61%"].map(x=>`<div class="row">${x}<span class="pill orange">Ocupação</span></div>`).join("")}</section>`
 if(screen==="profile") return profile({name:"Recepção",phone:"",goal:"Funcionária",freq:"",weight:"",status:"Ativo"});
 return `${header("Olá, Recepção!","Seu trabalho faz a academia acontecer.")}
 <div class="cards"><div class="card"><div class="label">Agendados hoje</div><div class="metric">32</div></div><div class="card"><div class="label">Professores ativos</div><div class="metric">5</div></div><div class="card"><div class="label">Vagas ocupadas</div><div class="metric">28/40</div></div><div class="card"><div class="label">Inadimplentes</div><div class="metric">4</div></div></div>
 <div class="grid2"><section class="section"><h2>Alertas do dia</h2>${["Vaga liberada · 18:00","Comprovante recebido","Conflito de agenda · 19:00","Aniversariante de hoje"].map(x=>`<div class="row"><span>${x}</span><span class="pill yellow">Ver</span></div>`).join("")}</section><section class="section"><h2>Próximos horários</h2>${["18:00 · 7/8","19:00 · LOTADO","20:00 · 3/8"].map(x=>`<div class="row"><span>${x}</span></div>`).join("")}</section></div>`
}
function agenda(){return `${header("Agenda de Hoje","A agenda é organizada por horário, não por professor")}<section class="section">${["06:00","07:00","08:00","09:00","18:00","20:00"].map((t,i)=>`<div class="row"><div><b>${t}</b><br><small>${i===1?'8/8 alunos':(i+2)+"/8 alunos"}</small></div><span class="pill ${i===1?'red':'green'}">${i===1?'LOTADO':'Disponível'}</span><button class="btn primary" onclick="slot('${t}')">Abrir</button></div>`).join("")}</section>`}
function slot(t){showModal(`Horário ${t}`,`<b>${t}</b><br><small>7 / 8 alunos</small><hr>${students.slice(0,4).map((s,i)=>`<div class="row"><span>${s.name}</span><span class="pill ${i<2?'green':'yellow'}">${i<2?'Presente':'Aguardando'}</span></div>`).join("")}<hr>Você pode marcar presença/ausência ou alterar o professor.","Adicionar aluno","Fechar",()=>showToast("Fluxo de adicionar aluno aberto."))}
function whats(name){showToast(`WhatsApp preparado para convocar ${name}.`)}
function showModal(title,body,ok="Confirmar",cancelText="Fechar",fn=null){
 const el=document.createElement("div");el.className="modalbg";el.innerHTML=`<div class="modal"><h3>${title}</h3><div>${body}</div><div class="actions" style="margin-top:16px"><button class="btn" id="mcancel">${cancelText}</button><button class="btn primary" id="mok">${ok}</button></div></div>`;document.body.appendChild(el);
 el.querySelector("#mcancel").onclick=()=>el.remove();el.querySelector("#mok").onclick=()=>{el.remove();if(fn)fn()}
}
function showToast(msg){clearTimeout(toastTimer);let old=document.querySelector(".toast");if(old)old.remove();let d=document.createElement("div");d.className="toast";d.textContent=msg;document.body.appendChild(d);toastTimer=setTimeout(()=>d.remove(),2800)}
app();
