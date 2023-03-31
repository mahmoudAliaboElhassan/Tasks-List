let el = document.getElementById("list");
let btn = document.getElementById("btn");
let scroll = document.querySelector(".up");
let rmvall = document.querySelector(".all");
let allTsks = document.createElement("div");
let count = 0;
btn.onclick = function () {
  checkInput();
  if (checkInput() === 0) {
    return;
  } else {
    let task = document.createElement("div");
    let word = document.createElement("div");
    count++;
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
    word.append(el.value);
    star.classList.add("style-star");
    angry.classList.remove("angry");
    angry.onclick = function () {
      angry.classList.toggle("angry");
    };
    star.addEventListener("click", function () {
      star.classList.toggle("click-style");
      word.classList.toggle("finish");
    });
    star.title = "finished";

    task.append(word);
    task.append(del);
    del.onclick = function () {
      task.remove();
      count--;
      checkNumber();
    };

    task.append(word);
    task.append(angry);
    task.append(star);
    el.value = "";
    task.classList.add("style-tsk");
    allTsks.append(task);
    document.body.append(allTsks);
    rmvall.onclick = function () {
      allTsks.querySelectorAll("div").forEach((element) => {
        console.log(element);
        element.remove();
      });
      count = 0;
      checkNumber();
    };
    el.focus();
  }
};

function checkInput() {
  let reg = /^\S.*\S$/;
  if (el.value.match(reg)) {
    console.log(el.value.match(reg));
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
  if (count > 0) rmvall.classList.add("visible");
  else {
    rmvall.classList.remove("visible");
  }
}
