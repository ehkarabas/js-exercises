const btn = document.getElementById("btn");
const body = document.getElementsByTagName("body")[0];
btn.addEventListener("click", (e) => {
  body.style.backgroundColor = `rgba(${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255
  )}, ${Number(Math.random().toFixed(2))})`;
});
