module.exports = {
  validateContact: (contact) => {
    const errors = [];

    if (!contact.name || typeof contact.name !== 'string') {
      errors.push('Name is required and must be a string.');
    } else if (contact.name.length < 2 || contact.name.length > 50) {
      errors.push('Name must be between 2 and 50 characters.');
    }

    const phoneRegex = /^(?:\+91\s?|)?\d{5}\s?\d{5}$/;
    if (!contact.phoneNumber || typeof contact.phoneNumber !== 'string') {
      errors.push('Phone number is required and must be a string.');
    } else if (!phoneRegex.test(contact.phoneNumber)) {
      errors.push(
        'Phone number must be 10 digits, optionally formatted with +91 or space.'
      );
    }

    if (!contact.help || typeof contact.help !== 'string') {
      errors.push('Help is required and must be a string.');
    } else if (contact.help.length < 2 || contact.help.length > 30) {
      errors.push('Help must be between 2 and 30 characters.');
    }

    if (!contact.discription || typeof contact.discription !== 'string') {
      errors.push('Description is required and must be a string.');
    } else if (
      contact.discription.length < 10 ||
      contact.discription.length > 500
    ) {
      errors.push('Description must be between 10 and 500 characters.');
    }

    return {
      isInValid: errors.length !== 0,
      errors,
    };
  },
  uploadValidation: (req) => {
    const errors = [];
    const { name, title, content, description, folderName } = req.body;

    if (!req.file) errors.push('Image file is required');

    if (
      !folderName ||
      typeof folderName !== 'string' ||
      folderName.length < 1 ||
      folderName.length > 100
    ) {
      errors.push('folderName must be 1-100 characters');
    }

    if (
      !name ||
      typeof name !== 'string' ||
      name.length < 1 ||
      name.length > 100
    ) {
      errors.push('name must be 1-100 characters');
    }

    if (
      !title ||
      typeof title !== 'string' ||
      title.length < 1 ||
      title.length > 100
    ) {
      errors.push('title must be 1-100 characters');
    }

    if (
      !content ||
      typeof content !== 'string' ||
      content.length < 1 ||
      content.length > 1000
    ) {
      errors.push('content must be 1-1000 characters');
    }

    if (
      !description ||
      typeof description !== 'string' ||
      description.length < 1 ||
      description.length > 5000
    ) {
      errors.push('description must be 1-5000 characters');
    }

    return errors;
  },

  deleteValidation: (req) => {
    const errors = [];
    const { public_id } = req.body;

    if (
      !public_id ||
      typeof public_id !== 'string' ||
      public_id.length < 1 ||
      public_id.length > 100
    ) {
      errors.push('public_id must be 1-100 characters');
    }

    return errors;
  },

  updateValidation: (req) => {
    const errors = [];
    const { name, title, content, description, folderName, public_id } =
      req.body;

    if (
      !public_id ||
      typeof public_id !== 'string' ||
      public_id.length < 1 ||
      public_id.length > 100
    ) {
      errors.push('public_id provided');
    }

    if (
      !folderName ||
      typeof folderName !== 'string' ||
      folderName.length < 1 ||
      folderName.length > 100
    ) {
      errors.push('folderName must be 1-100 characters');
    }

    if (
      !name ||
      typeof name !== 'string' ||
      name.length < 1 ||
      name.length > 100
    ) {
      errors.push('name must be 1-100 characters');
    }

    if (
      !title ||
      typeof title !== 'string' ||
      title.length < 1 ||
      title.length > 100
    ) {
      errors.push('title must be 1-100 characters');
    }

    if (
      !content ||
      typeof content !== 'string' ||
      content.length < 1 ||
      content.length > 1000
    ) {
      errors.push('content must be 1-1000 characters');
    }

    if (
      !description ||
      typeof description !== 'string' ||
      description.length < 1 ||
      description.length > 5000
    ) {
      errors.push('description must be 1-5000 characters');
    }

    return errors;
  },

  estimationOrderValidation: (data) => { 
    const errors = [];

    // Validate rooms
    if (!Array.isArray(data.rooms) || data.rooms.length > 100) {
      errors.push("rooms must be an array with a maximum of 100 entries");
    }
  
    // Validate string fields with max length
    const stringMaxLimits = {
      wood: 100,
      hardware: 100,
      workmanship: 100,
      surfaceFinish: 100,
      deadline: 100,
      EstimationAmount: 100,
    };
  
    for (const field in stringMaxLimits) {
      const max = stringMaxLimits[field];
      const value = data[field];
      if (typeof value !== "string" || value.trim() === "") {
        errors.push(`${field} is required and must be a string`);
      } else if (value.length > max) {
        errors.push(`${field} exceeds maximum length of ${max}`);
      }
    }
  
    // Validate additional
    if (data.additional) {
      if (!Array.isArray(data.additional)) {
        errors.push("additional must be an array of strings");
      } else {
        data.additional.forEach((item, index) => {
          if (typeof item !== "string") {
            errors.push(`additional[${index}] must be a string`);
          } else if (item.length > 100) {
            errors.push(`additional[${index}] exceeds maximum length of 100`);
          }
        });
      }
    }
  
    // Validate contact
    if (!data.contact || typeof data.contact !== "object") {
      errors.push("contact is required");
    }
  
    return errors;
  },
};
