const password = process.env.PASSWORD;
console.log(password);
export const connectionSrt =
  "mongodb+srv://malikvanshika2004:" +
  password +
  "@cluster0.hlnfn.mongodb.net/spheron?retryWrites=true&w=majority&appName=Cluster0";
