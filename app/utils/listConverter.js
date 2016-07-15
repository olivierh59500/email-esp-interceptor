exports.recipientListToSubstitution = recipientList => {
  // missing properties: attributes, recipients.tags, recipient.metadata
  const substitution = {
    name: recipientList.name,
    data: [],
    description: recipientList.description
  };
  recipientList.recipients.forEach(recipient => {
    const recipientData = {};
    const hasEmailProperty = typeof recipient.address === 'object' &&
      !Array.isArray(recipient.address) &&
      recipient.address.email;
    const hasNameProperty = typeof recipient.address === 'object' &&
      !Array.isArray(recipient.address) &&
      recipient.address.name;

    // check for and assign email address
    if (typeof recipient.address === 'string') {
      recipientData.email = recipient.address;
    } else if (hasEmailProperty) {
      recipientData.email = recipient.address.email;
    } else {
      throw new Error();
    }

    // check for and assign name
    if (hasNameProperty) {
      recipientData.name = recipient.address.name;
    }

    // check for and assign substitutionData
    Object.keys(recipient.substitution_data).forEach(key => {
      recipientData[key] = recipient.substitution_data[key];
    });

    substitution.data.push(recipientData);
  });

  return substitution;
};

exports.substitutionToRecipientList = (substitution, showRecipients = true) => {
  // missing properties: attributes, recipients.tags, recipient.metadata
  const recipientList = {
    results: {
      id: substitution._id,
      name: substitution.name,
      description: substitution.description,
      total_accepted_recipients: substitution.data.length,
    }
  };
  if (showRecipients) {
    recipientList.results.recipients = [];

    substitution.data.forEach(substitutionData => {
      const recipient = {
        substitution_data: {}
      };

      // check for and assign email address
      if (substitutionData.email) {
        recipient.address = {
          email: substitutionData.email
        };
      } else {
        throw new Error();
      }

      if (substitutionData.name) {
        recipient.address.name = substitutionData.name;
      }

      // check for and assign substitution data
      Object.keys(substitutionData).forEach(key => {
        if (key !== 'email' && key !== 'name') {
          recipient.substitution_data[key] = substitutionData[key];
        }
      });

      recipientList.results.recipients.push(recipient);
    });
  }

  return recipientList;
};
