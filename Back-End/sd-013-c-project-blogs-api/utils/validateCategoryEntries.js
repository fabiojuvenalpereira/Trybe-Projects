const validateCategoryEntries = (category) => {
  if (!category) return { status: 400, message: '"name" is required' };
};

module.exports = validateCategoryEntries;