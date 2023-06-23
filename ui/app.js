const NOTI_TYPES = {
  ["success"]: "bi bi-check2-circle",
  ["error"]: "bi bi-exclamation-circle",
  ["info"]: "bi bi-bell",
  ["bag"]: "bi bi-bag",
  ["message"]: "bi bi-chat-square-text",
  ["phone"]: "bi bi-telephone-inbound",
};

const COLOR_CODES = {
  "~g~": "green",
  "~r~": "red",
  "~y~": "yellow",
  "~b~": "blue",
  "~lb~": "lightblue",
  "~lg~": "lightgreen",
  "~w~": "white",
};

const REPLACE_COLORCODES = (string, obj) => {
  let stringToReplace = string;

  for (let id in obj) {
    stringToReplace = stringToReplace.replace(new RegExp(id, "g"), obj[id]);
  }

  return stringToReplace;
};

const NOTI_WRAPPER = function (DATA) {
  let id = $(`.notification`).length + 1;

  for (color in COLOR_CODES) {
    if (DATA["message"].includes(color)) {
      let objArray = {};
      objArray[color] = `<span style="color: ${COLOR_CODES[color]}">`;
      objArray["~s~"] = `</span>`;

      let newString = REPLACE_COLORCODES(DATA["message"], objArray);

      DATA["message"] = newString;
    }
  }
  let noti_class = $(
    `<div class="notification unfold" id="${id}">
        <div class="type">
            <i class="${NOTI_TYPES[DATA.type]}"></i>
        </div>

        <div class="message"><small style="font-size: 14px;">${DATA["message"]
    }</small></div>
    </div>`
  ).appendTo(`.main`);

  setTimeout(() => {
    noti_class.addClass("fold").fadeOut(700, function () {
      $(this).remove();
    });
  }, DATA["duration"] || 5000);

  return noti_class;
};

window.addEventListener("message", function (event) {
  if (event.data.action === 'notify') {
    NOTI_WRAPPER(event.data.data);
  }
});