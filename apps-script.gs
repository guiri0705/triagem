// PLANILHA DE LEADS — cole este código em script.google.com (Extensões > Apps Script, dentro de uma planilha nova).
// Implantar > Nova implantação > App da Web > Executar como: eu > Quem tem acesso: Qualquer pessoa.
// Copie a URL gerada para CONFIG.ENDPOINT no index.html.
//
// Cada pessoa vira UMA linha. A linha nasce assim que ela informa nome + WhatsApp
// (Status = "Só contato (não concluiu)") e é atualizada quando ela termina a triagem
// (Status = "Triagem completa"). Assim você não perde quem desistiu no meio.

const EMAIL_AVISO = "guiri0705@gmail.com"; // deixe "" para não receber e-mail
const CAMPOS = ["idade","sexo","objetivo","motivo","nivel","experiencia","doencas","medicamento","lesoes","exames","dias","local","obs"];
const FIXAS = ["ID","Criado em","Atualizado em","Status","Nome","WhatsApp","Link para chamar"];

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sh.getLastRow() === 0) {
      sh.appendRow(FIXAS.concat(CAMPOS.map(c => d.labels[c] || c)));
      sh.setFrozenRows(1);
      sh.getRange(1, 1, 1, FIXAS.length + CAMPOS.length).setFontWeight("bold");
    }
    const v = x => Array.isArray(x) ? x.join(", ") : (x || "");
    const agora = new Date();
    const link = "https://wa.me/" + zapNumero(d.tel);

    // procura a linha deste lead pelo ID (coluna A)
    const achou = sh.getRange(2, 1, Math.max(sh.getLastRow() - 1, 1), 1).createTextFinder(d.id).matchEntireCell(true).findNext();
    const dados = [d.id, achou ? achou.offset(0, 1).getValue() : agora, agora, d.status, d.nome, d.tel, link]
      .concat(CAMPOS.map(c => v(d[c])));
    const novo = !achou;
    if (achou) sh.getRange(achou.getRow(), 1, 1, dados.length).setValues([dados]);
    else sh.appendRow(dados);

    if (EMAIL_AVISO) {
      const resumo = ["Nome: " + d.nome, "WhatsApp: " + d.tel, "Chamar: " + link]
        .concat(CAMPOS.filter(c => d[c] && d[c].length).map(c => d.labels[c] + ": " + v(d[c]))).join("\n");
      if (novo) MailApp.sendEmail(EMAIL_AVISO, "Novo lead: " + d.nome, resumo);
      else if (d.status === "Triagem completa") MailApp.sendEmail(EMAIL_AVISO, "Triagem completa: " + d.nome, resumo);
    }
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput("ok");
}

function zapNumero(tel) {
  const n = String(tel || "").replace(/\D/g, "");
  return n.length <= 11 ? "55" + n : n;
}
