var reply = "eLZ0AVJvbzD21MnfajLlR2FmUj_1f3YalRhnR77POvw";

var currentPage = 1;
var orient = "";

var orien = document.getElementsByClassName("orien");


async function fetchPhoto(pageNum){
    if(document.getElementById("query").value!="" && orient!=''){
        if(currentPage===1){
            document.getElementById("imageGallery").innerHTML = "";
            document.getElementById("loadMore").style.visibility="hidden";
        }

        var query = document.getElementById("query").value;

        const url = `https://api.unsplash.com/search/photos?page=${pageNum}&query=${query}&client_id=${reply}&per_page=12&orientation=${orient}`;

        const response = await fetch(url);
        const data = await response.json();

        const results = data.results;

        for (const result of results) {
            document.getElementById("imageGallery").innerHTML+=`<div class="imageFrame"><img src="${result.urls.small}"><div class="downloadLogo"><a href="${result.urls.raw.split("&")[0].split("?")[0]}" target="_blank"><i class="fa-solid fa-download"></i></a></div></div>`;
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

function reset(){
    document.getElementById("btn").style.color="white";
    document.getElementById("btn").style.background="#d06320";
    document.getElementById("btn").innerHTML="Search";
    document.getElementById("query").disabled=false;
    document.getElementById("query").value="";
    document.getElementById("btn").setAttribute("onclick","run()");
    currentPage = 1;

    orien[0].innerHTML="";
    orien[0].style.background="";
    
    orien[1].innerHTML="";
    orien[1].style.background="";
    
    orien[2].innerHTML="";
    orien[2].style.background="";

    orient = "";

}

function run(){
    fetchPhoto(currentPage);
    if(orient!=""){
        document.getElementById("btn").style.color="red";
        document.getElementById("btn").style.background="#fff";
        document.getElementById("btn").innerHTML="Reset";
        document.getElementById("query").disabled=true;
        document.getElementById("btn").setAttribute("onclick","reset()");
    }
}

function loadMore(){
    currentPage++;
    fetchPhoto(currentPage);
}

document.getElementById("query").addEventListener("keypress",(e)=>{
    if(e.keyCode==13){
        run();
    }
});



orien[0].addEventListener("click",()=>{
    orien[0].innerHTML='<i class="fa-solid fa-circle-check clrgreen"></i>';
    orien[1].innerHTML="";
    orien[2].innerHTML="";

    orien[0].style.background="white";
    orien[1].style.background="";
    orien[2].style.background="";

    orient = "portrait";
});
orien[1].addEventListener("click",()=>{
    orien[0].innerHTML="";
    orien[1].innerHTML='<i class="fa-solid fa-circle-check clrgreen"></i>';
    orien[2].innerHTML="";

    orien[0].style.background="";
    orien[1].style.background="white";
    orien[2].style.background="";

    orient = "landscape";
});
orien[2].addEventListener("click",()=>{
    orien[0].innerHTML="";
    orien[1].innerHTML="";
    orien[2].innerHTML='<i class="fa-solid fa-circle-check clrgreen"></i>';

    orien[0].style.background="";
    orien[1].style.background="";
    orien[2].style.background="white";

    orient = "squarish";
});
