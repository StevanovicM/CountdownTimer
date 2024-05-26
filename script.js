function getNextTarget() {
    const now = new Date();
    let target = new Date(now);

    // Set the time to the hour and minute for Monday or Thursday
    function setTarget(dayOfWeek, hour){
        target.setDate(now.getDate() + (dayOfWeek + 7 - now.getDay()) % 7);
        target.setHours(hour, 0, 0, 0);
    }

    // Check what today is and decide when is the next target day and time
    if (now.getDay() !== 1 || (now.getDay() === 1 && now.getHours() >= 21)){
        // If today is Monday and it's past 9PM, or it's not Monday
        setTarget(4, 20); // Set next target to Thursday at 8 PM
        if (now > target) {
            target.setDate(target.getDate() + 7); // Next Thursday
        }
    } else {
        setTarget(1, 21); // Next target to Monday at 9 PM
    }
}

// Update the countdown every 1 second
const x = setInterval(function() {
    const now = new Date().getTime();
    const countDownDate = getNextTarget().getTime();
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="countdown"
    document.getElementById("countdown").innerHTML = days + "d " + hours + "h " +
    minutes + "m " + seconds + "s ";

    // If the countdown is finished, reset to next Friday
    if (distance < 0) {
        clearInterval(x);
        setTimeout(function() {
            setInterval(x);
        }, 1000); // Wait 1 second before restarting the interval
    }
}, 1000);
