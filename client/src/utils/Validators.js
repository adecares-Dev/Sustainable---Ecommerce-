export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateName = (name) => {
  return name.length >= 2 && name.length <= 50;
};

export const validateProduct = (product) => {
  const errors = {};

  if (!product.name || product.name.trim().length < 2) {
    errors.name = 'Product name must be at least 2 characters';
  }

  if (!product.description || product.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters';
  }

  if (!product.price || product.price <= 0) {
    errors.price = 'Price must be greater than 0';
  }

  if (!product.category) {
    errors.category = 'Category is required';
  }

  if (product.inventory.stock < 0) {
    errors.stock = 'Stock cannot be negative';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};