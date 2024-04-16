// Function to toggle the visibility of the mobile menu
function toggleMenu() {
    var menu = document.getElementById("mobile-menu");
    menu.classList.toggle("show");
}

// Function to handle the form submission for search
function handleSearch(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the search query
    var searchQuery = document.getElementById('searchInput').value.trim().toLowerCase();

    // Redirect to searchresults.html with the search query as a parameter
    window.location.href = 'searchresults.html?tags=' + encodeURIComponent(searchQuery);
}

// Add event listener to the search form
document.getElementById('searchForm').addEventListener('submit', handleSearch);

// Function to handle showing image details
function showImageDetail(imageSrc, imageName) {
    sessionStorage.setItem('imageSrc', imageSrc);
    sessionStorage.setItem('imageName', imageName);
    window.location.href = 'imageselected.html';
}

// Function to filter images based on the search query in searchresults.html
if (window.location.pathname.includes('searchresults.html')) {
    window.onload = function() {
        // Retrieve the search query from the URL parameter
        var searchQuery = decodeURIComponent(getParameterByName('tags')).toLowerCase();

        // Retrieve all picture frames
        var pictureFrames = document.getElementsByClassName('picture-frame');

        // Loop through each picture frame to check if it matches the search query
        for (var i = 0; i < pictureFrames.length; i++) {
            var tags = pictureFrames[i].getAttribute('data-tags').toLowerCase();

            // If the tags contain the search query, display the image
            if (tags.includes(searchQuery)) {
                pictureFrames[i].style.display = 'block';
            } else {
                // Otherwise, hide the image
                pictureFrames[i].style.display = 'none';
            }
        }
    };

    // Function to retrieve URL parameters
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
}
