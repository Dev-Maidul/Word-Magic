// Hide section
function hideSection(id){
    // document.getElementById(id).style.display="none";
    const element=document.getElementById(id);
    element.classList.add('hide');
}

// Show Section
function showSection(id)
{
    // document.getElementById(id).style.display="block";
    const element=document.getElementById(id);
    element.classList.remove('hide');
}
// Hide section
function getInnerTextbyid(id) {
    const value = document.getElementById(id).innerText;
    return value;
}

// for smooth scroling
function smoothScroll(event, targetId) {
    event.preventDefault(); 
    const target = document.getElementById(targetId);
    
    if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}
// active btn id
function setActive(clickedButton){
    const buttons=document.querySelectorAll(".lessonBTN");
    buttons.forEach((btn)=>{
        btn.classList.remove('btn-active');
        clickedButton.classList.add('btn-active');
    })
}
// show worddetails in modal
// function showWordModels(id)
// {
//     console.log(id);
// }

// Pronounce Word
function pronounceWord(word) {
    if (!word) {
        console.error("No word provided!");
        return;
    }
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US'; 
    window.speechSynthesis.speak(utterance);
}
