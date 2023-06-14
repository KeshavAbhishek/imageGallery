var reply= prompt("Enter Access Key");

var currentPage = 1;

async function fetchPhoto(pageNum){
    if(document.getElementById("query").value!=""){
        if(currentPage===1){
            document.getElementById("imageGallery").innerHTML = "";
            currentPage = 1;
            document.getElementById("loadMore").style.visibility="hidden";
        }

        var query = document.getElementById("query").value;

        const url = `https://api.unsplash.com/search/photos?page=${pageNum}&query=${query}&client_id=${reply}&per_page=12`;

        const response = await fetch(url);
        const data = await response.json();

        const results = data.results;

        for (const result of results) {
            var timecurrent = new Date().getTime();
            document.getElementById("imageGallery").innerHTML+=`<div class="imageFrame"><img src="${result.urls.small}"><div class="downloadLogo"><a href="${result.urls.raw.split("&")[0].split("?")[0]}" download="${timecurrent}.jpg"><i class="fa-solid fa-download"></i></a></div></div>`;
        }

        var imageFrameData = document.getElementsByClassName("imageFrame");
        var downloadLogo = document.getElementsByClassName("downloadLogo");


        for (let index = 0; index < imageFrameData.length; index++) {
            const element = imageFrameData[index];

            element.addEventListener("mouseover",()=>{
                downloadLogo[index].style.visibility='visible';
            });

            element.addEventListener("mouseleave",()=>{
                downloadLogo[index].style.visibility='hidden';
            });
        }

        document.getElementById("loadMore").style.visibility="visible";
    }
}

function run(){
    fetchPhoto(currentPage);
}

function loadMore(){
    currentPage++;
    fetchPhoto(currentPage);
}

document.getElementsByTagName("body")[0].addEventListener("change",()=>{
    if(document.getElementsByTagName("body")[0].clientWidth<=700){
        document.getElementById("imageGallery").style.gridTemplateColumns="1fr";
    }
    else{
        document.getElementById("imageGallery").style.gridTemplateColumns="1fr 1fr 1fr";
    };
});