// Constants
const getRatingsEndpoint = "http://127.0.0.1:8000/get-ratings/";
const addRatingEndpoint = "http://127.0.0.1:8000/add-rating/";
const starClassActive = "fas fa-star active_star";
const starClassInactive = "fas fa-star passive_star";
const ratingStars = [...document.getElementsByClassName("fa-star")];


function getRatingStar(percentage) {
  return `<div class="stars-outer">
            <div class="stars-inner" style="width: ${percentage}%;"></div>
          </div>`
}

function getratingItem(rating, text, percentage) {
  return `<ul>
            <div class="rating-wrapper">
              <div class="rating-item fa-2x">
                ${getRatingStar(percentage)}
              </div>
              <p><strong>${rating}</strong>, ${text}</p>
            </div>
          </ul>`
}

// Populate ratings
$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: getRatingsEndpoint,
  })
  .done(function (msg) {

  // Set ratings
  let html = ""
  msg.ratings.forEach(element => {
    let percentage = (element.rating / 5) * 100;
    html += getratingItem(element.rating, element.text, percentage);
  });
  $("#ratings-list").empty().html(html);

  // set cumulative product rating
  $(".current-rating-num").empty().html(Math.round(msg.product.rating * 10) / 10);
  // set stars for cumulative rating
  $(".current-rating").empty().html(getRatingStar((Math.round(msg.product.rating) / 5) * 100));
  })
})

// Submit a review
$('#submit_btn').click(function(event) {
  event.preventDefault()
  let rating = ratingStars.map((star) => star.classList.contains("active_star")).lastIndexOf(true)+1
  let text = document.getElementById('text_val');
  
  $.ajax({
    method: "POST",
    url: addRatingEndpoint,
    data: {
      "rating": rating,
      "text": text.value
  }
  })

  // close modal and reset fields
  for (let i = 0; i < ratingStars.length; ++i) ratingStars[i].className = starClassInactive;
  text.value = ""
  modal.style.display = "none";
})

// modal logic
let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];

$('#add-review-btn').click(() => {
  modal.style.display = "block";
})

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none";
    }
}

function executeRating(stars) {
  const starsLength = stars.length;
  let i;
  stars.map((star) => {
    star.onclick = () => {
      i = stars.indexOf(star);

      if (star.className===starClassInactive) {
        for (i; i >= 0; --i) stars[i].className = starClassActive;
      } else {
        for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
      }
    };
  });
}
executeRating(ratingStars);



