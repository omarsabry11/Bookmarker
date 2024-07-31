
let siteNameInput = document.getElementById('siteName');
let siteUrlInput = document.getElementById('siteUrl');
let submitInput = document.getElementById('SubmitBtn');


let container = [];

if(localStorage.getItem('books'))
{
    container = JSON.parse(localStorage.getItem('books'));
    displayBooks(container);
}

console.log(container);
function addBook()
{
    book = 
    {
        name:siteNameInput.value,
        url:siteUrlInput.value
    }

    container.push(book);
    displayBooks(container);
    clearForm();
    localStorage.setItem('books',JSON.stringify(container));
}

function displayBooks(arr)
{
    let temp = '';

    for(let i = 0;i<container.length;i++)
    {
        temp+= ` <tr>
                    <td class="py-3">${i+1}</td>
                    <td class="py-2">${container[i].name}</td>
                    <td class="py-2"><button class="visit border-0 px-3 py-2 rounded"><a href="${container[i].url}"><i class="fa-regular fa-eye"></i> Visit</a></button></td>
                    <td class="py-2 "><button class="delete text-white border-0 px-3 py-2 rounded" onclick="deleteBook();"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
                </tr>`;
    }
    
    document.getElementById('tableBody').innerHTML = temp;

}
function clearForm()
{
    siteNameInput.value = null;
    siteUrlInput.value = null;
}

function deleteBook(indexDeleted)
{
    container.splice(indexDeleted,1);
    displayBooks(container);
    localStorage.setItem('books',JSON.stringify(container));
}


function validation(element)
{
    regex =
    {
        siteName:/^\w{3,}/,
        siteUrl:/^(https:\/\/)/
    }

    if(regex[element.id].test(element.value))
    {
        element.classList.replace('is-invalid','is-valid');
       
    }
    else
    {
        element.classList.replace('is-valid','is-invalid');
        
    }
  
}

function isFound()
{
    for(let i=0;i<container.length;i++)
    {
        if(siteNameInput.value == container[i].name)
        {
            return true;
        }
    }
    return false;
}

let nameRe = /^\w{3,}/;
let urlRe = /^(https:\/\/)/;
function addValid()
{
    let isValid = (nameRe.test(siteNameInput.value) && urlRe.test(siteUrlInput.value) && (!isFound()));
    if(isValid)
    {
        addBook();
    }
    else
    {
        document.querySelector('.light-box-container').classList.replace('d-none','d-flex')
    
    }

}

let closeIcon = document.querySelector('.rules .head button');
let lightBoxContainer = document.querySelector('.light-box-container');
let lightBox = document.querySelector('.light-box-container .rules');



function closeRules()
{
    lightBoxContainer.classList.replace('d-flex','d-none');
}

document.addEventListener('keydown',function(e){
    if(e.key == 'Escape')
    {
        closeRules();
    }
})
closeIcon.addEventListener('click',closeRules);

lightBoxContainer.addEventListener('click',function(){
    closeRules();
})

lightBox.addEventListener('click',function(e){
    e.stopPropagation();
})



