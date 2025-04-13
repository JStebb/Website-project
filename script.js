document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('name');
    const input = document.getElementById('nameInput');
    const welcome = document.getElementById('welcomeMessage');

    //check for saved name
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        welcome.textContent = `Welcome back, ${savedName}!`;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault(); //prevent page from reloading i guess

        const name = input.value;
        console.log('Name submitted:', name);
        //save to localStorage
        localStorage.setItem('userName', name);

        console.log('Name saved to localStorage:', name);
        welcome.textContent = `Welcome ${name}!`;
    });
});