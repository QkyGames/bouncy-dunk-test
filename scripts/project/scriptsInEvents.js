//-------------------------------------------------------------------
// ODEN-CAN GAME SDK
//-------------------------------------------------------------------
// debugMode?
let isIframe = window != window.parent;

let maxPlayCount;
let playerId;
let targetScore;
let difficulty;

// dummy response
let resReady = {
  responseCode: 0,
  maxPlayCount: 5,
  playerId: "AAAA",
  targetScore: 1000,
  difficulty: 1,
};
let resGo = { responseCode: 0 };

/*
Initialization
*/
init();

function init() {

  	console.log(isIframe);
	
	/*OCGReady((res) => {
		maxPlayCount = res.maxPlayCount;
		playerId = res.playerId;
		targetScore = res.targetScore;
		difficulty = res.difficulty;
	});*/
	

   	//DrawUserInfo();
  
}

function DrawUserInfo() {
  userInfo.innerHTML =
    "maxPlayCount:" +
    maxPlayCount +
    " playerId:" +
    playerId +
    "<br> targetScore:" +
    targetScore +
    " difficulty:" +
    difficulty;
}

// Setup dummy response
export function OCGSetDevelopResponse(
  maxPlayCount,
  playerId,
  targetScore,
  difficulty
) {
  resReady.maxPlayCount = maxPlayCount;
  resReady.playerId = playerId;
  resReady.targetScore = targetScore;
  resReady.difficulty = difficulty;
}

/*
Change to ReadyState
*/
export async function OCGReady(okCallback) {
  let result;
  
  if(!isServerLessMode) return result;
  
  if (isIframe) {
    result = await window.parent.odencanWeb.OCWSetReadyState();
    if (okCallback != null) {
      okCallback(result);
    }
  } else {
    result = resReady;
  }
  return result;
}


/*
Change to StartState
*/
export async function OCGGo(okCallback) {
  let result;

  if (isIframe) {
    result = await window.parent.odencanWeb.OCWSetGoState();
    if (okCallback != null) {
      okCallback(result);
    }
  } else {
    result = resGo;
  }

  return result;
}

/*
Change to FinishState
*/
export async function OCGFinish(score, okCallback) {
  let result;

  if (isIframe) {
    result = await window.parent.odencanWeb.OCWSetFinishState(score);
    if (okCallback != null) {
      okCallback(result);
    }
  } else {
    result = resGo;
  }

  return result;
}

/*
Change to ReturnState
*/
export async function OCGTerminate(okCallback) {
  let result;

  if (isIframe) {
    result = await window.parent.odencanWeb.OCWTerminate();
    if (okCallback != null) {
      okCallback(result);
    }
  } else {
    result = resGo;
  }

  return result;
}

/*
Finish SDK
*/
export function OCGClose() {
  if (window.parent && window.parent.odencanWeb) {
    window.parent.odencanWeb.OCWCloseGame();
  }
}

/*
Send a heartbeat
*/
export function OCGHeartBeat(score) {
  if (window.parent && window.parent.odencanWeb) {
    window.parent.odencanWeb.OCWHeartBeat(score);
  }
}



const scriptsInEvents = {



};

self.C3.ScriptsInEvents = scriptsInEvents;

