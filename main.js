const page = window.location.pathname;
if (page.includes("index.html")) {
  document.querySelector("#n-cbtn").addEventListener("click", () => {
    window.location.assign("new-count.html")
  })
  document.querySelector("#m-cbtn").addEventListener("click", () => {
    window.location.assign("my-count.html")
  })
}
if (page.includes("new-count.html")) {
  document.querySelector("#n-continue").addEventListener("click", addNewCount)
}

function addNewCount() {
  let inputField = document.getElementById("input");
  let inputValue = inputField.value;

  // Agar input empty hai, toh return kar dein
  if (inputValue === "") return;

  // Input ko LocalStorage mein save karna
  let tasks = JSON.parse(localStorage.getItem("userTask")) || [];

  let obj = {
    name: inputValue,
    count: 0
  }

  tasks.push(obj)


  localStorage.setItem("userTask", JSON.stringify(tasks));
  inputField.value = ""
  window.location.assign("my-count.html")
  display()
}

if (page.includes("my-count.html")) {
  display()

  function display() {
    let saveData;


    saveData = JSON.parse(localStorage.getItem("userTask")) || [];

    let container = document.querySelector(".container");
    container.innerHTML = "";
    if (saveData && saveData.length > 0) {

      saveData.forEach((data) => {

        let div = document.createElement("div");
        div.classList.add("new-div")
        div.innerHTML =
          ` <p class = "output">${data.name} : ${data.count}</p>
    <button class ="continue">Continue</button>
    <button class ="delete">Delete</button>
  </div> `
        div.querySelector(".delete").addEventListener("click", () => {

          let taskS = JSON.parse(localStorage.getItem("userTask")) || [];

          taskS = taskS.filter(task => task.name !== data.name);

          localStorage.setItem("userTask", JSON.stringify(taskS));

          display()
        })
        div.querySelector(".continue").addEventListener("click", () => {
          localStorage.setItem("selectTask",JSON.stringify(data)) 
          window.location.assign("counter.html")
        })
        container.prepend(div)

      })
    }
    else {
      window.location.assign("new-count.html ")
    }
  }
}
if (page.includes("counter.html")) {
  let task = JSON.parse(localStorage.getItem("selectTask")) 
  document.querySelector("#n-display").textContent = task.name;
  let count = document.querySelector("#c-display")
  count.textContent = task.count
  document.querySelector("#plus-btn").addEventListener("click",()=>{
    updateCount(+1)
  })
  document.querySelector("#minus-btn").addEventListener("click",()=>{
    updateCount(-1)
  })
  document.querySelector("#reset-btn").addEventListener("click",()=>{
    updateCount(0,true)
  })
  
  function updateCount(change ,reset = false) {
    let tasks = JSON.parse(localStorage.getItem("userTask")) || [];
    let updatedTasks = tasks.map(t=>{
      if (t.name === task.name) {
        t.count = reset ? 0 : t.count + change;
        task.count = t.count
      }
      return t;
    })
    localStorage.setItem("userTask",JSON.stringify(updatedTasks)) 
    localStorage.setItem("selectTask",JSON.stringify(task))
    count.textContent = task.count
  }
}
