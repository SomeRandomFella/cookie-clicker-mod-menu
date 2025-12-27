// had to do cause to work in bookmarklets
window.TatarMenu = {
  addCookies: addCookies,
  setCookies: setCookies,
  goldenCookie: goldenCookie,
  setCpS: setCpS,
  setClickingPower: setClickingPower,
  aura: aura,
  autoGolden: autoGolden,
  unlock: unlock,
  changeName: changeName,
};

const style = document.createElement("style");
style.textContent = `
		.inputThing {
			width: 80px;
			margin-left: 8px;
			border: 2px solid #e2dd48;
			border-color: #ece2b6 #875526 #733726 #dfbc9a;
			background: #000 url(img/darkNoise.jpg);
			color: #fff;
			font-family: Tahoma, Arial, sans-serif;
			transition: box-shadow 0.3s ease, border-color 0.3s ease;
		}

		.inputThing:focus {
			outline: none;
			border-color: #fffa9c #aa7e4e #996e3e #dcb878;
			box-shadow: 0 0 8px #fff8aa;
		}

		input[type=number]::-webkit-inner-spin-button,
		input[type=number]::-webkit-outer-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
	`;
document.head.appendChild(style);

setTimeout(() => {
  Game.Notes.push({
    title: "Game Injected",
    desc: "The game has succesfully been injected with Tatar Mod Menu press Control X to open! made by amir btw",
    pic: [0, 0],
    quick: true,
    noLog: true,
  });

  Game.UpdateNotes();

  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key.toLowerCase() === "x") {
      injectMenu();
    }
  });
}, 500);

function injectMenu() {
  const menu = document.getElementById("menu");

  if (!menu) {
    return alert("yo something aint right");
  }

  Game.onMenu = "";
  Game.ShowMenu("bullshit");

  menu.innerHTML = `
    <div class="close menuClose" onclick="Game.ShowMenu();">x</div>
    <div class="section">
      Tatar Mod Menu
    </div>
    <div class="block" style="paddingg:0px;margin:8px 4px;">
      <div class="subsection" style="padding:0px;">
        <div class="title">
          Cookies
        </div>
        <div class="listing">
          <a class="option smallFancyButton" onclick="TatarMenu.addCookies()">Add</a>
					<input type="number" id="cookieAmountInput" value="0" class="inputThing"/>
          <label>Add cookies to your cookie amount or subtract a amount with a negative number.</label>
        </div>
				<div class="listing">
          <a class="option smallFancyButton" onclick="TatarMenu.setCookies()">Set</a>
					<input type="number" id="cookieSetInput" value="0" class="inputThing"/>
          <label>Set your cookies to a certain value (DETECTED EXPLOIT)</label>
        </div>
				<div class="listing">
          <a class="option smallFancyButton" onclick="TatarMenu.setCpS()">Cookies Per Second</a>
					<input type="number" id="cookieSecondInput" value="0" class="inputThing"/>
          <label>Set your cookies per second</label>
        </div>
				<div class="listing">
          <a class="option smallFancyButton" onclick="TatarMenu.aura()">Infinite Cookies!</a>
          <label>Gives you a infinite amount of cookies (DETECTED EXPLOIT)</label>
        </div>
				<div class="listing">
          <a class="option smallFancyButton" onclick="TatarMenu.goldenCookie()">Golden Cookie</a>
          <label>Spawn golden cookies!</label>
        </div>
      </div>
			<div class="subsection" style="padding:0px;">
        <div class="title">
          Clicking
        </div>
        <div class="listing">
          <a class="option smallFancyButton" onclick="TatarMenu.setClickingPower()">Set Clicking Power</a>
					<input type="number" id="clickingPowerInput" value="0" class="inputThing"/>
          <label>Set the amount of cookies you get per click</label>
        </div>
				<div class="listing">
          <a class="option smallFancyButton" onclick="TatarMenu.autoGolden()">Auto Click</a>
          <label>Auto click golden cookies</label>
        </div>
      </div>
			<div class="subsection" style="padding:0px;">
        <div class="title">
          Upgrades
        </div>
        <div class="listing">
          <a class="option smallFancyButton" onclick="TatarMenu.unlock()">Unlock All</a>
          <label>Unlock all upgrades (you still have to buy them but it costs nothing)</label>
        </div>
      </div>
			 <div class="subsection" style="padding:0px;">
        <div class="title">
          Misc
        </div>
        <div class="listing">
          <a class="option smallFancyButton" onclick="TatarMenu.changeName()">Change Name</a>
					<input type="text" id="nameinput" value="Tatar" class="inputThing"/>
          <label>Change bakery name</label>
        </div>
				<div class="listing">
          <a class="option smallFancyButton" onclick="Game.RuinTheFun();">Unlock All</a>
          <label>Unlock everything (DETECTED)</label>
        </div>
      </div>
    </div>
  `;
}

function addCookies() {
  const input = document.getElementById("cookieAmountInput");
  const amount = parseInt(input.value, 10);

  Game.ClickCookie(null, amount);
}

function setCookies() {
  const input = document.getElementById("cookieSetInput");
  const amount = parseInt(input.value, 10);

  Game.cookies = amount;
}

function goldenCookie() {
  var newShimmer = new Game.shimmer("golden", { noWrath: true });
}

function setCpS() {
  alert("work in progress brodi");
}

function setClickingPower() {
  const input = document.getElementById("clickingPowerInput");
  const amount = parseInt(input.value, 10);

  Game.computedMouseCps = amount;
}

function aura() {
  Game.cookies = Infinity;
}

function autoGolden() {
  setInterval(function () {
    Game.shimmers.forEach(function (shimmer) {
      if (shimmer.type == "golden") {
        shimmer.pop();
      }
    });
  }, 500);
}

function unlock() {
  Object.values(Game.UpgradesById).forEach((up) => {
    Game.Unlock(up.name);
    up.basePrice = 0;
  });
  Game.RefreshStore();
}

function changeName() {
  const input = document.getElementById("nameinput");
  const name = input.value;

  Game.bakeryName = name;
  Game.bakeryNameRefresh();
}
