const state = {
    xmlDocObj:null,
    nodes:['UserId','User_type','Name','age','designation']
}


const loadXml = () => {
    let xhttp;
    if(window.XMLHttpRequest){
        xhttp = new XMLHttpRequest();
    }else{
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4 && xhttp.status == 200){
            showTable(xhttp.responseXML)
        }
    }

    xhttp.open('GET','progress_tracking.xml',true);
    xhttp.send();
}

const showTable = (xmlRes) => {
    if(!xmlRes){return;}
    state.xmlDocObj = xmlRes;
    let table;
    table = `<tr style='background:#36304a;color:#fff;'>
        <th>USER Id</th>
        <th>USER TYPE</th>
        <th>Name</th>
        <th>AGE</th>
        <th>DESIGNATION</th>
        </tr>`;
    const x = xmlRes.getElementsByTagName("User");
    for(let i=0;i<x.length;i++){
        table += `<form onsubmit="submitFormHandler()">
        <tr>
            <td>${xmlRes.getElementsByTagName("UserId")[i].childNodes[0].nodeValue}</td>
            <td>${xmlRes.getElementsByTagName("User_type")[i].childNodes[0].nodeValue}</td>
            <td>${xmlRes.getElementsByTagName("Name")[i].childNodes[0].nodeValue}</td>
            <td>${xmlRes.getElementsByTagName("Age")[i].childNodes[0].nodeValue}</td>
            <td>${xmlRes.getElementsByTagName("Designation")[i].childNodes[0].nodeValue}</td>
            <td id='edit_delete_cont_${i}'>
                <ion-icon name="pencil-outline" class="edit_icon" onclick="changeNode(${i})"></ion-icon>
                <ion-icon onclick="removeNode(${i})" name="trash-outline" class="delete_icon"></ion-icon>
            </td>
            <td id='submit_cancel_cont_${i}' class='hide'>
                <input type=submit><ion-icon type='submit' name="arrow-forward-circle-outline" class="edit_icon" style="color:green;"></ion-icon></submit>
                
                <ion-icon class="delete_icon" name="close-circle-outline"></ion-icon>
            </td>
            </tr>
        </form>`;
    }
    document.getElementById("member_table").innerHTML = table;
}

const removeNode = (id) => {
    if(id == null){return}
    let child = state.xmlDocObj.getElementsByTagName('User')[id];
    state.xmlDocObj.documentElement.removeChild(child);
    showTable(state.xmlDocObj)
}

const changeNode = (id) => {
    if(id == null){return}
    document.getElementById("form_cont").classList.toggle('hide');
    const form = document.getElementById("changeForm");
    let formElem = `
    <input disabled class='input_fields' type='text' placeholder='USER ID' value='${state.xmlDocObj.getElementsByTagName("UserId")[id].childNodes[0].nodeValue}'/>
    <input disabled class='input_fields' type='text' placeholder='USER TYPE' value='${state.xmlDocObj.getElementsByTagName("User_type")[id].childNodes[0].nodeValue}'/>
    <input class='input_fields' type='text' placeholder='NAME' value='${state.xmlDocObj.getElementsByTagName("Name")[id].childNodes[0].nodeValue}'/>
    <input class='input_fields' type='text' placeholder='AGE' value='${state.xmlDocObj.getElementsByTagName("Age")[id].childNodes[0].nodeValue}'/>
    <input class='input_fields' type='text' placeholder='DESIGNATION' value='${state.xmlDocObj.getElementsByTagName("Designation")[id].childNodes[0].nodeValue}'/>
    <div class='btn_cont'>
        <button class='submit_btn' type='submit' onclick='submitFormHandler(${id})'>Submit</button>
        <button class='cancel_btn' onclick='cancelFormHandler()'>Cancel</button>
    </div>
    `;

    form.innerHTML = formElem;
    
}



const submitFormHandler = (id) => {
    event.preventDefault();
    const inputFields = document.getElementsByClassName("input_fields");
    state.xmlDocObj.getElementsByTagName("UserId")[id].childNodes[0].nodeValue = inputFields[0].value;
    state.xmlDocObj.getElementsByTagName("User_type")[id].childNodes[0].nodeValue = inputFields[1].value;
    state.xmlDocObj.getElementsByTagName("Name")[id].childNodes[0].nodeValue = inputFields[2].value;
    state.xmlDocObj.getElementsByTagName("Age")[id].childNodes[0].nodeValue = inputFields[3].value;
    state.xmlDocObj.getElementsByTagName("Designation")[id].childNodes[0].nodeValue = inputFields[4].value;
    console.log(inputFields[0].value)
    showTable(state.xmlDocObj)
    cancelFormHandler();
}

const cancelFormHandler = () => {
    event.preventDefault();
    document.getElementById("form_cont").classList.toggle('hide');

}

const addNewFormHandler = () => {
    event.preventDefault();
    document.getElementById("form_cont").classList.toggle('hide');
    document.getElementById("form_heading").innerHTML = "Add new node"
    const form = document.getElementById("changeForm");
    let formElem = `
    <input class='input_fields' type='text' placeholder='USER Id' value=''/>
    <input class='input_fields' type='text' placeholder='USER TYPE' value=''/>
    <input class='input_fields' type='text' placeholder='NAME' value=''/>
    <input class='input_fields' type='text' placeholder='AGE' value=''/>
    <input class='input_fields' type='text' placeholder='DESIGNATION' value=''/>
    <div class='btn_cont'>
        <button class='submit_btn' type='submit' onclick='addNewNodeHandler()'>Submit</button>
        <button class='cancel_btn' onclick='cancelFormHandler()'>Cancel</button>
    </div>
    `;

    form.innerHTML = formElem;
}

const addNewNodeHandler = () => {
    event.preventDefault();
    const inputFields = document.getElementsByClassName("input_fields");
    const newnode = state.xmlDocObj.createElement("User")
    state.nodes.map((el,i) => {
        let newTitle = state.xmlDocObj.createElement(el)
        let newText = state.xmlDocObj.createTextNode(inputFields[i].value)
        newTitle.appendChild(newText)
        newnode.appendChild(newTitle);
    });

    state.xmlDocObj.documentElement.insertBefore(newnode,null)
    showTable(state.xmlDocObj)
    cancelFormHandler()
}

loadXml();



