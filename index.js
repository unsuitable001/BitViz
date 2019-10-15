window._logger_flag_ufectrtvo78rtweafdhdg76743hg = 0;
window.lastdata = "";
window._log_multiply_factor_jhhdgyfdsgvlsdfyvyukfd = 1;
sessionStorage.clear();
// keep modal status for keyup event
let isInModal = false;

// check keyup event for shortcut keys
window.addEventListener(
    'keyup',
    function(e) {
        if (!isInModal) {
        // skip event if any modal are open
        // if user press M key to modify current variable value
        // then open edit variable modal and call controls after that
            if (e.code == 'KeyM') {
                // check selected var item
                if (flowControl()) {
                    editVarValue.value = '';
                    switchModal('editVarModal');
                }
            } else {
                Controls(e);
            }
        }
    },
    true,
);

let modalBox = document.getElementById('modalBox');
let newVarName = document.getElementById('newVarName');
let newVarValue = document.getElementById('newVarValue');
let editVarValue = document.getElementById('editVarValue');

// show help-modal
document.getElementById('helpBtn').onclick = function() {
    switchModal('helpModal');
};

// show var-modal when click on +add new variable button
document.getElementById('getVar').onclick = function() {
    showNewVarModal();
};

// click on Ok button in add new var modal
document.getElementById('addNewVar').onclick = function() {
    addNewVar();
};

// click on Ok button in edit selected var modal
document.getElementById('editSelectedVar').onclick = function() {
    editSelectedVar();
};
document.getElementById("RShift").onclick = function(){
    RShift();
}
document.getElementById("LShift").onclick = function(){
    LShift();
}
document.getElementById("AND").onclick = function(){
    AND();
}
document.getElementById("OR").onclick = function(){
    OR();
}
document.getElementById("XOR").onclick = function(){
    XOR();
}
document.getElementById("NOT").onclick = function(){
    NOT();
}
document.getElementById("pasteLog").onclick = function(){
    pasteLog();
}

// hide modal with close button
document.querySelectorAll('.modalClose').forEach((el) =>
    el.addEventListener('click', function() {
        switchModal(el.dataset.parent, false);
    }),
);

// open all link tags with external browser
if(typeof process != 'undefined') {
    const { shell } = require('electron');

    document.querySelectorAll("a[href^='http']").forEach((el) =>
        el.addEventListener('click', function(event) {
            openLink(el.href);
            event.preventDefault();
        }),
    );

    // open url with external browser
    function openLink(url) {
        shell.openExternal(url);
    }
} else {
    window.onbeforeunload = function(){
        return "If you leave the page, your progress will be lost.";
    }
}

function getBit(x,varName)
{
    let elm = document.getElementById(varName).getElementsByClassName("bit");
    let i=31;
    while(i>=0)
    {
        if(x&1)
        {
            elm[i].classList.remove('grey','green');
            elm[i].classList.add('green');
            elm[i].innerText="1";
        }
        else
        {
            elm[i].classList.remove('grey','green');
            elm[i].classList.add('grey');
            elm[i].innerText="0";
        }
        x>>=1;
        i--;
    }
}
function logger(data)
{
    if(data == window.lastdata)
    {
        window._log_multiply_factor_jhhdgyfdsgvlsdfyvyukfd++;
        sessionStorage.setItem(window._logger_flag_ufectrtvo78rtweafdhdg76743hg-1,data+'    // x'+window._log_multiply_factor_jhhdgyfdsgvlsdfyvyukfd);
        return;
    }
    window._log_multiply_factor_jhhdgyfdsgvlsdfyvyukfd=1;
    sessionStorage.setItem(window._logger_flag_ufectrtvo78rtweafdhdg76743hg,data);
    window._logger_flag_ufectrtvo78rtweafdhdg76743hg++;
    window.lastdata = data;
}
function pasteLog()
{
    let i = 0;
    let x = ""
    switchModal('logModal');
    while(i<window._logger_flag_ufectrtvo78rtweafdhdg76743hg)
    {
        x += sessionStorage.getItem(i) +'<br>';
        i++;
    }
    document.getElementById("logpage").innerHTML = x;
}
function addVar(varName, value)
{
    window[varName] = value;
    document.getElementById("calcArea").insertAdjacentHTML('beforeend',`<div class="row" id="`+varName+`">
    <div class="column">
                <div class="ui one column grid">
                    <div class="column">
                        <div class="ui celled one column grid">
                            <div class="delBit column"></div>
                        </div>
                    </div>
                </div>
            </div>
    <div class="eleven wide column">
        <div class="ui sixteen column grid" id="bin-`+varName+`">
            <div class="eight wide column">
                <div class="ui celled sixteen column grid">
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                </div>
            </div>
            <div class="eight wide column">
                <div class="ui celled sixteen column grid">
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                    <div class="bit column"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="column">
        <div class="ui one column grid">
            <div class="column">
                <div class="ui celled one column grid">
                    <div class="delBit column"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="two wide column">
        <div class="ui one column grid">
            <div class="column">
                <div class="ui celled two column grid">
                    <div class="column" id="cell_`+varName+`">`+varName+`</div>
                    <div class="rval column">`+value+`</div>
                </div>
            </div>
        </div>
    </div>
</div>`);
getBit(value, varName);
document.getElementById("cell_"+varName).onclick = function select(){
    this.classList.toggle('blue');
    this.classList.remove('olive');
};
document.getElementById("cell_"+varName).ondblclick = function dblselect(){
    this.classList.toggle('olive');
};
}

function flowControl()
{
    let selected = document.getElementsByClassName("blue");
    let assign = document.getElementsByClassName("olive");
    if(selected.length == 1 && assign.length==0)
    {
        return [selected,selected];
    }
    if(selected.length==0)
    {
        alert("Nothing Selected!!");
        return false;
    }
    return [selected, assign];
}

function modifyVal(varName, value)
{
    let parent = document.getElementById(varName);
    let valElem = parent.getElementsByClassName("rval")[0];
    window[varName] = value;
    valElem.innerText = window[varName]
    getBit(parseInt(valElem.innerText), varName);
}

function LShift()
{
    let src =flowControl();
    src = src[0];
    let i=src.length -1;
    while(i>=0)
    {
        varName = src[i].innerText;
        let parent = document.getElementById(varName);
        parent.getElementsByClassName("delBit")[1].innerText = "";
        parent.getElementsByClassName("delBit")[0].innerText = (window[varName]>>31)&1;
        modifyVal(varName,window[varName]<<1);
        i--;
        logger(varName+'<<=1;');
    }
}


function RShift()
{
    let src =flowControl();
    src = src[0];
    let i=src.length -1;
    while(i>=0)
    {
        varName = src[i].innerText;
        let parent = document.getElementById(varName);
        parent.getElementsByClassName("delBit")[0].innerText = "";
        parent.getElementsByClassName("delBit")[1].innerText = window[varName]&1;
        modifyVal(varName,window[varName]>>1);
        i--;
        logger(varName+'>>=1;');
    }
}

function AND()
{
    let src =flowControl();
    let dest = src[1];
    src = src[0];
    let res = window[src[0].innerText];
    logger('_loggerTemp='+src[0].innerText);
    let i = src.length - 1;
    let j = dest.length - 1;
    while(i>0)
    {
        res&=window[src[i].innerText];
        logger('_loggerTemp&='+src[i].innerText+';');
        i--;
    }
    while(j>=0)
    {
        modifyVal(dest[j].innerText,res);
        logger(dest[j].innerText+'=_loggerTemp;');
        j--;
    }
}

function OR()
{
    let src =flowControl();
    let dest = src[1];
    src = src[0];
    let res = window[src[0].innerText];
    logger('_loggerTemp='+src[0].innerText);
    let i = src.length - 1;
    let j = dest.length - 1;
    while(i>0)
    {
        res|=window[src[i].innerText];
        logger('_loggerTemp|='+src[i].innerText+';');
        i--;
    }
    while(j>=0)
    {
        modifyVal(dest[j].innerText,res);
        logger(dest[j].innerText+'=_loggerTemp;');
        j--;
    }
}

function XOR()
{
    let src =flowControl();
    let dest = src[1];
    src = src[0];
    let res = window[src[0].innerText];
    logger('_loggerTemp='+src[0].innerText);
    let i = src.length - 1;
    let j = dest.length - 1;
    while(i>0)
    {
        res^=window[src[i].innerText];
        logger('_loggerTemp^='+src[i].innerText+';');
        i--;
    }
    while(j>=0)
    {
        modifyVal(dest[j].innerText,res);
        logger(dest[j].innerText+'=_loggerTemp;');
        j--;
    }
}

function NOT()
{
    let src =flowControl();
    let dest = src[1];
    src = src[0][0].innerText;
    let j = dest.length - 1;
    while(j>=0)
    {
        modifyVal(dest[j].innerText,~(window[src]));
        logger(dest[j].innerText+'=~'+src);
        j--;
    }
}
function Controls(e)
{
    if(e.code=="Backslash")
    {
        showNewVarModal(); // show add new variable modal
        return false;
    }
    let src =flowControl();
    if(e.key == "ArrowLeft")
    {
        LShift();
    }
    else if(e.key == "ArrowRight")
    {
        RShift();
    }
    else if(e.key == "ArrowUp")
    {
        src = src[0];
        let i=src.length -1;
        while(i>=0)
        {
            let x = src[i].innerText;
            modifyVal(x,window[x]+1);
            logger(src[i].innerText+'++;');
            i--;
        }
    }
    else if(e.key == "ArrowDown")
    {
        src = src[0];
        let i=src.length -1;
        while(i>=0)
        {
            let x = src[i].innerText;
            modifyVal(x,window[x]-1);
            logger(src[i].innerText+'--;');
            i--;
        }
    }
    else if(e.code=="KeyN")
    {
        NOT();
    }
    else if(e.code=="KeyX")
    {
        XOR();
    }
    else if(e.code=="KeyO")
    {
        OR();
    }
    else if(e.code=="KeyA")
    {
        AND();
    }
    else if(e.code=="KeyM")
    {
        let x= flowControl();
        x=x[0];
        let i = x.length -1;
        let y = e.newValue; // get new value after edit
        while(i>=0)
        {
            modifyVal(x[i].innerText,y);
            logger(x[i].innerText+'='+y+';');
            i--;
        }
    }
    else if(e.key=="=")
    {
        modifyVal(src[1][0].innerText,src[0][0].nextSibling.nextSibling.innerText);
        logger(src[1][0].innerText+'='+src[0][0].innerText+';');
    }
    else if(e.key=="+")
    {
        let res = 0;
        let dest = src[1];
        src = src[0];
        logger('_loggerTemp=0');
        let i = src.length - 1;
        let j = dest.length - 1;
        while(i>=0)
        {
            res+=window[src[i].innerText];
            logger('_loggerTemp+='+src[i].innerText+';');
            i--;
        }
        while(j>=0)
        {
            modifyVal(dest[j].innerText,res);
            logger(dest[j].innerText+'=_loggerTemp;');
            j--;
        }
    }
    else if(e.key=="*")
    {
        let res = 1;
        let dest = src[1];
        src = src[0];
        logger('_loggerTemp=1');
        let i = src.length - 1;
        let j = dest.length - 1;
        while(i>=0)
        {
            res*=window[src[i].innerText];
            logger('_loggerTemp*='+src[i].innerText+';');
            i--;
        }
        while(j>=0)
        {
            modifyVal(dest[j].innerText,res);
            logger(dest[j].innerText+'=_loggerTemp;');
            j--;
        }
    }
    else if(e.key=="-")
    {
        let dest = src[1];
        src = src[0];
        let ss = src.length;
        let j = dest.length - 1;
        let i=1;
        let res = window[src[0].innerText];
        logger('_loggerTemp='+src[i].innerText);
        while(ss>i)
        {
            res-=window[src[i].innerText];
            logger('_loggerTemp-='+src[i].innerText+';');
            i++;
        }
        while(j>=0)
        {
            modifyVal(dest[j].innerText,res);
            logger(dest[j].innerText+'=_loggerTemp;');
            j--;
        }
    }
    else if(e.key=="/")
    {
        let dest = src[1];
        src = src[0];
        let ss = src.length;
        let j = dest.length - 1;
        let i=1;
        let res = window[src[0].innerText];
        logger('_loggerTemp='+src[i].innerText);
        while(ss>i)
        {
            res=Math.floor(res/window[src[i].innerText]);
            logger('_loggerTemp/='+src[i].innerText+';');
            i++;
        }
        while(j>=0)
        {
            modifyVal(dest[j].innerText,res);
            logger(dest[j].innerText+'=_loggerTemp;');
            j--;
        }
    }
    return false;
}

// helper method to show/hide any modal inside page
function switchModal(modalId, show = true) {
    let modal = document.getElementById(modalId);

    if (show) {
        modalBox.classList.add('active');
        modal.classList.add('active', 'visible');
        modal.classList.remove('hidden');
        isInModal = true;
    } else {
        modalBox.classList.remove('active');
        modal.classList.remove('active', 'visible');
        modal.classList.add('hidden');
        isInModal = false;
    }
}

// show new variable modal with empty field
function showNewVarModal() {
    newVarName.value = '';
    newVarValue.value = '';

    switchModal('newVarModal');
}

// submit new variable and hide the modal
function addNewVar() {
    let x = newVarName.value;
    let y = newVarValue.value;

    if (isNaN(parseInt(y))) {
        addVar(x, y.charCodeAt(0));
    } else {
        addVar(x, parseInt(y));
    }

    switchModal('newVarModal', false);
}

// submit new value for selected variable and hide the modal
function editSelectedVar() {
    let y = editVarValue.value;

    if (isNaN(parseInt(y))) {
        y = y.charCodeAt(0);
    } else {
        y = parseInt(y);
    }

    switchModal('editVarModal', false);

    // call Controls method with an object similar to key event but with new value
    Controls({ code: 'KeyM', newValue: y });
}