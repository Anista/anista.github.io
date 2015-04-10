'use strict';

$(window).load(function() {
	$(".load-screen").fadeOut(2000);
});

(function() {
	var form = document.querySelector('[role="form"]');
	var email = form.querySelector('#email');
	var password = form.querySelector('#password');
	var city = form.querySelector('#city');
	var phone = form.querySelector('#phone');
	var checkbox = form.querySelector('#checkbox');
	var submitButton = form.querySelector('button[type="submit"]');

	// Состояние полей формы (true - валидно, false - нет)
	var statuses = {
		email: true,
		password: true,
		city: true,
		phone: true,
		checkbox: true
	};

	// Асинхронный запрос, выполняемый в данный момент
	var currentAjaxRequest = null;

	// Создает блок с сообщением об ошибке
	function createError(id, message) {
		var parentNode = document.getElementById(id).parentNode;
		var errorNode = document.createElement('div');
		errorNode.className = 'alert alert-danger';
		errorNode.textContent = message;
		parentNode.className += ' has-error';
		parentNode.appendChild(errorNode);
	}

	// Удаляет блок с сообщением об ошибке
	function removeError(id) {
		var parentNode = document.getElementById(id).parentNode;
		parentNode.className = 'form-group required';
		var errorNode = parentNode.querySelector('.alert-danger');
		if (errorNode) {
			parentNode.removeChild(errorNode);
		}
	}

	// Запрос для проверки существования указанного почтового адреса
	function checkEmailExists(email, callback) {
		if (currentAjaxRequest) {
			currentAjaxRequest.abort();
		}
		var request = new XMLHttpRequest();
		var STATE_READY = 4;
		var uriEncodedMail = encodeURIComponent(email);
		var url = 'https://aqueous-reaches-8130.herokuapp.com/check-email/?email=' + uriEncodedMail;
		request.open('GET', url, true);
		request.onreadystatechange = function(data) {
			if (request.readyState === STATE_READY) {
				currentAjaxRequest = null;
				var response = request.responseText;
				var result = JSON.parse(response);
				callback(result);
			}
		};
		currentAjaxRequest = request;
		request.send();
	}

	// Проверка email'а
	function validateEmail(email) {
		var validEmailFormat = /^(\w+@\w+\.\w+)$/;
		if (!email) {
			return 'Почтовый адрес является обязательным! Вам необходимо его заполнить!';
		} else if (!(validEmailFormat.test(email))) {
			return 'Вы неверно ввели почтовый адрес! Проверьте правильность написания почтового адреса';
		}
		return null;
	}

	// Проверка пароля
	function validatePassword(password) {
		var onlyLettersRegExp = /^[a-zA-Z]+$/;
		var onlyNumberRegExp = /^[0-9]+$/;
		var validCharactersRegExp = /^[a-zA-Z0-9-_]{5,}$/;
		if (!password) {
			return 'Пароль является обязательным! Вам необходимо его заполнить!';
		} else if (password.length < 6) {
			return 'Вы ввели короткий пароль. Длина пароля должна быть не менее 6 символов';
		} else if (onlyLettersRegExp.test(password) || onlyNumberRegExp.test(password)) {
			return 'Вы ввели слишком легкий пароль. Пароль должен содержать цифры и латинские буквы, дополнительно могут быть использованы знак подчеркивания(_) и/или минус(-)';
		} else if (!validCharactersRegExp.test(password)) {
			return 'Вы ввели недопустимый пароль! Пароль должен содержать цифры и латинские буквы, дополнительно могут быть использованы знак подчеркивания(_) и/или минус(-)';
		}
		return null;
	}

	// Проверка названия города
	function validateCity(city) {
		var validCityFormat = /^[a-zA-Zа-яА-ЯёЁ\ \-]*$/;
		if (city && !validCityFormat.test(city)) {
			return 'Вы допустили ошибку в написании города! Проверьте правильность введенного названия.';
		}
		return null;
	}

	// Проверка номера телефона
	function validatePhone(phoneNumber) {
		// Телефонный план нумерации Украины: +380XXXXXXXXX
		var validPhoneFormat = /^\+380[0-9]{9}$/;
		if (phoneNumber && !validPhoneFormat.test(phoneNumber)) {
			return 'Введенный вами телефон не соответствует международному формату номеров!';
		}
		return null;
	}

	// Проверка чекбокса "Согласен со всем"
	function validateCheckbox(checked) {
		if (!checked) {
			return 'Необходимо согласиться!';
		}
		return null;
	}

	// Поля формы
	var formFields = [{
		id: 'email',
		node: email,
		validator: function(id, node, callback) {
			var email = node.value;
			var error = validateEmail(email);
			if (!error) {
				checkEmailExists(email, function(data) {
					if (data.used) {
						removeError(id);
						createError(id, 'Пользователь с таким почтовым адресом уже зарегистрирован!');
						statuses[id] = false;
						updateSubmitButtonStatus();
					} else if (callback) {
						callback();
					}
				});
			}
			return error;
		}
	}, {
		id: 'password',
		node: password,
		validator: function(id, node, callback) {
			return validatePassword(node.value);
		}
	}, {
		id: 'city',
		node: city,
		validator: function(id, node, callback) {
			return validateCity(node.value);
		}
	}, {
		id: 'phone',
		node: phone,
		validator: function(id, node, callback) {
			return validatePhone(phone.value);
		}
	}, {
		id: 'checkbox',
		node: checkbox,
		validator: function(id, node, callback) {
			return validateCheckbox(node.checked);
		}
	}];

	var validators = {};

	// Создание функций-валидаторов и обработчиков событий
	(function events(formFields) {
		formFields.forEach(function(field) {
			// Создание валидатора
			var validator = createValidator(field.id, field.node, field.validator);
			// Привязка валидатора к слушателям
			addEvent(field.node, validator);
			// Добавление валидатора для доступа по ключу
			validators[field.id] = validator;
		});
	})(formFields);

	// Создает валидатор
	function createValidator(id, node, validationFn) {
		return function(callback) {
			// Удаление отображаемой ошибки
			removeError(id);
			// Проверка валидности поля формы
			var errorText = validationFn(id, node, callback);
			var valid = errorText ? false : true;
			if (errorText) {
				// Если есть ошибка - отображаем её
				createError(id, errorText);
			}
			// Проставление статуса
			statuses[id] = valid;
			return valid;
		};
	}

	// Обновляет текущий статус кнопки "Отправить данные"
	function updateSubmitButtonStatus() {
		var disabled = false;
		for (var status in statuses) {
			if (!statuses[status]) {
				disabled = true;
				break;
			}
		}
		submitButton.disabled = disabled;
	}

	// Добавление слушателей событий на поля для ввода и чекбоксы
	function addEvent(node, validator) {
		var keyupTimeout;
		function validate() {
			clearTimeout(keyupTimeout);
			keyupTimeout = setTimeout(function() {
				validator();
				updateSubmitButtonStatus();
			}, 500);
		}
		node.addEventListener("keyup", validate, false);
		node.addEventListener("change", validate, false);
		node.addEventListener("blur", validate, false);
	}

	// Добавление слушателя на отправку формы
	form.addEventListener('submit', function(event) {
		// Callback для валидации email'а
		var emailCallback = function() {
			for (var status in statuses) {
				if (!statuses[status]) {
					return;
				}
			}
			registerUser();
		};
		// Перебираем все валидаторы
		for (var id in validators) {
			if (id === 'email') {
				validators[id](emailCallback);
			} else {
				validators[id]();
			}
		}
		// Обновляем состояник кнопки "Отправить данные"
		updateSubmitButtonStatus();
		event.preventDefault();
	}, false);

	function registerUser() {
		// user registration
		console.log('User has been registered.');
	}
})();