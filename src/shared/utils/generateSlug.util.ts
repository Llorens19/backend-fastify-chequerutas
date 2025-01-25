export const generateSlug= (text: string):string => {
  const textFormated = text.replace(/ /g, "-");
  const randomHexa = Math.random().toString(16).substr(2, 8).toUpperCase();
  return `${textFormated}-${randomHexa}`
}
