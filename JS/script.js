let form // pobieranie całego formularza (by ustawić preventDefault)
let inputName // nazwa użytkownika
let inputPass // hasło
let inputPass2 // powtórzone hasło
let inputEmail // email
let labelName
let labelPass
let errorName // error nazwy użytkownika
let errorPass // error hasła
let errorPass2 // error porównania haseł
let errorEmail // error emaila
let btnClear // przycisk czyszczenia formularza
let btnSend // przycisk wysyłania formularza
let popup // popup z cieniem, a dokładnie to cień z popupem
let btnPopup // przycisk zamykający popup
let allInputs // wszystkie inputy, pobrane po to by sprawdzić liczbę błędów

const startAll = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	form = document.querySelector('.form')
	inputName = document.querySelector('.name__input')
	inputPass = document.querySelector('.pass__input')
	inputPass2 = document.querySelector('.pass2__input')
	inputEmail = document.querySelector('.email__input')
	labelName = document.querySelector('.name__label')
	labelPass = document.querySelector('.pass__label')
	errorName = document.querySelector('.name__error')
	errorPass = document.querySelector('.pass__error')
	errorPass2 = document.querySelector('.pass2__error')
	errorEmail = document.querySelector('.email__error')
	btnClear = document.querySelector('.clear__btn')
	btnSend = document.querySelector('.send__btn')
	popup = document.querySelector('.form__shadow')
	btnPopup = document.querySelector('.popup__btn')
	allInputs = document.querySelectorAll('.input')
}

const prepareDOMEvents = () => {
	btnSend.addEventListener('click', allFunction)
	btnClear.addEventListener('click', clearForm)
	form.addEventListener('keydown', inputSumb)
}
// wywoływanie wszystkich funkcji
const allFunction = e => {
	e.preventDefault()
	checkName(inputName, 3)
	checkPass(inputPass, 8)
	comparisonPass()
	checkMail()
	showPopup()
}
// sprawdzanie nazwy użytkownika
const checkName = (inputName, min) => {
	if (inputName.value === '') {
		errorName.style.visibility = 'visible'
		errorName.innerText = `Podaj nazwę użytkownika`
		inputName.classList.add('error__input')
	} else if (inputName.value.length < min) {
		errorName.style.visibility = 'visible'
		errorName.innerText = `${labelName.innerText.slice(0, -1)} musi posiadać min. ${min} znaki`
		inputName.classList.add('error__input')
	} else {
		clearError(inputName, errorName)
	}
}
// sprawdzanie hasła
const checkPass = (inputPass, min) => {
	if (inputPass.value === '') {
		errorPass.style.visibility = 'visible'
		errorPass.innerText = `Podaj hasło`
		inputPass.classList.add('error__input')
	} else if (inputPass.value.length < min) {
		errorPass.style.visibility = 'visible'
		errorPass.innerText = `${labelPass.innerText.slice(0, -1)} musi posiadać min ${min} znaków`
		inputPass.classList.add('error__input')
	} else {
		clearError(inputPass, errorPass)
	}
}
// porównywanie haseł
const comparisonPass = () => {
	if (inputPass2.value !== inputPass.value) {
		errorPass2.style.visibility = 'visible'
		errorPass2.innerText = `Hasła muszą być identyczne`
		inputPass2.classList.add('error__input')
	} else {
		clearError(inputPass2, errorPass2)
	}
}
// funkcja sprawdzająca email (walidator adresu mailowego)
const checkMail = () => {
	const mailCheck =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if (!mailCheck.test(inputEmail.value)) {
		errorEmail.style.visibility = 'visible'
		errorEmail.innerText = `Podaj adres e-mail`
		inputEmail.classList.add('error__input')
	} else {
		clearError(inputEmail, errorEmail)
	}
}
// funkcja czyszcząca errory
const clearError = (first, second) => {
	first.classList.remove('error__input')
	second.style.visibility = 'hidden'
}
// funkcja sprawdzająca czy wszystko jest poprawnie uzupełnione
const showPopup = () => {
	let countErrors = 0

	allInputs.forEach(el => {
		if (el.classList.contains('error__input')) {
			countErrors++
		}
	})

	if (countErrors === 0) {
		popup.style.display = 'block'
		popup.classList.add('shadow-animation')
	}
}

// czyszczenie formularza
const clearForm = e => {
	e.preventDefault()
	allInputs.forEach(el => {
		el.value = ''
		el.classList.remove('error__input')
		el.nextElementSibling.style.visibility = 'hidden'
	})
}

// nasłuchiwanie na enter i gdy enter+brak wskazanej klasy w zmiennej popup to reaguje btnSend
const inputSumb = e => {
	if (popup.classList.contains('shadow-animation') == false && e.key == 'Enter') {
		e.preventDefault()
        btnSend.click()
	} else if (e.key == 'Enter') {
        btnPopup.click()
    }  
}

document.addEventListener('DOMContentLoaded', startAll)