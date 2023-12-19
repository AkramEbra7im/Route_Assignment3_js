var SiteNameInput = document.getElementById('siteName')
var SiteURLInput = document.getElementById('SiteURL')

var siteSearchInput = document.getElementById('siteSearch')
var addBtn = document.getElementById('addBtn')
var updateBtn = document.getElementById('confirmBtn')
var cancelUpdateBtn = document.getElementById('cancelBtn')
var boxModel = document.getElementById('boxModal')
var indexToUpdate;
var siteList = []

if (localStorage.getItem('siteList') != null) {
    siteList = JSON.parse(localStorage.getItem('siteList'))
    display()
}


function addSite() {
    if (siteNameValdiation() && siteURLValdiation()) {
        if (!SiteURLInput.value.startsWith('http://') && !SiteURLInput.value.startsWith('https://')) {
            SiteURLInput.value = 'https://' + SiteURLInput.value;
        }
        SiteNameInput.classList.remove("is-valid")
        SiteURLInput.classList.remove("is-valid")
        var site = {
            name: SiteNameInput.value,
            SiteURL: SiteURLInput.value,
        }
        siteList.push(site);
        display();
        clearForm()
        localStorage.setItem('siteList', JSON.stringify(siteList))
        decreaseOpacity('message', 2000, 'Added')
    }
    else {
        boxModel.style.display = 'flex'
    }

}

function display() {
    temp = ''
    for (var i = 0; i < siteList.length; i++) {
        console.log(siteList[i].SiteURL)
        temp += `<tr>
        <td>`+ i + `</td>
        <td>`+ siteList[i].name + `</td>
        <td><a class="btn btn-success" href="`+ siteList[i].SiteURL + `" target="_blank"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
        <td><button class="btn btn-warning" onClick="setFormToUpdate(${i})"><i class="fa-solid fa-pen-to-square pe-2"></i>Update</button></td>
        <td><button class="btn btn-danger delete-btn" onClick="deletedata(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
    </tr>`
    }
    document.getElementById('tableData').innerHTML = temp
}

function clearForm() {
    SiteNameInput.value = "";
    SiteURLInput.value = "";
}

function deletedata(index) {
    siteList.splice(index, 1)
    display();
    localStorage.setItem('siteList', JSON.stringify(siteList))
}

function setFormToUpdate(index) {
    SiteNameInput.classList.remove("is-valid")
        SiteURLInput.classList.remove("is-valid")
    changeDeleteToHide()
    indexToUpdate = index
    SiteNameInput.value = siteList[index].name
    SiteURLInput.value = siteList[index].SiteURL
    addBtn.classList.add('d-none')
    updateBtn.classList.remove('d-none')
    cancelUpdateBtn.classList.remove('d-none')
}

function updateSite() {
    if (siteNameValdiation() && siteURLValdiation()) {
        if (!SiteURLInput.value.startsWith('http://') && !SiteURLInput.value.startsWith('https://')) {
            SiteURLInput.value = 'https://' + SiteURLInput.value;
        }
        SiteNameInput.classList.remove("is-valid")
        SiteURLInput.classList.remove("is-valid")
        siteList[indexToUpdate].name = SiteNameInput.value
        siteList[indexToUpdate].SiteURL = SiteURLInput.value
        display()
        clearForm()
        defaultBtns()
        localStorage.setItem('siteList', JSON.stringify(siteList))
        decreaseOpacity('message', 2000, 'Updated')
    }
    else {
        boxModel.style.display = 'flex'
    }
}

function defaultBtns() {
    addBtn.classList.remove('d-none')
    updateBtn.classList.add('d-none')
    cancelUpdateBtn.classList.add('d-none')
    clearForm()
    changeDeleteToDisplay()
}

function changeDeleteToDisplay() {
    var deleteButtons = document.querySelectorAll('.delete-btn')
    for (var i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].classList.remove('d-none')
    }
}
function changeDeleteToHide() {
    var deleteButtons = document.querySelectorAll('.delete-btn')
    for (var i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].classList.add('d-none')
    }
}

function decreaseOpacity(elementId, duration, text) {
    var element = document.getElementById(elementId);
    element.innerHTML = `<i class="fa-regular fa-circle-check pe-2 "></i>Bookmark ` + text + ` successfuly`
    var opacity = 1;
    element.style.display = 'block';
    var interval = setInterval(function () {
        if (opacity > 0) {
            opacity -= 0.1;
            element.style.opacity = opacity;
        } else {
            clearInterval(interval);
            element.style.display = 'none';
        }
    }, duration / 10);
}

function siteNameValdiation() {
    var regex = /^[A-Za-z0-9]{3,}$/
    var validation = regex.test(SiteNameInput.value)
    if (validation) {
        SiteNameInput.classList.remove("is-invalid")
        SiteNameInput.classList.add("is-valid")
    }
    else {
        SiteNameInput.classList.remove("is-valid")
        SiteNameInput.classList.add("is-invalid")
    }
    return validation;
}

function siteURLValdiation() {
    var regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,})(\/[^\s]*)?$/
    var validation = regex.test(SiteURLInput.value)
    if (validation) {
        SiteURLInput.classList.remove("is-invalid")
        SiteURLInput.classList.add("is-valid")
    }
    else {
        SiteURLInput.classList.remove("is-valid")
        SiteURLInput.classList.add("is-invalid")
    }
    return validation;
}

boxModel.addEventListener('click', function (e) {
    if (e.target.getAttribute('id') == 'boxModal')
        closeSlide()
})

function closeSlide() {
    boxModel.style.display = 'none'
}