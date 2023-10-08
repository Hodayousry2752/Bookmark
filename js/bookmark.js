let bookmarkName = document.getElementById('bookmark-name');
let websiteUrl = document.getElementById('website-url');
let submitBtnName =document.getElementById("submitBtn");
let updateBtnName =document.getElementById("updateBtn");
let demo =document.getElementById("demo");
let bookMarkList=document.querySelector('#book-marker');

let arrBookmark;
let mood='submit';
let book;
if(localStorage.getItem('bookmark')!= null){
    arrBookmark= JSON.parse(localStorage.getItem("bookmark"));
    setBookmark(arrBookmark);
}else{
    arrBookmark=[];
}

function addBookmark(){
    if(regexBookmarkName()==true && regexBookmarkUrl() ==true){
        let myBookmark ={
            name:bookmarkName.value,
            url:websiteUrl.value
        };

        if(mood==='submit'){
            arrBookmark.push(myBookmark);
        }else{
            arrBookmark[book]=myBookmark;
            submitBtnName.innerHTML='submit';
        }
        localStorage.setItem('bookmark',JSON.stringify( arrBookmark));
    
        clearInputs();
        setBookmark(arrBookmark);
    }
    
}

//clear data inputs
function clearInputs(){
    bookmarkName.value='';
    websiteUrl.value='';
}

//add element
function setBookmark(array){
    let tableList = ``;
    for(let i=0;i<array.length;i++){
        tableList +=`
        <div class="div-add mb-4 d-flex w-100 py-4">
        <h3 class="w-25 ps-3 me-5">${array[i].name}</h3>
        <div>
            <a class="btn btn-primary" href="${array[i].url}" target='_blank'>visit</a>
            <button class="btn btn-danger" onclick="deleteBookmark(${i})">delete</button>
            <button class="btn btn-warning" onclick="updateBookmark(${i})">update</button>

        </div>
        </div>
        `
    }
    bookMarkList.innerHTML=tableList;
}
//delete element
function deleteBookmark(index){
    arrBookmark.splice(index,1);
    localStorage.setItem('bookmark',JSON.stringify( arrBookmark));
    setBookmark(arrBookmark);
}

function searchAbout(searchName){
    let searchList=[];
    for(let i=0;i<arrBookmark.length;i++){
        if(arrBookmark[i].name.toLowerCase().includes(searchName.toLowerCase())){
            searchList.push(arrBookmark[i]);
            setBookmark(searchList);
        }else{
            setBookmark(searchList);
        }
        
    }
}

//regex
function regexBookmarkName(){
    let regexName=/^[A-Z][a-z]{3,8}$/;
    if(    regexName.test(bookmarkName.value)==true){
        bookmarkName.classList.replace('is-invalid','is-valid');
        return true;
    }else{
        bookmarkName.classList.add('is-invalid');
        return false;
    }
}

function regexBookmarkUrl(){
    let regexUrl= /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;
    if(    regexUrl.test(websiteUrl.value)==true){
        websiteUrl.classList.replace('is-invalid','is-valid');
        return true;
    }else{
        websiteUrl.classList.add('is-invalid');
        return false;
    }
    
}

function updateBookmark(i){
    bookmarkName.value=arrBookmark[i].name;
    websiteUrl.value=arrBookmark[i].url;

    mood='update';
    submitBtnName.innerHTML='update';
    book=i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}
