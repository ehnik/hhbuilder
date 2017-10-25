window.addEventListener("load", function() {

var submitButton, addButton, form, householdData, householdElem, memberIndex, removeButton;

//select relevant DOM elements
form = document.forms[0]; //selects member add form
addButton = document.getElementsByTagName('button')[0]; //selects form's add button
submitButton = document.getElementsByTagName('button')[1]; //selects form's submit button
householdElem = document.getElementsByTagName('ol')[0];

householdData = []; //initializes container array for member objects
memberIndex = 0; //initializes household member index

//adds household member when "add" is clicked
addButton.addEventListener("click", function(event){

  event.preventDefault(event); //prevents form from redirecting page and losing household data
  var newMember, relationship, age, smoker;

  relationship = form.elements["rel"].value;
  age = form.elements["age"].value;
  smoker = form.elements["smoker"].checked;

  //new member data validation
  if(relationship===""){
    alert("Please add this member's relationship information.")
  }
  else if(age=="0"){
    alert("Age must be greater than 0.")
  }
  else if(age===""){
    alert("Please enter an age.")
  }
  else if(!parseInt(age)){
    alert("Please enter a valid age.")
  }
  else{
    //adds new member to householdData array
    memberIndex++;
    newMember = {relationship: relationship, age: age, smoker: smoker, index: memberIndex};
    householdData.push(newMember);

    //creates DOM node for new member
    var memberNodeContainer = document.createElement("LI");
    var memberNode = document.createElement("UL");

    //adds new member to DOM
    var ageNode = document.createElement("LI");
    var ageNodeText = document.createTextNode("Age: " + newMember.age);
    ageNode.appendChild(ageNodeText);

    var relNode = document.createElement("LI");
    var relNodeText = document.createTextNode("Relationship: " + newMember.relationship);
    relNode.appendChild(relNodeText);

    var smokeNode = document.createElement("LI");
    var smokeNodeText = document.createTextNode("Smoker: " + newMember.smoker);
    smokeNode.appendChild(smokeNodeText);

    memberNode.appendChild(ageNode);
    memberNode.appendChild(relNode);
    memberNode.appendChild(smokeNode);

    //adds remove button to member node
    removeButton = document.createElement("button");
    removeButton.innerHTML="Remove";
    memberNode.appendChild(removeButton);

    //adds styling to member node
    memberNode.appendChild(document.createElement("br"));
    memberNode.appendChild(document.createElement("br"));
    memberNode.style.listStyle='none';

    //appends member node to container and container to proper DOM element
    memberNodeContainer.appendChild(memberNode);
    householdElem.appendChild(memberNodeContainer);

    //adds functionality to remove button
    removeButton.addEventListener("click", function(event){
      var arrayIndex;
      function returnMember(obj){
        return obj.index === newMember.index;
      }
      arrayIndex = householdData.findIndex(returnMember);
      householdData.splice(arrayIndex,1);
      householdElem.removeChild(memberNodeContainer);
    })
  }

  submitButton.addEventListener("click", function(event){

    event.preventDefault(event); //prevents form from redirecting page and losing household data

    var jsonHousehold, debug, XHR;
    jsonHousehold = JSON.stringify(householdData);//serializes household data array
    //displays serialized data on "pre" DOM element
    debug = document.getElementsByTagName('pre')[0];
    debug.innerHTML = jsonHousehold;
    debug.style.display = 'block';
    //sends serialized JSON on fake trip to server
    XHR = new XMLHttpRequest();
    XHR.open("POST", "fake_file.txt", true);
    XHR.setRequestHeader("Content-type", "text/html");
    XHR.send(jsonHousehold);
    XHR.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log("magic! " + this.responseText);
      }
      else{
        console.log("failed! " + this.responseText);
      }
    }
  })

})

})
