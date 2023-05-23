
let currentPage = 1;
const postPerPage = 1;
let allPosts;


//Fetch the data
fetch("https://raw.githubusercontent.com/rdobrinova/Innovatech/main/datacontent")
    .then(res => res.json())
    .then(data => {
        console.log(data);

        allPosts = data.posts;
        displayPosts();
        currentPage++;

        //Load More button event listener
        let loadMoreButton = document.getElementById('loadMoreButton');
        loadMoreButton.addEventListener('click', () => {
            displayPosts();
        })
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        console.log("Data loaded")
    });


//Function to display 1 post per page + Load More button functionality
function displayPosts() {
    let startIndex = (currentPage - 1) * postPerPage;
    let endIndex = startIndex + postPerPage;
    let nextPagePosts = allPosts.slice(startIndex, endIndex);

    if (nextPagePosts.length > 0) {
        createCard(nextPagePosts);
        currentPage++;
    } else {
        const loadMoreButton = document.getElementById('loadMoreButton');
        loadMoreButton.disabled = true;
    }
};


// Function to create a card
function createCard(posts) {


    let blogCard = document.getElementById("blogCard");

    blogCard.innerHTML = ""


    let card = document.createElement("div");
    card.classList.add("card");


    for (let post of posts) {


        card.innerHTML = `

                <img src="${post.coverImage}" alt="Blog Picture" id="image">

                <div class="total-content">

                    <h2 id="title">${post.title}</h2>
                    <p id="text">${post.text}</p>
                
                        <div class="tags">
                                Tags:
                                ${post.tags.map(tag => `<span>${tag}</span>`).join(' , ')}
                        </div>
               </div>`

        blogCard.appendChild(card);
    };

};

