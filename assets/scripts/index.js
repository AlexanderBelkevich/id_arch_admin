function loginButton() {
  const login = document.getElementById("login").value;
  const password = document.getElementById("password").value;
  const submitBtn = document.getElementById("submitBtn");

  // Если поля пустые, блокируем кнопку, иначе разблокируем
  if (login.trim() === "" || password.trim() === "") {
    submitBtn.disabled = true;
  } else {
    submitBtn.disabled = false;
  }
}

Fancybox.bind("[data-fancybox]", {
  // Your custom options
});

// МОДАЛЬНОЕ ОКНО

const openModalBtns = document.querySelectorAll(".open-modal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");

if (modal) {
  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      event.preventDefault();
      modal.showPopover(); // Используем showPopover для открытия модального окна
      overlay.style.display = "block"; // Показываем затемнение фона
    });
  });

  closeModalBtn.addEventListener("click", () => {
    modal.hidePopover(); // Используем hidePopover для закрытия модального окна
    overlay.style.display = "none"; // Скрываем затемнение фона
  });

  overlay.addEventListener("click", () => {
    modal.hidePopover();
    overlay.style.display = "none";
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.matches(":popover-open")) {
      modal.hidePopover();
      overlay.style.display = "none";
    }
  });
}

// КОМПОНЕНТ ЗАГРУЗКИ ФАЙЛОВ

document.querySelectorAll(".file-upload-component").forEach((component) => {
  const fileInput = component.querySelector(".file-input");
  const fileList = component.querySelector(".file-list");
  let filesArray = [];

  // Добавление файлов в список
  fileInput.addEventListener("change", () => {
    for (let file of fileInput.files) {
      addFileToList(file);
    }
    fileInput.value = ""; // Очищаем поле input для возможности повторного выбора тех же файлов
  });

  function addFileToList(file) {
    // Проверка, есть ли файл уже в списке
    if (
      filesArray.some(
        (f) => f.file.name === file.name && f.file.size === file.size
      )
    ) {
      alert("Такой файл уже был добавлен");
      return;
    }

    // Добавление файла в массив
    filesArray.push({ file, isFavorite: false });

    const listItem = document.createElement("li");
    listItem.classList.add("file-item");

    const fileName = document.createElement("span");
    fileName.textContent = file.name;
    fileName.classList.add("file-name");
    listItem.appendChild(fileName);

    const fileActions = document.createElement("div");
    fileActions.classList.add("file-actions");

    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("file-list-element__delete");
    deleteBtn.innerHTML = "<img src='/assets/svg/upload-remove.svg' />";
    deleteBtn.addEventListener("click", () => removeFile(file, listItem));
    fileActions.appendChild(deleteBtn);

    listItem.appendChild(fileActions);
    fileList.appendChild(listItem);
  }

  // Удаление файла из списка
  function removeFile(file, listItem) {
    filesArray = filesArray.filter((f) => f.file !== file);
    listItem.remove();
  }
});

// Стили для удаляемых файлов

document
  .querySelectorAll('.file-uploaded__remove input[type="checkbox"]')
  .forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const fileUploaded = this.closest(".file-uploaded");
      if (this.checked) {
        fileUploaded.classList.add("is-deleted");
      } else {
        fileUploaded.classList.remove("is-deleted");
      }
    });
  });
