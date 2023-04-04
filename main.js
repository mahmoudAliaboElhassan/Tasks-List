let input = document.getElementById("list");
let btn = document.getElementById("btn");
let scroll = document.querySelector(".up");
let RmvAll = document.querySelector(".all");
let AllTasks = document.querySelector(".alltask");
let count = 0;

if (window.localStorage.getItem("count")) {
  count = window.localStorage.getItem("count");
}

function main() {
  let arrayTasks = [];
  if (window.localStorage.getItem("task")) {
    arrayTasks = JSON.parse(window.localStorage.getItem("task"));
  }
  getFromLocal();
  btn.onclick = function () {
    checkInput();
    if (checkInput() === 0) {
      return;
    } else {
      count++;
      window.localStorage.setItem("count", count);
      addTasks(input.value);
      input.focus();
    }
  };

  function addTasks(tasksTxt) {
    const MyTask = {
      title: tasksTxt,
      id: Date.now(),
    };
    arrayTasks.push(MyTask);
    AddToLocal(arrayTasks);
    addToPage(arrayTasks);
  }

  function addToPage(ArrayOfTasks) {
    AllTasks.innerHTML = "";
    ArrayOfTasks.forEach((tsk) => {
      console.log(tsk.title);
      let task = document.createElement("div");
      task.style.transition = "0.5s";
      task.setAttribute("data-id", tsk.id);
      let word = document.createElement("div");
      checkNumber();
      word.classList.add("style-word");
      let del = document.createElement("div");
      del.setAttribute("class", "fa-solid fa-trash trch");
      del.classList.add("style-del");
      del.title = "delete";
      let angry = document.createElement("div");
      angry.setAttribute("class", "fa-solid fa-face-angry angry");
      angry.classList.add("style-angry");
      angry.title = "angry";
      let star = document.createElement("div");
      star.setAttribute("class", "fa-solid fa-star star");
      word.appendChild(document.createTextNode(tsk.title));
      star.classList.add("style-star");
      angry.classList.remove("angry");
      angry.addEventListener("click", function () {
        angry.classList.toggle("angry");
        word.classList.toggle("angry-mode");
      });

      star.addEventListener("click", function () {
        star.classList.toggle("click-style");
        word.classList.toggle("finish");
      });
      star.title = "finished";
      task.append(del);
      del.onclick = function () {
        count--;
        window.localStorage.setItem("count", count);
        task.remove();
        checkNumber();
        ArrayOfTasks = ArrayOfTasks.filter(
          (tsk) => tsk.id != task.getAttribute("data-id")
        );
        AddToLocal(ArrayOfTasks);
        main();
      };
      task.append(word);
      task.append(angry);
      task.append(star);
      input.value = "";
      task.classList.add("style-tsk");
      AllTasks.append(task);
      AllTasks.style.marginBottom = "40px";
      RmvAll.onclick = function () {
        ArrayOfTasks = [];
        AddToLocal(ArrayOfTasks);
        count = 0;
        window.localStorage.setItem("count", count);
        main();
        checkNumber();
      };
    });
  }

  function checkInput() {
    let reg = /^\S.*\S$/;
    if (input.value.match(reg)) {
      console.log(input.value.match(reg));
      return 1;
    } else {
      alert("Please Enter a Valid Task !");
      return 0;
    }
  }

  window.onscroll = () => {
    if (window.scrollY > 100) {
      console.log("hello");
      scroll.classList.add("visible");
    } else {
      scroll.classList.remove("visible");
    }
  };

  scroll.onclick = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function checkNumber() {
    if (count > 0) RmvAll.classList.add("visible");
    else {
      RmvAll.classList.remove("visible");
    }
  }

  function AddToLocal(ArrayToLocal) {
    window.localStorage.setItem("task", JSON.stringify(ArrayToLocal));
  }

  function getFromLocal() {
    let data = window.localStorage.getItem("task");
    let StoredTask = JSON.parse(data);
    if (window.localStorage.getItem("task")) {
      addToPage(StoredTask);
    }
  }
}
main();
