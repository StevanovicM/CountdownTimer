function getNextFriday6PM() {
    const now = new Date();
    const nextFriday = new Date(now);
    nextFriday.setDate(now.getDate() + (5 + 7 - now.getDay()) % 7); // Find next Friday
    nextFriday.setHours(18, 0, 0, 0); // Set to 6 PM

    // If it's currently past 6 PM on Friday, set to next Friday
    if (now > nextFriday) {
        nextFriday.setDate(nextFriday.getDate() + 7);
    }

    return nextFriday;
}

// Update the countdown every 1 second
const x = setInterval(function() {
    const now = new Date().getTime();
    const countDownDate = getNextFriday6PM().getTime();
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
