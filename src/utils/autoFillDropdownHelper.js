const autoFillValueForDropdown = (options, selectedId, idLabel = 'id') => {
  return selectedId ? options.find((option) => option[idLabel] === selectedId) : '';
};

export default autoFillValueForDropdown;
