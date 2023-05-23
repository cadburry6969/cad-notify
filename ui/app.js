const $TYPES = {
  ["success"]: {
    ["color"]: "lightgreen",
    ["icon"]: "bi bi-check2-circle",
  },
  ["error"]: {
    ["color"]: "red",
    ["icon"]: "bi bi-exclamation-circle",
  },
  ["info"]: {
    ["color"]: "lightblue",
    ["icon"]: "bi bi-bell",
  },
  ["bag"]: {
    ["color"]: "yellow",
    ["icon"]: "bi bi-bag",
  },
  ["message"]: {
    ["color"]: "white",
    ["icon"]: "bi bi-chat-square-text",
  },
  ["phone"]: {
    ["color"]: "white",
    ["icon"]: "bi bi-telephone-inbound",
  },
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

$NOTIFICATION = function (DATA) {
  let id = $(`.notification`).length + 1;

  for (color in COLOR_CODES) {
    if (DATA["Message"].includes(color)) {
      let objArray = {};
      objArray[color] = `<span style="color: ${COLOR_CODES[color]}">`;
      objArray["~s~"] = `</span>`;

      let newString = REPLACE_COLORCODES(DATA["Message"], objArray);

      DATA["Message"] = newString;
    }
  }
  let $notification = $(
    `<div class="notification unfold" id="${id}">
        <div class="type">
            <i class="${$TYPES[DATA.TYPE]["icon"]}"></i>
        </div>

        <div class="message"><small style="font-size: 14px;">${DATA["Message"]
    }</small></div>
    </div>`
  ).appendTo(`.main`);

  setTimeout(() => {
    $notification.addClass("fold").fadeOut(700);
  }, 10000);

  return $notification;
};

$(function () {
  window.addEventListener("message", function (event) {
    if (event.data.createNew === true) {
      $NOTIFICATION({
        TYPE: event.data.data.type,
        Message: event.data.data.message,
      });
    }
  });
});
