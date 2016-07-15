exports.recipientToSubstitution = recipientList => {
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
