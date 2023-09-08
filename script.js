
// it's called when click an img and  remove the class hidden of textcontainer making it appear
function Click(element) {
  // Find the closest parent element with the class 'TextContainer'
  const textContainer = element.closest('.col').querySelector('.TextContainer');

  // Remove the 'hidden' class from the 'TextContainer'
  textContainer.classList.remove('hidden');
}


// it's called when click the closewindow img and add the hidden class to the textcontainer
function closeWindow() {
  // Find all elements with the class 'TextContainer' and add the 'hidden' class to each one
  const textContainers = document.querySelectorAll('.TextContainer');
  textContainers.forEach((textContainer) => {
    textContainer.classList.add('hidden');
  });
}


// animation of the mouse 
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#ffb56b",
  "#fdaf69",
  "#f89d63",
  "#f59761",
  "#ef865e",
  "#ec805d",
  "#e36e5c",
  "#df685c",
  "#d5585c",
  "#d1525c",
  "#c5415d",
  "#c03b5d",
  "#b22c5e",
  "#ac265e",
  "#9c155f",
  "#950f5f",
  "#830060",
  "#7c0060",
  "#680060",
  "#60005f",
  "#48005f",
  "#3d005e"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();




// function that gets Data from the API 
const fetchData = async () => {
  try {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

//  Add the Data to the html document
fetchData()
  .then(data => {
    for (let i = 1; i < 11; i++) {
      let titleElement = document.querySelector('.title-' + i);
      titleElement.textContent = data.drinks[i].strDrink;
      let imgElement = document.querySelector('.img-' + i);
      imgElement.src = data.drinks[i].strDrinkThumb;
      let pElement = document.querySelector('.instructions-' + i);
      pElement.textContent = data.drinks[i].strInstructions;
    }
  })
  .catch(error => {
    console.error(error);
  });
