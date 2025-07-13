const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll("input");

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    const areInputFieldEmpty = [...inputFields].every((input) => {
      return input.value;
    });

    if (!areInputFieldEmpty) {
      document.querySelector(".error-label").style = `visibility:visible`;

      setTimeout(() => {
        document.querySelector(".error-label").style = `visibility:none`;
      }, 1000);
    } else {
      checkbox.parentElement.classList.toggle("completed");
      const taskCompleted = document.querySelectorAll(".completed").length;
      document.querySelector(".progress").style = `width:${
        (taskCompleted / 3) * 100
      }%`;
      document.querySelector(
        ".progress"
      ).children[0].innerText = `${taskCompleted}/3 completed`;
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
