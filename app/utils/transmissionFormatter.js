const uuid = require('node-uuid');

function generateSendBodyBase() {
  return {
    transmissionHeader: {
      metadata: {},
      userSubstitutionData: [],
      globalSubstitutionData: {},
    },
    to: {
      address: []
    },
    from: {
      address: '',
      name: ''
    },
    subject: '',
    htmlContent: '',
    plainTextContent: ''
  };
}

exports.formatForSend = (transmission) => {
  const sendBody = generateSendBodyBase();
  transmission.recipients.forEach(recipient => {
    const email = recipient.address.email ? recipient.address.email : recipient.address;
    const substitutionData = Object.assign({}, recipient.substitution_data, { email });
    sendBody.to.address.push(email);
    sendBody.transmissionHeader.userSubstitutionData.push(substitutionData);
  });
  const content = transmission.content;
  const startTime = (transmission.options && transmission.options.start_time) || 'now';
  const metadata = Object.assign({},
    {
      emailId: uuid.v4(),
      substitutionId: transmission.substitutionId
    },
    transmission.metadata
  );
  if (transmission.name) {
    sendBody.transmissionHeader.name = transmission.name;
  }
  if (content.reply_to) {
    sendBody.replyTo = content.reply_to;
  }

  sendBody.transmissionHeader.metadata = metadata;
  sendBody.transmissionHeader.globalSubstitutionData = transmission.substitution_data;
  sendBody.transmissionHeader.startTime = startTime;
  sendBody.from.address = content.from.email ? content.from.email : content.from;
  sendBody.from.name = content.from.name ? content.from.name : 'Financial Times';
  sendBody.subject = content.subject;
  sendBody.htmlContent = content.html;
  sendBody.plainTextContent = content.text;

  console.log(sendBody);
  return sendBody;
};
