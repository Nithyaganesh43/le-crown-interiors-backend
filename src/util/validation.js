module.exports = {
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
    const { name, title, content, description, folderName ,public_id} = req.body;

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
  } 
};
