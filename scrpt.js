// =============================================
// MENÚ MÓVIL
// =============================================

const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    
    const icon = menuToggle.querySelector('i');
    if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// =============================================
// VALIDACIÓN DEL FORMULARIO
// =============================================

const contactoForm = document.getElementById('contactoForm');

const validarEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validarCampo = (input, validarFn, mensajeError) => {
    const formGroup = input.parentElement;
    const errorSpan = formGroup.querySelector('.error-message');
    
    if (validarFn(input.value)) {
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        return true;
    } else {
        formGroup.classList.remove('success');
        formGroup.classList.add('error');
        if (errorSpan && mensajeError) {
            errorSpan.textContent = mensajeError;
        }
        return false;
    }
};

contactoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const mensaje = document.getElementById('mensaje');
    
    // Validar nombre
    if (!validarCampo(nombre, (v) => v.trim().length >= 2, 'El nombre debe tener al menos 2 caracteres')) {
        isValid = false;
    }
    
    // Validar email
    if (!validarCampo(email, validarEmail, 'Ingresa un email válido')) {
        isValid = false;
    }
    
    // Validar teléfono (OBLIGATORIO - mínimo 8 dígitos)
    if (!validarCampo(telefono, (v) => v.replace(/\D/g, '').length >= 8, 'Teléfono inválido (mínimo 8 dígitos)')) {
        isValid = false;
    }
    
    // Validar mensaje (mínimo 20 caracteres)
    if (!validarCampo(mensaje, (v) => v.trim().length >= 20, 'El mensaje debe tener al menos 20 caracteres')) {
        isValid = false;
    }
    
    if (isValid) {
        console.log('Formulario válido:', { 
            nombre: nombre.value, 
            email: email.value, 
            telefono: telefono.value, 
            mensaje: mensaje.value 
        });
        
        alert('¡Gracias por contactarnos! Te responderemos a la brevedad.');
        contactoForm.reset();
        
        // Limpiar clases de éxito
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('success');
        });
    }
});

// Validar al perder el foco
const inputs = contactoForm.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('blur', () => {
        const formGroup = input.parentElement;
        if (formGroup.classList.contains('error')) {
            if (input.id === 'nombre') {
                validarCampo(input, (v) => v.trim().length >= 2, 'El nombre debe tener al menos 2 caracteres');
            } else if (input.id === 'email') {
                validarCampo(input, validarEmail, 'Ingresa un email válido');
            } else if (input.id === 'telefono') {
                validarCampo(input, (v) => v.replace(/\D/g, '').length >= 8, 'Teléfono inválido (mínimo 8 dígitos)');
            } else if (input.id === 'mensaje') {
                validarCampo(input, (v) => v.trim().length >= 20, 'El mensaje debe tener al menos 20 caracteres');
            }
        }
    });
    
    // Quitar error al empezar a escribir
    input.addEventListener('input', () => {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
    });
});

// =============================================
// SCROLL SUAVE
// =============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =============================================
// EFECTO SCROLL EN HEADER
// =============================================

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// =============================================
// ANIMACIONES AL HACER SCROLL
// =============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.servicio-card, .producto-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
