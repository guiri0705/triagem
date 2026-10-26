// Cole este código em script.google.com (projeto novo), vinculado a uma planilha do Google.
// Implantar > Nova implantação > App da Web > Executar como: eu > Quem tem acesso: Qualquer pessoa.
// Copie a URL gerada para CONFIG.ENDPOINT no index.html.

const EMAIL_AVISO = "guiri0705@gmail.com"; // deixe "" para não receber e-mail

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const campos = ["idade","sexo","objetivo","motivo","nivel","experiencia","doencas","medicamento","lesoes","exames","dias","local","obs"];
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sh.getLastRow() === 0) sh.appendRow(["Data","Nome","WhatsApp"].concat(campos.map(c => d.labels[c] || c)));
  const v = x => Array.isArray(x) ? x.join(", ") : (x || "");
  sh.appendRow([new Date(), d.nome, d.tel].concat(campos.map(c => v(d[c]))));

  if (EMAIL_AVISO) {
    const corpo = ["Nome: " + d.nome, "WhatsApp: " + d.tel]
      .concat(campos.filter(c => d[c] && d[c].length).map(c => d.labels[c] + ": " + v(d[c]))).join("\n");
    MailApp.sendEmail(EMAIL_AVISO, "Nova triagem: " + d.nome, corpo);
  }
  return ContentService.createTextOutput("ok");
}
