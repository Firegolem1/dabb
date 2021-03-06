//This is for JS, HTML is in index.md - and don't change the name of the file, it won't work.


var player = {
  money: 10,
  moneyMax: undefined,
  mps: 0,
  costs: {
    b: 10,
    s: 100,
    m: 1000,
  },
  tenCosts: {
    dTen: this.costs.b * (10 ^ 10),
    sTen: this.costs.s * (10 ^ 10),
    mTen: this.costs.m * (10 ^ 10),
  },
  amounts: {
    b: 0,
    s: 0,
    m: 0
  },
  mults: {
    b: 1,
    s: 1,
    m: 1,
    nD: 1,
    nS: 1,
    nM: 1
  },
  achievements: [],
  resets: 0,
  infinitied: 0,
  qld: 0,
  currentTimePlayed: 0,
  totalTimePlayed: 0,
  totalMoney: 0,
  materialNum: 0,
  material: "",
  options: {
    notation: "scientific",
    theme: "normal",
    
  }
}
const TIER_NAMES = ["b", "s", "m"];

parseFloat(player.money);



function formatValue(x, places) {
  var power = Math.floor(Math.log10(x))
  var matissa = x / Math.pow(10, power)
  if (x < 1000) return x.toFixed(0)
  else return ((matissa).toFixed(places) + "e" + power)
}

function save() {
  localStorage.setItem("layers",JSON.stringify(game));
}


//   Stuff
  


function onLoad() {
  if (player.money == undefined || player.money === NaN) player.money = 10;
  if (player.options.notation == undefined) player.options.notation = "scientific";
  if (player.money == Infinity) document.getElementById("infButton").display = "inline";
  if (player.moneyMax == undefined) setMoneyMax();
}

function showStats() {
  document.getElementById("statstab").display = "inline";
  document.getElementById("workerstab").display = "none";
  document.getElementById("optionstab").display = "none";
  document.getElementById("achievestab").display = "none";
  document.getElementById("inftab").display = "none";
}

function showWorkers() {
  document.getElementById("statstab").display = "none";
  document.getElementById("workerstab").display = "inline";
  document.getElementById("optionstab").display = "none";
  document.getElementById("achievestab").display = "none";
  document.getElementById("inftab").display = "none";
}

function showOptions() {
  document.getElementById("statstab").display = "none";
  document.getElementById("workerstab").display = "none";
  document.getElementById("optionstab").display = "inline";
  document.getElementById("achievestab").display = "none";
  document.getElementById("inftab").display = "none"; 
}

function showAchieves() {
  document.getElementById("statstab").display = "none";
  document.getElementById("workerstab").display = "none";
  document.getElementById("optionstab").display = "none";
  document.getElementById("achievestab").display = "inline";
  document.getElementById("inftab").display = "none"; 
}

function showInfTab() {
  document.getElementById("statstab").display = "none";
  document.getElementById("workerstab").display = "none";
  document.getElementById("optionstab").display = "none";
  document.getElementById("achievestab").display = "none";
  document.getElementById("inftab").display = "inline";
}

function getMaterialWord() {
  player.materialNum ++;
  if (player.materialNum === 0) {
    player.material = undefined;
  } else if(player.materialNum === 1) {
     player.material = "clay";
    }  else if (player.materialNum === 2) {
     player.material = "copper";
    } else if (player.materialNum === 3) {
     player.material = "tin";
    } else if (player.materialNum === 4) {
     player.material = "bronze";
    } else if (player.materialNum === 5) {
     player.material = "iron";
    } else if (player.materialNum === 6) {
     player.material = "steel";
    } else if (player.materialNum === 7) {
     player.material = "silver";
    } else if (player.materialNum === 8) {
     player.material = "gold";
    } else if (player.materialNum === 9) {
     player.material = "platinum";
    } else if (player.materialNum === 10) {
     player.material = "diamond";
   }
  document.getElementById("material").innerHTML = player.material;
  getMults();
}  
getMaterialWord();

function setMoneyMax() {
  if (player.material === "clay") {
    player.moneyMax = 100;
  } else if (player.material === "copper") {
    player.moneyMax = 1000;
  } else if (player.material === "tin") {
    player.moneyMax = 10000;
  } else if (player.material === "bronze") {
    player.moneyMax = 100000;
  } else if (player.material === "iron") {
    player.moneyMax = 1e+10;
  } else if (player.material === "steel") {
    player.moneyMax = 1e+25;
  } else if (player.material === "silver") {
    player.moneyMax = 1e+50;
  } else if (player.material === "gold") {
    player.moneyMax = 1e+100;
  } else if (player.material === "platinum") {
    player.moneyMax = 1e+200;
  } else if (player.material === "diamond") {
    player.moneyMax = Number.MAX_VALUE;
  }
}
setMoneyMax();

function enforceMax() {
  if (Math.max(player.money, player.moneyMax) === player.money) {
    player.money = player.moneyMax;
    player.mps = 0;
  }
  
}
function getMPS() {
  player.mps = (player.amounts.d * player.mults.d) + ((player.amounts.s * 10) * player.mults.s) + ((player.amounts.m * 100) * player.mults.m);
}
getMPS();


function buyWorker(tier) {
  if (player.money - player.costs[tier] >= 0) {
    player.amounts[tier] ++;
    player.money -= player.costs[tier];
    player.costs[tier] = player.costs[tier] * 10
    getMPS();
  } 
}

function buyManyWorkers(tier) {
  var level = TIER_NAMES[tier];
  if (player.money - player.tenCosts[tier + "Ten"] >= 0) {
    for (var i = 0; i < 10; i++) {
      buyWorker(tier);
    }
  }
}





function display() {
  getMPS();
  
  player.mults.nD = 2 * (Math.log10(player.money) ^ 2);
  player.mults.nS = Math.log10(player.money) ^ 2;
  player.mults.nM = (Math.log10(player.money) ^ 2) / 2;
  
   
  var dMult = document.getElementById("cDMult");
  dMult.innerHTML = "x" + formatValue(player.mults.d, 0);
  
  var sMult = document.getElementById("cSMult");
  sMult.innerHTML = "x" + formatValue(player.mults.s, 0);
  
  var mMult = document.getElementById("cMMult");
  mMult.innerHTML = "x" + formatValue(player.mults.m, 0);
  

  var mps = document.getElementById("mps");
  mps.innerHTML = "You are getting " + formatValue(player.mps, 0) + " layers per second.";
  
  
  var money = document.getElementById("money");
  money.innerHTML = formatValue(player.money, 0);
  
  var qlds = document.getElementById("qlds");
  qlds.innerHTML = "You have " + formatValue(player.qld, 0) + " Quantum Layering Devices (QLD's).";
  
  var dCost = document.getElementById("dCost");
  dCost.innerHTML = "Cost: " + formatValue(player.costs.d, 0);
  
  var dMax = document.getElementById("dMax");
  dMax.innerHTML = "Until 10. Cost: " + formatValue(player.costs.dTen, 0);
  
  var dAmt = document.getElementById("dAmount");
  dAmt.innerHTML = formatValue(player.amounts.d, 0);
  
  var sCost = document.getElementById("sCost");
  sCost.innerHTML = "Cost: " + formatValue(player.costs.s, 0);
  
  var sMax = document.getElementById("sMax");
  sMax.innerHTML = "Until 10. Cost: " + formatValue(player.tenCosts.sTen, 0);
  
  var sAmt = document.getElementById("sAmount");
  sAmt.innerHTML = formatValue(player.amounts.s, 0);
  
  var mCost = document.getElementById("mCost");
  mCost.innerHTML = "Cost: " + formatValue(player.costs.m, 0); 
  
  var mMax = document.getElementById("mMax");
  mMax.innerHTML = "Until 10, Cost: " + formatValue(player.tenCosts.mTen, 0);
  
  var mAmt = document.getElementById("mAmount");
  mAmt.innerHTML = formatValue(player.amounts.m, 0); 
  
  var totalTime = document.getElementById("totalTimeStat");
  totalTime.innerHTML = player.totalTimePlayed;
  
  var currentTime = document.getElementById("currentInfStat");
  //currentTime.innerHTML = player.currentTimePlayed;
  // it doesn't work for some reason, don't remove the "//"
  
  var totalLayers = document.getElementById("totalLayerStat");
  totalLayers.innerHTML = formatValue(player.totalMoney, 1);
  
  var infinitied = document.getElementById("infinitiedStat");
  infinitied.innerHTML = formatValue(player.infinitied, 1);
  
  var resetStat = document.getElementById("resetStat");
  resetStat.innerHTML = formatValue(player.resets, 1);
}
display();

function reset() {
  player.resets ++;
  player.money = 10;
  player.moneyMax = undefined;
  player.mps = 0;
  player.costs.b = 10;
  player.costs.s = 100;
  player.costs.m = 1000;
  player.tenCosts.dTen = this.dCost * (10 ^ 10);
  player.tenCosts.sTen = this.sCost * (10 ^ 10);
  player.tenCosts.mTen = this.mCost * (10 ^ 10);
  player.amounts.b = 0;
  player.amounts.s = 0;
  player.amounts.m = 0;
  player.mults.c = 1;
  player.mults.c = 1;
  player.mults.c = 1;
  display();
  setMoneyMax();
}

function getMults() {
   display();
   if (player.materialNum > 1) {
     player.mults.b = player.mults.nD;
     player.mults.s = player.mults.nS;
     player.mults.m = player.mults.nM;
     reset();
     player.resets --;
   }
}

function newMaterial() {
   if (player.money === player.moneyMax) {
     reset();
     getMaterialWord();
     setMoneyMax();
   }  
}

function infinity() {
  if (player.money === player.moneyMax && player.material == "diamond") {
    reset();
    player.qld ++;
    player.infinitied ++;
    player.materialNum = 0;
    player.resets = 0;
    document.getElementById("qlds").display = "inline";
    display();
    setMoneyMax();
  }
}


