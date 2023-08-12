export function firstLetterToUpperCase(form): {} {
  const newForm = {};
  Object.keys(form).forEach((key) => {
    const split = key.split('');
    split[0] = split[0].toUpperCase();
    const newKey = split.join('');
    newForm[newKey] = form[key];
  });
  return newForm;
}
