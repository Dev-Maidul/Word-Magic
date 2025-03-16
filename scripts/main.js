
hideSection("faq");
hideSection("Vocabulary");
hideSection("navbar");

hideSection("spinner");

// Log in verification

const button = document.getElementById("getStarted");
button.addEventListener("click", function (event) {
  const password = document.getElementById("password").value;
  const name = document.getElementById("username").value;
  if (name) {
    if (password == 123456) {
      const modalBox = document.getElementById("modalbox");
      const div = document.createElement("div");
      div.innerHTML = `
            <h1 class="font-bold text-2xl text-center">Hello! ${name}</h1>
            <img class="w-[200px] mx-auto text-center" src="https://img.icons8.com/?size=100&id=AefXIkx4A693&format=png&color=000000" alt="">

            <p class="py-4 text-center">Congratulations! You are successfully loged in</p>
            `;
      modalBox.append(div);
      my_modal_1.showModal();
      hideSection("bannerContainer");

      showSection("footer");
      showSection("faq");
      showSection("Vocabulary");
      showSection("navbar");
    } else {
      alert("Your password is not correct");
    }
  } else {
    alert("Pleae Enter your User Name");
  }
});

// When click logout hide the Navbar, Vocabulary Section, and FAQ Section
const logout = document.getElementById("logout");
logout.addEventListener("click", (event) => {
  hideSection("faq");
  hideSection("Vocabulary");
  hideSection("navbar");
  showSection('bannerContainer');
});

// ================== Create dynamically generated buttons from API-01 for each lesson=============
const generatedButton = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/levels/all"
  );
  const data = await response.json();
  showButton(data.data);
};

function showButton(buttons) {
  const buttonContainer = document.getElementById("buttonContainer");

  buttons.forEach((button) => {
    // console.log(button.id)
    const btnid = button.id;
    const div = document.createElement("div");
    div.innerHTML = `
        <button onclick="setActive(this);loadWord('${button.level_no}'); hideSection('lessonhide');" class="btn btn-outline btn-primary group lessonBTN">
            <img
              class="bg-transparent group-hover:bg-white"
              src="./assets/fa-book-open.png"
              alt=""
            />
           Lesson- ${button.level_no}
          </button>
        
        `;
    buttonContainer.append(div);
  });
}
// =============on Clicking a Specific Lesson Button Load All the words from API-02===========
const loadWord = async (id) => {
  showSection("spinner");
  const response = await fetch(
    `https://openapi.programming-hero.com/api/level/${id}`
  );
  const data = await response.json();
  displayWord(data.data);
  hideSection("spinner");
};
// Display word
const displayWord = (words) => {
  showSection("vocabularyContainer");
  // console.log(words)
  const vocabularyContainer = document.getElementById("vocabularyContainer");
  vocabularyContainer.innerHTML = "";
  hideSection("notFound");
  if (words.length > 0) {
    for (let word of words) {
      const wordid = word.id;
      // console.log(wordid);
      const div = document.createElement("div");
      const meaningText = word.meaning
        ? `<h1 class="font-bold text-xl m-3">${word.meaning}/${word.pronunciation}</h1>`
        : `<h1 class="font-bold text-xl m-3 text-red-500">অর্থ খুঁজে পাওয়া যায়নি</h1>`;

      div.innerHTML = `
          <h1 class="font-bold text-xl m-3">${word.word}</h1>
          <small>Meaning/Pronunciation</small>
          ${meaningText}
          <p class="flex justify-between w-9 gap-[250px] mt-10">
            <img onclick="fetchApiFormodels('${word.id}')" class="cursor-pointer" src="./assets/Group 10.png" alt=""> 
            <img onclick="pronounceWord('${word.word}')" class="cursor-pointer" src="./assets/Group 9.png" alt="Pronounce">


          </p>
        `;

      div.classList.add("bg-white", "rounded-md", "p-5", "text-center");
      vocabularyContainer.append(div);
    }
  } else {
    hideSection("vocabularyContainer");
    showSection("notFound");
  }
};

// Fetch API for word details modal by id
const fetchApiFormodels = async (id) => {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/word/${id}`
    );
    const data = await response.json();
    displaywordDetailsModal(data.data);
  } catch (error) {
    console.error("Error fetching word data:", error);
  }
};

function displaywordDetailsModal(wordId) {
  console.log(wordId);
  const modal = document.getElementById("wordModal");
  const wordContainer = document.getElementById("wordcontainer");
  wordContainer.innerHTML="";
  const meaningText = wordId.meaning
        ? `<h1 class="font-bold text-xl m-3">${wordId.meaning}</h1>`
        : `<h1 class="font-bold text-xl m-3 text-red-500">অর্থ খুঁজে পাওয়া যায়নি</h1>`;
  const div = document.createElement("div");
  div.innerHTML = `
  <h3 class="text-lg font-bold flex">${wordId.word}(<img onclick="pronounceWord('${wordId.word}')" class="cursor-pointer w-6"src="https://img.icons8.com/?size=100&id=43634&format=png&color=000000" alt="Pronounce">:${wordId.pronunciation})</h3>
    <p class="mt-4 font-semibold">meaning</p>
    ${meaningText}
    <p class="font-semibold mt-3">Example</p>
    <p class="">${wordId.sentence}</p>
    <p class="font-semibold mt-3 mb-2">সমার্থক শব্দ গুলো</p>
    <div id="synonymsContainer"></div>
  <form method="dialog">
  
        <button class="btn btn-primary mt-3">Complete Learning</button>
      </form>
  
  `;
  wordContainer.append(div);
  const synonymsContainer = document.getElementById("synonymsContainer");
  const synonyms=wordId.synonyms;
  console.log(synonyms);
  if(synonyms.length>0)
  {
    synonyms.forEach((word)=>{
      const btn=document.createElement("button");
      btn.className="btn m-1";
      btn.textContent=word;
      synonymsContainer.appendChild(btn)
    }) 
  }
  else {
    const h1 = document.createElement("h1");
    h1.className = "font-bold text-xl m-3 text-red-500";
    h1.textContent = "সমার্থক শব্দ খুঁজে পাওয়া যায়নি";
    synonymsContainer.appendChild(h1);
  }
 


  modal.showModal();
}

generatedButton();
