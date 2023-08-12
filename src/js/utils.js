export const darkModeHandler = () => {
  const switcherDarkMode = document.querySelector("#toggleDarkMode"),
    htmlElement = document.documentElement;

  if (localStorage.getItem("mode") === "dark") {
    htmlElement.classList.add("dark");
    switcherDarkMode.checked = true;
  }

  switcherDarkMode.addEventListener("input", () => {
    htmlElement.classList.toggle("dark");

    htmlElement.classList.contains("dark")
      ? localStorage.setItem("mode", "dark")
      : localStorage.setItem("mode", "light");
  });
};
