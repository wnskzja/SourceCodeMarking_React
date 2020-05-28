export default (callback) => {
  const input = document.createElement("input");
  input.id = "file";
  input.type = "file";
  input.accept = ".js,.html,.css";
  input.onchange = (e) => callback(e);
  input.click();
};
