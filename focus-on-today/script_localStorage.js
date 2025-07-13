const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll("input");
const formBottomText = document.querySelectorAll(".form-bottom")[0].children[0];
const progressQuoteTxt = document.querySelector(".progress-txt");

const formBottomQuotes = [
  `"Move one step ahead, today!"`,
  "Keep Going, you're making great progress!",
];

const progressQuotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just a step away keep going!",
  "Whoa! you completed all the goals time for chill :D",
];

const goalsData = JSON.parse(localStorage.getItem("goalsData")) || {
  first: {
    goal: "",
    completed: false,
  },
  second: {
    goal: "",
    completed: false,
  },
  third: {
    goal: "",
    completed: false,
  },
};
let taskCompleted = Object.values(goalsData).filter(
  (goal) => goal.completed
).length;

document.querySelector(".progress").style = `width:${
  (taskCompleted / 3) * 100
}%`;
document.querySelector(
  ".progress"
).children[0].innerText = `${taskCompleted}/3 completed`;

progressQuoteTxt.innerText = progressQuotes[taskCompleted];

if (taskCompleted === 0) {
  formBottomText.innerText = `"Move one step ahead, today!"`;
} else {
  formBottomText.innerText = `"Keep Going, you're making great progress!"`;
}

checkBoxList.forEach((checkbox) => {
  if (goalsData[checkbox.nextElementSibling.id].completed) {
    checkbox.parentElement.classList.add("completed");
  }
  checkbox.addEventListener("click", () => {
    const areInputFieldEmpty = [...inputFields].every((input) => {
      return input.value;
    });

    if (!areInputFieldEmpty) {
      document.querySelector(".error-label").style = `visibility:visible`;
    } else {
      goalsData[checkbox.nextElementSibling.id].completed =
        !goalsData[checkbox.nextElementSibling.id].completed;

      localStorage.setItem("goalsData", JSON.stringify(goalsData));

      taskCompleted = Object.values(goalsData).filter(
        (goal) => goal.completed
      ).length;
      document.querySelector(".progress").style = `width:${
        (taskCompleted / 3) * 100
      }%`;
      document.querySelector(
        ".progress"
      ).children[0].innerText = `${taskCompleted}/3 completed`;
      checkbox.parentElement.classList.toggle("completed");
      progressQuoteTxt.innerText = progressQuotes[taskCompleted];

      if (taskCompleted === 0) {
        document.querySelectorAll(
          ".form-bottom"
        )[0].children[0].innerText = `"Move one step ahead, today!"`;
      } else {
        document.querySelectorAll(
          ".form-bottom"
        )[0].children[0].innerText = `"Keep Going, you're making great progress!"`;
      }
    }
  });
});

inputFields.forEach((input) => {
  input.value = goalsData[input.id].goal;
  input.addEventListener("focus", () => {
    document.querySelector(".error-label").style = `visibility:none`;
  });

  input.addEventListener("input", (e) => {
    if (goalsData[input.id].completed) {
      e.target.value = goalsData[input.id].goal;
      return;
    }

    (goalsData[input.id].goal = e.target.value),
      localStorage.setItem("goalsData", JSON.stringify(goalsData));
  });
});
