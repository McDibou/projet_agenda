async function notification() {

    const showNotification = () => {

        for (let item of noteArray.tab) {
            let date = new Date()
            if (date.getDate() === item.recallDate.getDate() &&
                date.getFullYear() === item.recallDate.getFullYear() &&
                date.getMonth() === item.recallDate.getMonth()) {

                const notification = new Notification('Hey ! Bonjour', {
                    body: 'Plusieurs tâches vous attendent aujourd\'hui. \ud83d\ude03',
                    tag: true
                })

                setTimeout(() => {
                    notification.close();
                }, 10 * 1000);

                notification.addEventListener('click', () => {
                    window.open('https://adrien.webdev-cf2m.be/projet_agenda/', '_blank')
                })
            }
        }
    }

    const showError = () => {
        const error = document.querySelector('.error-notif');
        error.style.display = 'block';
        error.textContent = 'Vous avez bloqué les notifications';

        setTimeout(() => {
            error.style.display = 'none';
        }, 5 * 1000);

    }

    let granted = false;

    if (Notification.permission === 'granted') {
        granted = true;
    } else if (Notification.permission !== 'denied') {
        let permission = await Notification.requestPermission();
        granted = permission === 'granted';
    }

    granted ? showNotification() : showError();
}

notification()