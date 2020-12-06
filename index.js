function getSpinner() {
    const span = document.createElement('span');
    span.classList.add('spinner-border','spinner-border-sm');
    return span;
}

function toggleLoading() {
    
    if (loading) {
        btnForm.disabled = true;
        btnForm.innerText = 'Enviando solicitud '
        btnForm.appendChild(getSpinner());
    } else  {
        btnForm.disabled = false;
        btnForm.innerText = 'Solicitar terapia'
    } 
}

function getEmailBody() {
    const name = document.getElementById('formName');
    const email = document.getElementById('formEmail');
    const phone = document.getElementById('formPhone');
    const hasRelativeWithAz = document.getElementById('formHasRelativeAlzheimer').checked;
    const hasDiagnose = document.getElementById('formHasDiagnose').checked;
    const participateTherapy = document.getElementById('formParticipateTherapy').checked;

    const message = `
    Hemos recibido la siguiente solicitud de terapia desde el landing page. <br/>

    Nombre: ${name.value} <br/>
    Email: ${email.value} <br/>
    Teléfono: ${phone.value} <br/>
    ¿Tienes algún familiar con Alzheimer? ${hasRelativeWithAz ? 'Si' : 'No'} <br/>
    ¿Cuenta con un diagnóstico? ${hasDiagnose ? 'Si': 'No'} <br/>
    ¿Te gustaría participar en las terapias para familiares? ${participateTherapy ? 'Si': 'No'} <br/>
    <br/>
    ¡Saludos!<br/>
    `;
    return message;
}

function clearForm() {
    document.getElementById('formName').value = '';
    document.getElementById('formEmail').value = '';
    document.getElementById('formPhone').value = '';
    document.getElementById('formHasRelativeAlzheimer').checked = false;
    document.getElementById('formHasDiagnose').checked = false;
    document.getElementById('formParticipateTherapy').checked = false;
}

function submitForm(event) {
    loading = true;
    toggleLoading();
    const emailBody = getEmailBody();

    Email.send({
        SecureToken: "7f87e0ae-63f1-435e-ad3b-d5614c47bb29",
        To: "contacto@cmalzheimer.org.mx",
        From: "cursos@cmalzheimer.org.mx",
        Subject: "¡Genial! Nueva solicitud de terapia desde el landing page",
        Body: emailBody
    }).then(message => {
        loading = false;
        if (message === 'OK') {
            let successMsg = `
            Hemos recibido tu solicitud, pronto nos pondremos en 
            contacto mediante el correo y teléfono que proporcionaste.
            `;
            document.getElementById('resulstModalTitle').innerText = '¡Solicitud enviada! 🎉';
            document.getElementById('resulstModalBody').innerText = successMsg;
            $('#resulstModal').modal();
            toggleLoading();
            clearForm();
        } else {
            let successMsg = `
            Parece que tenemos un problema técnico, por favor intenta nuevamente más tarde.
            `;
            document.getElementById('resulstModalTitle').innerText = '¡Hubo un problema! 😿';
            document.getElementById('resulstModalBody').innerText = successMsg;
            $('#resulstModal').modal();
            toggleLoading();
        }
    });

    event.preventDefault();
}

const form = document.getElementById('contactForm');
const btnForm = document.getElementById('btnForm');
let loading = false;

form.addEventListener('submit', submitForm);

