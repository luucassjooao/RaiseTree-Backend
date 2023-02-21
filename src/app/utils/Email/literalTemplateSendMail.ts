const LiteralTemplateSendMail = {
  sendMailForFirstTime: (url: string, text: string) => `
    <div style="display: grid; max-width: 600px; margin: auto; border: 8px solid #560bad; padding: 50px 20px; font-size: 110%;">
      <h2 style="text-align: center; text-transform: uppercase; color: #240046;">Raise Tree</h2>
      <p style="text-align: center; font-size: 20px;">Agradecemos sinceramente por escolher o RT para atender às suas necessidades. Estamos comprometidos em fornecer um produto de alta qualidade e um atendimento excepcional ao cliente. Se você tiver alguma dúvida ou precisar de ajuda, não hesite em entrar em contato conosco. Obrigado por confiar em nós.</p>
      <a href=${url} style="background: rgb(189, 189, 189); text-align: center; font-size: 20px; padding: 10px 20px; margin: 10px auto;">${text}</a>
      <p>Se o botão não funcionar por qualquer razão, click nesse link!</p>
      <div><a href=${url}>${url}</a></div>
    </div>
    `,
  sendMailToTeacher: (url: string, text: string, organizationName: string) => `
    <div style="display: grid; max-width: 600px; margin: auto; border: 8px solid #560bad; padding: 50px 20px; font-size: 110%;">
      <h2 style="text-align: center; text-transform: uppercase; color: #240046;">Raise Tree</h2>
      <p style="text-align: center; font-size: 20px;">Olá, você recebeu um chamado para se juntar a organização: ${organizationName}. Clique no link abaixo para ser redirecionado(a) e fazer seu cadastro</p>
      <a href=${url} style="background: rgb(189, 189, 189); text-align: center; font-size: 20px; padding: 10px 20px; margin: 10px auto;">${text}</a>
      <p>Se o botão não funcionar por qualquer razão, click nesse link!</p>
      <div><a href=${url}>${url}</a></div>
    </div>
  `,
  failOnSendMailToTeachers: () => `
    <div style="display: grid; max-width: 600px; margin: auto; border: 8px solid #560bad; padding: 50px 20px; font-size: 110%;">
      <h2 style="text-align: center; text-transform: uppercase; color: #240046;">Raise Tree</h2>
      <p style="text-align: center; font-size: 20px;">Olá, o envio de email para os professores deu alguma coisa de errado! De o código que está na página inicial para cada professor, e peça-os para fazer o registro manualmente!</p>
  </div>
`,
};

export default LiteralTemplateSendMail;
